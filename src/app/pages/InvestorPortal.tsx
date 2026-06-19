import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Lock, FileText, PieChart, Bell, LogOut, ChevronRight, Download, Users } from "lucide-react";
import { motion } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function InvestorPortal() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Portal data
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts'>('overview');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && activeTab === 'contacts') {
      fetchContacts();
    }
  }, [session, activeTab]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dc9259d9/contact`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setContacts(data.messages || []);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    try {
      if (mode === 'signup') {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dc9259d9/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create account');
        }
        
        // Auto sign-in after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="bg-[#F4F1E8] min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full border-t-2 border-black" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white p-8 lg:p-12 shadow-2xl rounded-3xl border border-black/5"
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-black/5 text-black flex items-center justify-center rounded-full mb-6">
                <Lock size={24} />
              </div>
              <h1 className="text-3xl font-semibold mb-4 tracking-tight">
                {mode === 'signin' ? 'Investor Access' : 'Apply for Access'}
              </h1>
              <p className="text-xs text-black/40 uppercase tracking-widest font-medium">
                Institutional Portal — AD NOIR
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {authError && (
                <div className="p-4 bg-red-50 text-red-600 text-sm border border-red-100 text-center">
                  {authError}
                </div>
              )}
              
              {mode === 'signup' && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe" 
                    className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Authorized Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@firm.com" 
                  className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-medium text-black/50 mb-2 block">Security Token (Password)</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-black/5 rounded-xl border-none px-4 py-4 text-sm focus:ring-1 focus:ring-black transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black rounded-full text-white py-4 text-xs tracking-wide uppercase font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : (mode === 'signin' ? 'Authenticate' : 'Request Access')}
              </button>

              <div className="text-center mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setMode(mode === 'signin' ? 'signup' : 'signin');
                    setAuthError(null);
                  }}
                  className="text-xs text-black/50 hover:text-black hover:underline transition-colors"
                >
                  {mode === 'signin' 
                    ? 'Not a partner yet? Apply for access.' 
                    : 'Already have access? Authenticate here.'}
                </button>
              </div>
            </form>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Portal Header */}
      <header className="bg-black text-white py-4 px-6 lg:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold tracking-tight">AD NOIR</span>
          <span className="w-px h-6 bg-white/20 hidden md:block"></span>
          <span className="text-xs tracking-widest uppercase text-white/50 hidden md:block">Investor Portal</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs opacity-70">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Secure Connection
          </div>
          <button className="relative">
            <Bell size={20} className="opacity-70 hover:opacity-100 transition-opacity" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-black"></span>
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Exit</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-black/5 border-r border-black/5 hidden lg:flex flex-col py-8 px-6">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2">Welcome Back</p>
            <h3 className="font-semibold">{session.user.user_metadata?.name || session.user.email}</h3>
          </div>

          <nav className="space-y-2 flex-grow">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-white text-black font-semibold shadow-sm' : 'text-black/60 hover:bg-black/5'}`}
            >
              <PieChart size={18} />
              Portfolio Overview
            </button>
            <button 
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors text-black/60 hover:bg-black/5`}
            >
              <FileText size={18} />
              Documents & K-1s
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors ${activeTab === 'contacts' ? 'bg-white text-black font-semibold shadow-sm' : 'text-black/60 hover:bg-black/5'}`}
            >
              <Users size={18} />
              Inquiries (Admin)
            </button>
          </nav>
          
          <div className="pt-8 border-t border-black/5">
            <p className="text-xs text-black/40 mb-4">Support Contact</p>
            <p className="text-sm font-semibold">ir@adnoir.com</p>
            <p className="text-sm">+1 (305) 555-0123</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          {activeTab === 'overview' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-semibold mb-2 tracking-tight">Q2 2026 Summary</h2>
                  <p className="text-black/60">Your consolidated investment performance.</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white border border-black/10 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-colors">
                  <Download size={14} />
                  Export PDF
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium mb-2">Total Equity Committed</p>
                  <p className="text-3xl font-semibold tracking-tight">$12,500,000</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium mb-2">Distributed to Date</p>
                  <p className="text-3xl font-semibold tracking-tight">$3,240,000</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium mb-2">Net IRR (Projected)</p>
                  <p className="text-3xl font-semibold tracking-tight">18.4%</p>
                </div>
              </div>

              {/* Active Investments */}
              <h3 className="text-xl font-semibold tracking-tight mb-6">Active Investments</h3>
              <div className="bg-white shadow-sm rounded-2xl border border-black/5 overflow-hidden">
                {[
                  { name: 'The Obsidian Tower', location: 'Miami, FL', commit: '$5,000,000', status: 'Constructing', return: '21.0%' },
                  { name: 'Aura Residences', location: 'Austin, TX', commit: '$4,500,000', status: 'Stabilized', return: '16.5%' },
                  { name: 'Noir Logistics Hub', location: 'Dallas, TX', commit: '$3,000,000', status: 'Leasing', return: '18.2%' },
                ].map((project, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-black/5 last:border-0 hover:bg-black/5 transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      <p className="text-xs text-black/50">{project.location}</p>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-black/40 mb-1 font-medium">Committed</p>
                        <p className="font-medium">{project.commit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-black/40 mb-1 font-medium">Status</p>
                        <span className="px-3 py-1 bg-black/5 text-xs font-medium rounded-full">{project.status}</span>
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] uppercase tracking-wider text-black/40 mb-1 font-medium">Target IRR</p>
                        <p className="font-semibold">{project.return}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-10">
                <h2 className="text-3xl font-semibold tracking-tight mb-2">Form Inquiries</h2>
                <p className="text-black/60">Messages submitted through the contact form.</p>
              </div>

              <div className="bg-white shadow-sm rounded-2xl border border-black/5 overflow-hidden">
                {contacts.length === 0 ? (
                  <div className="p-12 text-center text-black/50">
                    No inquiries found.
                  </div>
                ) : (
                  <div className="divide-y divide-black/5">
                    {contacts.map((contact, i) => (
                      <div key={i} className="p-6 hover:bg-black/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{contact.name} <span className="text-sm font-normal text-black/50 ml-2">({contact.email})</span></h4>
                            <p className="text-xs font-medium text-black/60 uppercase tracking-widest mt-1">{contact.subject}</p>
                          </div>
                          <span className="text-xs text-black/40">{new Date(contact.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm mt-4 text-black/80">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
