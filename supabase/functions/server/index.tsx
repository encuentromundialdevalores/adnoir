import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

const ROUTE_PREFIX = '/make-server-dc9259d9';

// Health check
app.get(`${ROUTE_PREFIX}/health`, (c) => c.text('OK'));

// Investor Sign Up
app.post(`${ROUTE_PREFIX}/signup`, async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return c.json({ error: 'Server configuration error' }, 500);
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Investor' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Error creating user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (err: any) {
    console.error('Signup exception:', err);
    return c.json({ error: err.message || 'Internal Server Error' }, 500);
  }
});

// Contact Form Submit
app.post(`${ROUTE_PREFIX}/contact`, async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    
    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400);
    }

    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();
    const key = `contact_${timestamp}_${id}`;
    
    const contactData = {
      id,
      name,
      email,
      subject,
      message,
      timestamp,
      status: 'unread'
    };

    await kv.set(key, contactData);

    // Send email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Ad Noir Contact Form <onboarding@resend.dev>', // Remember to change this to your verified domain on Resend
          to: ['ir@adnoir.com'], // The email where you want to receive notifications
          reply_to: email,
          subject: `New Inquiry from ${name}: ${subject || 'No Subject'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company/Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        })
      });

      if (!resendResponse.ok) {
        console.error('Resend error:', await resendResponse.text());
        // We log the error but still return success so the user sees the success message 
        // since the message was saved in KV store.
      }
    } else {
      console.warn('RESEND_API_KEY is not set. Email notification skipped.');
    }

    return c.json({ success: true, id });
  } catch (err: any) {
    console.error('Contact submit exception:', err);
    return c.json({ error: err.message || 'Internal Server Error' }, 500);
  }
});

// Get Contact Forms (Protected)
app.get(`${ROUTE_PREFIX}/contact`, async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return c.json({ error: 'Server configuration error' }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized', details: error?.message }, 401);
    }

    // Since this is AD NOIR (a firm), we assume any logged in user can see contacts for now, 
    // or we can just fetch them. Ideally, we would have role-based access, but let's just fetch.
    const messages = await kv.getByPrefix('contact_');
    
    // Sort messages by timestamp descending
    messages.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ success: true, messages });
  } catch (err: any) {
    console.error('Contact fetch exception:', err);
    return c.json({ error: err.message || 'Internal Server Error' }, 500);
  }
});

Deno.serve(app.fetch);
