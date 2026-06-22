import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ContactSimple() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dc9259d9/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.company || 'Inquiry',
          message: formData.message,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);
      setFormData({ name: '', company: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while submitting your inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-xs tracking-widest uppercase text-black/50 font-medium mb-6 block">Connect With Us</span>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black mb-8">
              Inquire About <br />Partnership
            </h2>
            <p className="text-black/60 font-normal mb-12 max-w-md text-lg">
              Speak with our investment team to learn more about our current capital raises and institutional offerings.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5">
                  <Mail size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-medium">Email</h4>
                  <p className="text-sm font-medium">ac@adnoir.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5">
                  <Phone size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-medium">Office</h4>
                  <p className="text-sm font-medium">8114759202</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5">
                  <MapPin size={18} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-black/40 font-medium">Headquarters</h4>
                  <p className="text-sm font-medium">Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-3xl border border-black/5 shadow-xl">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-black/5 text-black rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Inquiry Received</h3>
                <p className="text-black/60 text-base font-normal max-w-xs">
                  Thank you for your interest. Our investment team will contact you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 border border-black/20 rounded-full px-8 py-3 text-xs uppercase tracking-wide font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm border border-red-100 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Company</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Institutional Partner" 
                      className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@firm.com" 
                    className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your investment objectives..." 
                    className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white rounded-full py-4 flex items-center justify-center gap-3 text-xs tracking-wide uppercase font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  {!isSubmitting && <Send size={14} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
