import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList, AreaChart, Area, Legend,
} from 'recharts';
import { motion } from 'motion/react';
import {
  Clock, Home, Building2, Users, Briefcase,
  TrendingUp, ArrowUpRight, Layers, CheckCircle2,
} from 'lucide-react';

// ── Tooltip ──────────────────────────────────────────────────────────────────────
const TT = { borderRadius: '10px', border: 'none', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.2)' };

// ── Color palettes ───────────────────────────────────────────────────────────────
const EPC = {
  dark: '#1B2242', mid: '#2E4A8A', blue: '#4A6FA5',
  amber: '#E8923A', teal: '#00A896', light: '#E8EAF4', bg: '#F2F3F7',
  pie: ['#1B2242', '#2E4A8A', '#4A6FA5', '#7B96C8', '#E8923A'],
};
const APO = {
  dark: '#1B2E52', mid: '#4A7AA8', teal: '#6B9EA0',
  light: '#8FC0C4', pale: '#B0C4D4', bg: '#EEF2F8',
  pie: ['#1B2E52', '#4A7AA8', '#6B9EA0', '#8FC0C4', '#B0C4D4'],
};
const FG = {
  gold: '#8B6521', slate: '#5A7898', pine: '#2E4A3A',
  stone: '#C4A35A', warm: '#D4B896', cream: '#F5F2ED',
  pie: ['#8B6521', '#5A7898', '#2E4A3A', '#C4A35A', '#D4B896'],
};

// ── Motion helper ────────────────────────────────────────────────────────────────
const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay },
});

// ── EPC DATA ─────────────────────────────────────────────────────────────────────
const epcTrackRecord = [
  { name: 'Fund I', irr: 21.2 }, { name: 'Fund II', irr: 24.1 },
  { name: 'WGA Co-Inv', irr: 41.1 }, { name: 'Belay PJV', irr: 25.2 },
  { name: 'Fund III', irr: 75.0 },
];
const epcAum = [
  { year: '2015', aum: 132 }, { year: '2016', aum: 222 }, { year: '2017', aum: 212 },
  { year: '2018', aum: 295 }, { year: '2019', aum: 392 }, { year: '2020', aum: 431 },
  { year: '2021', aum: 778 }, { year: '2022', aum: 1122 }, { year: '2023', aum: 1133 },
  { year: '2024', aum: 1265 }, { year: '2025', aum: 1232 }, { year: '2026', aum: 1246 },
];
const epcCities = [
  { name: 'DFW', value: 53 }, { name: 'Orlando', value: 30 },
  { name: 'Tampa', value: 10 }, { name: 'Houston', value: 7 },
];
const epcCreReturns = [
  { year: '04-09', ret: 34 }, { year: '05-10', ret: 18 }, { year: '06-11', ret: 28 },
  { year: '07-12', ret: 25 }, { year: '08-13', ret: 31 }, { year: '09-14', ret: 89 },
  { year: '10-15', ret: 109 }, { year: '11-16', ret: 87 }, { year: '12-17', ret: 72 },
  { year: '13-18', ret: 65 }, { year: '14-19', ret: 66 }, { year: '15-20', ret: 35 },
  { year: '16-21', ret: 58 }, { year: '17-22', ret: 33 }, { year: '18-23', ret: 19 },
  { year: '19-24', ret: 24 }, { year: '20-25', ret: 25 },
];
const epcSatisfaction = [
  { metric: 'Likely to Recommend', pct: 90 }, { metric: 'Comm. Frequency', pct: 98 },
  { metric: 'Comm. Clarity', pct: 90 }, { metric: 'Return Satisfaction', pct: 76 },
  { metric: 'Confidence in Performance', pct: 87 },
];
const epcReinvest = [
  { cohort: 'Fund II → III', rate: 85.1 }, { cohort: 'Fund III → IV', rate: 59.7 },
  { cohort: 'Fund IV → V', rate: 94.2 },
];
const epcClassMix = [
  { name: 'Class B', value: 59 }, { name: 'Class A-', value: 16 },
  { name: 'Class A', value: 12 }, { name: 'Class C+', value: 7 },
  { name: 'Class B+', value: 5 },
];
const epcValueAdd = [
  { metric: 'Revenue', realized: 33, unrealized: 25 },
  { metric: 'Cash NOI', realized: 54, unrealized: 26 },
];

// ── APOTECH DATA ─────────────────────────────────────────────────────────────────
const apotechDemand = [
  { name: 'AI Workloads', value: 50 }, { name: 'Cloud', value: 30 },
  { name: 'Enterprise', value: 20 },
];
const apotechCapacity = [
  { year: '2020', gw: 13 }, { year: '2025', gw: 42 }, { year: '2030E', gw: 128 },
];
const apotechNoi = [
  { year: '2023', noi: 7.7 }, { year: '2025E', noi: 8.3 }, { year: '2026E', noi: 8.6 },
  { year: '2027E', noi: 10.9 }, { year: '2028E', noi: 16.1 }, { year: '2029E', noi: 19.4 },
  { year: '2030E', noi: 21.1 }, { year: '2031E', noi: 21.8 },
];
const apotechAssets = [
  { name: 'Richardson', noi: 1.1 }, { name: 'Phoenix', noi: 0.8 },
  { name: 'Dallas', noi: 2.9 }, { name: 'Carrolton', noi: 7.8 },
  { name: 'Chicago', noi: 5.5 },
];
const apotechChicago = [
  { metric: 'Revenue', before: 2.7, after: 4.3 },
  { metric: 'EBITDA', before: 0.9, after: 2.3 },
];
const apotechMarketCAGR = [
  { factor: 'DC Capacity', cagr: 25 }, { factor: 'Data Storage', cagr: 23 },
  { factor: 'Internet Traffic', cagr: 21 }, { factor: 'Cloud Revenue', cagr: 20 },
];

// ── FRONTGATE DATA ────────────────────────────────────────────────────────────────
const frontgatePricing = [
  { type: '2 Bedroom', price: 1.925 }, { type: '3 Bedroom', price: 2.375 },
  { type: '4 Bedroom', price: 3.210 }, { type: '5 Bedroom', price: 3.210 },
  { type: 'Townhome', price: 3.650 },
];
const frontgateUnitMix = [
  { name: '2BR Condos', value: 32 }, { name: '3BR Condos', value: 26 },
  { name: '4BR Condos', value: 17 }, { name: 'Townhomes', value: 9 },
  { name: '5BR Condos', value: 2 },
];
const frontgateSqft = [
  { type: '2BR', sqft: 1524 }, { type: '3BR', sqft: 2113 },
  { type: '4BR', sqft: 2863 }, { type: '5BR', sqft: 2662 },
  { type: 'Townhome', sqft: 2658 },
];
const frontgateDistance = [
  { place: 'Beaver Creek', miles: 2.5 }, { place: 'Vail Village', miles: 10 },
  { place: 'Eagle Airport', miles: 25 }, { place: 'Denver', miles: 105 },
];

// ── Collage ──────────────────────────────────────────────────────────────────────
function Collage({ images, label }: { images: string[]; label: string }) {
  return (
    <motion.div {...fu(0.05)}>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{label}</p>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-80 rounded-3xl overflow-hidden">
        <div className="row-span-2 overflow-hidden group">
          <img src={images[0]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="col-span-2 overflow-hidden group">
          <img src={images[1]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="row-span-2 overflow-hidden group">
          <img src={images[4]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="overflow-hidden group">
          <img src={images[2]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="overflow-hidden group">
          <img src={images[3]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Image arrays ──────────────────────────────────────────────────────────────────
const EPC_SUMMARY_PHOTOS = [
  { src: '/projects/epc_photos/epc-1.png', caption: 'Pelican Lake – Tampa, FL' },
  { src: '/projects/epc_photos/epc-2.png', caption: 'The Boot Ranch – Tampa, FL' },
  { src: '/projects/epc_photos/epc-5.png', caption: 'Talcott at Windermere – Orlando, FL' },
  { src: '/projects/epc_photos/epc-6.png', caption: 'Harper Grove – Davenport, FL' },
];
const EPC_COLLAGE = [
  '/projects/epc_photos/epc-7.png',
  '/projects/epc_photos/epc-8.png',
  '/projects/epc_photos/epc-9.png',
  '/projects/epc_photos/epc-10.png',
  '/projects/epc_photos/epc-11.png',
];
const APO_COLLAGE = [
  '/projects/apotech/Project Core_Investors Teaser_04.2026_p11_i5.jpeg',
  '/projects/apotech/Project Core_Investors Teaser_04.2026_p11_i6.jpeg',
  '/projects/apotech/Project Core_Investors Teaser_04.2026_p12_i3.jpeg',
  '/projects/apotech/Project Core_Investors Teaser_04.2026_p12_i4.jpeg',
  '/projects/apotech/Project Core_Investors Teaser_04.2026_p17_i13.jpeg',
];
const FG_COLLAGE = [
  '/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p7_i0.jpeg',
  '/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p12_i0.jpeg',
  '/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p13_i0.jpeg',
  '/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p14_i0.jpeg',
  '/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p15_i0.jpeg',
];

export function ProjectCharts({ projectId }: { projectId: string }) {

  // ═══════════════════════════════════════════════════════════════════════════════
  // EPC
  // ═══════════════════════════════════════════════════════════════════════════════
  if (projectId === 'epc-01') {
    return (
      <div className="mt-12 pt-12 border-t border-black/10 space-y-10">

        {/* ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────── */}
        <motion.div {...fu(0)} className="rounded-3xl overflow-hidden bg-white" style={{ border: `1px solid ${EPC.dark}14` }}>
          <div className="px-10 pt-10 pb-6">
            <h3 className="text-3xl font-extralight tracking-tight" style={{ color: EPC.dark }}>
              Executive <span className="font-semibold">Summary</span>
            </h3>
            <p className="text-sm mt-1" style={{ color: EPC.dark + '70' }}>The opportunity at a glance</p>
          </div>

          {/* Stats banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: EPC.dark + '18' }}>
            {[
              { value: '$300 Million', label: 'Target Equity Commitments' },
              { value: '12% – 15%', label: 'Target Net IRR' },
              { value: '1.7x – 2.0x', label: 'Net Equity Multiple' },
              { value: '4% – 6%', label: 'Est. Avg. Annual Cash-on-Cash' },
            ].map((s) => (
              <div key={s.label} className="px-8 py-7" style={{ background: EPC.light }}>
                <div className="text-xl md:text-2xl font-bold" style={{ color: EPC.dark }}>{s.value}</div>
                <div className="text-[11px] mt-1 leading-tight" style={{ color: EPC.dark + '60' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bullets */}
          <div className="px-10 py-8 space-y-4 bg-white">
            {([
              <>Eagle Property Capital ("EPC") is a <strong>vertically integrated real estate investment manager pursuing value-add investment strategies</strong> through the acquisition, reposition and management of multifamily properties.</>,
              <><strong>EPC Multifamily Partners VI, LLC ("Fund VI")</strong> will be Eagle Property Capital's sixth fund offering <strong>$300 million of equity</strong>.</>,
              <>Fund VI will continue to take a disciplined investment approach, targeting <strong>multifamily properties with value-add potential located in high-growth U.S. markets</strong>.</>,
              <>Fund VI seeks to generate a <strong>net IRR of 12%–15%</strong> and a <strong>net equity multiple of 1.7x–2.0x</strong>, providing <strong>4–6% average annual cash on cash distributions</strong> upon stabilization.</>,
            ] as React.ReactNode[]).map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0" style={{ background: EPC.dark + '50' }} />
                <p className="text-sm leading-relaxed" style={{ color: EPC.dark + '70' }}>{b}</p>
              </div>
            ))}
          </div>

          {/* Property photos row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: EPC.dark + '18' }}>
            {EPC_SUMMARY_PHOTOS.map((p) => (
              <div key={p.src} className="relative aspect-video overflow-hidden group">
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-3 text-[10px] text-white font-medium">{p.caption}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── EPC AT A GLANCE ───────────────────────────────────────────────────── */}
        <motion.div {...fu(0.05)} className="rounded-3xl overflow-hidden bg-white" style={{ border: `1px solid ${EPC.dark}14` }}>
          <div className="px-10 pt-10 pb-6">
            <h3 className="text-3xl font-extralight tracking-tight" style={{ color: EPC.dark }}>
              EPC <span className="font-semibold">at a Glance</span>
            </h3>
          </div>

          {/* 5 stats */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 px-10 pb-8">
            {([
              { Icon: Clock, value: '15', unit: 'YEARS', label: 'of Experience' },
              { Icon: Home, value: '11,464', unit: '', label: 'Acquired Apartments' },
              { Icon: Building2, value: '46', unit: '', label: 'Multifamily Properties' },
              { Icon: Users, value: '199', unit: '', label: 'Team Members' },
              { Icon: Briefcase, value: '3', unit: '', label: 'Corporate Offices' },
            ] as { Icon: React.ElementType; value: string; unit: string; label: string }[]).map(({ Icon, value, unit, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <Icon size={26} strokeWidth={1.4} style={{ color: EPC.dark + '40' }} />
                <div className="text-3xl font-bold" style={{ color: EPC.dark }}>
                  {value}{unit && <span className="text-sm font-semibold ml-1">{unit}</span>}
                </div>
                <div className="text-[11px] leading-snug" style={{ color: EPC.dark + '50' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Color divider */}
          <div className="flex h-[3px]">
            <div className="flex-[5]" style={{ background: EPC.dark }} />
            <div className="flex-[1]" style={{ background: EPC.amber }} />
            <div className="flex-[1]" style={{ background: EPC.teal }} />
          </div>

          {/* Financial stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: EPC.dark + '12' }}>
            {([
              { Icon: TrendingUp, value: '$1.2B', label: 'AUM' },
              { Icon: ArrowUpRight, value: '$1.9B', label: 'Transaction Volume' },
              { Icon: Layers, value: '$760M', label: 'Equity Raised' },
              { Icon: CheckCircle2, value: '23', label: 'Realized Investments' },
            ] as { Icon: React.ElementType; value: string; label: string }[]).map(({ Icon, value, label }) => (
              <div key={label} className="px-8 py-6 flex gap-4 items-start" style={{ background: EPC.bg }}>
                <Icon size={18} strokeWidth={1.4} style={{ color: EPC.dark + '30' }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-2xl font-bold" style={{ color: EPC.dark }}>{value}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: EPC.dark + '50' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero photo */}
          <div className="h-64 overflow-hidden">
            <img src="/projects/epc_photos/epc-3.png" alt="EPC Portfolio" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* ── IMAGE COLLAGE ─────────────────────────────────────────────────────── */}
        <Collage images={EPC_COLLAGE} label="Portfolio Gallery" />

        {/* ── CHARTS ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* KPI Row */}
          <motion.div {...fu(0.1)} className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden" style={{ background: EPC.dark + '15' }}>
            {[
              { value: '$1.2B', label: 'Assets Under Management' },
              { value: '23', label: 'Realized Investments' },
              { value: '23.5%', label: 'Avg Net IRR (Realized)' },
              { value: '2.2x', label: 'Avg Equity Multiple' },
            ].map((s) => (
              <div key={s.label} className="bg-white px-8 py-7 flex flex-col gap-1">
                <span className="text-2xl font-semibold" style={{ color: EPC.dark }}>{s.value}</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: EPC.dark + '40' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Track Record */}
          <motion.div {...fu(0.15)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Historical Performance (Net IRR %)</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Sample realized & unrealized track record across funds</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={epcTrackRecord} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={EPC.dark + '12'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: EPC.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: EPC.dark + '80' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: EPC.dark + '05' }} formatter={(v: number) => [`${v}%`, 'Net IRR']} />
                  <Bar dataKey="irr" fill={EPC.dark} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="irr" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: '10px', fill: EPC.dark, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AUM Growth */}
          <motion.div {...fu(0.2)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>AUM Growth</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Assets Under Management (Millions USD) — 44% CAGR since 2011</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={epcAum} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={EPC.dark} stopOpacity={0.65} />
                      <stop offset="95%" stopColor={EPC.dark} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={EPC.dark + '12'} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`$${v}M`, 'AUM']} />
                  <Area type="monotone" dataKey="aum" stroke={EPC.dark} strokeWidth={2} fillOpacity={1} fill="url(#colorAum)" animationDuration={1200} animationEasing="ease-out" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Geographic Diversification */}
          <motion.div {...fu(0.25)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Geographic Diversification</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Portfolio distribution across high-growth Sun-Belt markets</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={epcCities} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                    paddingAngle={2} dataKey="value" animationDuration={1200}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                  >
                    {epcCities.map((_, i) => <Cell key={i} fill={EPC.pie[i % EPC.pie.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 5-Year CRE Returns */}
          <motion.div {...fu(0.3)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>5-Year CRE Total Returns by Vintage</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Early-cycle acquisitions consistently outperform across market cycles</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={epcCreReturns} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={EPC.dark + '12'} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: EPC.dark + '80' }} interval={1} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: EPC.dark + '05' }} formatter={(v: number) => [`${v}%`, 'Return']} />
                  <Bar dataKey="ret" fill={EPC.blue} radius={[2, 2, 0, 0]} animationDuration={1200} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Investor Satisfaction */}
          <motion.div {...fu(0.35)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Investor Satisfaction Scores</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>% of surveyed investors responding favorably</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={epcSatisfaction} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={EPC.dark + '12'} />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} width={130} />
                  <Tooltip contentStyle={TT} cursor={{ fill: EPC.dark + '05' }} formatter={(v: number) => [`${v}%`, 'Score']} />
                  <Bar dataKey="pct" fill={EPC.dark} radius={[0, 4, 4, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="pct" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: '10px', fill: EPC.dark, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Reinvestment Rate */}
          <motion.div {...fu(0.4)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Investor Reinvestment Rate</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>% of investors who re-committed capital in the subsequent fund</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={epcReinvest} margin={{ top: 20, right: 20, left: -20, bottom: 0 }} barSize={56}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={EPC.dark + '12'} />
                  <XAxis dataKey="cohort" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: EPC.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: EPC.dark + '80' }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                  <Tooltip contentStyle={TT} cursor={{ fill: EPC.dark + '05' }} formatter={(v: number) => [`${v}%`, 'Reinvestment Rate']} />
                  <Bar dataKey="rate" fill={EPC.mid} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="rate" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: '11px', fill: EPC.mid, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Portfolio Class Mix */}
          <motion.div {...fu(0.45)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Portfolio Class Composition</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Asset quality distribution across current portfolio</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={epcClassMix} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                    paddingAngle={2} dataKey="value" animationDuration={1200}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                  >
                    {epcClassMix.map((_, i) => <Cell key={i} fill={EPC.pie[i % EPC.pie.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Value-Add Impact */}
          <motion.div {...fu(0.5)} className="p-8 rounded-3xl" style={{ background: EPC.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: EPC.dark }}>Value-Add Execution Impact</h4>
            <p className="text-xs mb-8" style={{ color: EPC.dark + '50' }}>Average % improvement post-renovation (Realized vs. Unrealized)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={epcValueAdd} margin={{ top: 20, right: 20, left: -20, bottom: 0 }} barSize={42}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={EPC.dark + '12'} />
                  <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: EPC.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: EPC.dark + '80' }} tickFormatter={(v) => `+${v}%`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: EPC.dark + '05' }} formatter={(v: number) => [`+${v}%`, '']} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="realized" name="Realized" fill={EPC.dark} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="realized" position="top" formatter={(v: number) => `+${v}%`} style={{ fontSize: '10px', fill: EPC.dark, fontWeight: 'bold' }} />
                  </Bar>
                  <Bar dataKey="unrealized" name="Unrealized" fill={EPC.amber} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="unrealized" position="top" formatter={(v: number) => `+${v}%`} style={{ fontSize: '10px', fill: EPC.amber, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // APOTECH
  // ═══════════════════════════════════════════════════════════════════════════════
  if (projectId === 'apotech-01') {
    const stages = [
      { label: 'Operating', sub: 'Chicago • Atlanta • Miami', color: APO.dark },
      { label: 'Controlled', sub: 'Richardson • Phoenix • Dallas • Carrollton', color: APO.mid },
      { label: 'Pipeline', sub: '5–10 assets identified', color: APO.teal },
    ];

    return (
      <div className="mt-12 pt-12 border-t border-black/10 space-y-10">

        {/* ── MARKET OPPORTUNITY & STRATEGY ────────────────────────────────────── */}
        <motion.div {...fu(0)} className="rounded-3xl overflow-hidden bg-white" style={{ border: `1px solid ${APO.dark}14` }}>
          <div className="px-10 pt-10 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: APO.dark }}>
              Market Opportunity &amp; Strategy
            </h3>
            <p className="text-sm mt-1" style={{ color: APO.dark + '60' }}>Strong Demand Growth Meets Constrained Supply</p>
            <div className="h-0.5 w-14 mt-3" style={{ background: APO.teal }} />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 px-10 py-5 border-t border-b" style={{ borderColor: APO.dark + '10', background: APO.bg }}>
            {[
              { value: '97%', label: 'Global DC occupancy' },
              { value: '77%', label: 'Of new builds pre-leased' },
              { value: '+4 yrs', label: 'Tier I power connection wait' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-xl font-bold" style={{ color: APO.dark }}>{s.value}</span>
                <span className="text-xs" style={{ color: APO.dark + '60' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Strategy pillars */}
          <div className="px-10 py-8">
            <p className="text-sm font-bold mb-5" style={{ color: APO.dark }}>Project Core Strategy</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Strategic Markets', desc: 'Acquire & develop in key U.S. markets with chronic supply shortages and strong enterprise demand' },
                { title: 'AI & Hybrid Cloud', desc: 'Focus on inference and enterprise needs — the fastest growing and most underserved segment of the market' },
                { title: 'Key Differentiators', desc: 'Compliance, security, and direct operator expertise create significant barriers to entry and pricing power' },
              ].map((p) => (
                <div key={p.title} className="flex gap-3 items-start">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: APO.teal }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: APO.dark }}>{p.title}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: APO.dark + '60' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── PORTFOLIO & FINANCIAL TARGETS ─────────────────────────────────────── */}
        <motion.div {...fu(0.05)} className="rounded-3xl overflow-hidden bg-white" style={{ border: `1px solid ${APO.dark}14` }}>
          <div className="px-10 pt-10 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: APO.dark }}>
              Portfolio &amp; Financial Targets
            </h3>
            <p className="text-sm mt-1" style={{ color: APO.dark + '60' }}>Three-stage portfolio with disciplined return targets</p>
            <div className="h-0.5 w-14 mt-3" style={{ background: APO.teal }} />
          </div>

          {/* Portfolio Stages chevrons */}
          <div className="px-10 py-6">
            <p className="text-sm font-bold mb-4" style={{ color: APO.dark }}>Portfolio Stages</p>
            <div className="flex">
              {stages.map((s, i) => (
                <div
                  key={i}
                  className="relative flex-1 px-6 py-5 flex flex-col justify-center"
                  style={{
                    background: s.color,
                    clipPath:
                      i === 0
                        ? 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)'
                        : i === stages.length - 1
                        ? 'polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 20px 50%)'
                        : 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%, 20px 50%)',
                    marginLeft: i > 0 ? '-12px' : '0',
                    zIndex: stages.length - i,
                  }}
                >
                  <div className="text-white font-bold text-sm md:text-base">{s.label}</div>
                  <div className="text-white/60 text-[10px] mt-0.5 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Returns */}
          <div className="px-10 pb-10">
            <p className="text-sm font-bold mb-4" style={{ color: APO.dark }}>Target Returns</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '2.0x', label: 'MOIC' },
                { value: '8.0%', label: 'Preferred Return' },
                { value: '5-Yr', label: 'Hold Period' },
                { value: '20-25%', label: 'Target Gross IRR' },
              ].map((r) => (
                <div key={r.label} className="px-6 py-5 rounded-xl border-t-2" style={{ background: APO.bg, borderColor: APO.teal }}>
                  <div className="text-2xl font-bold" style={{ color: APO.dark }}>{r.value}</div>
                  <div className="text-xs mt-1" style={{ color: APO.dark + '60' }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── INVESTMENT TERMS & EXIT STRATEGY ─────────────────────────────────── */}
        <motion.div {...fu(0.1)} className="rounded-3xl overflow-hidden bg-white" style={{ border: `1px solid ${APO.dark}14` }}>
          <div className="px-10 pt-10 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: APO.dark }}>
              Investment Terms &amp; Exit Strategy
            </h3>
            <p className="text-sm mt-1" style={{ color: APO.dark + '60' }}>Institutional structure with multiple exit pathways</p>
            <div className="h-0.5 w-14 mt-3" style={{ background: APO.teal }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-10 pb-10 pt-6">
            {/* Investment Terms */}
            <div>
              <p className="text-sm font-bold mb-4" style={{ color: APO.dark }}>Investment Terms</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'US$60M', label: 'Fund Size' },
                  { value: '5 Years', label: 'Hold Period' },
                  { value: '1.5%', label: 'Asset Mgmt Fee' },
                  { value: '2.0%', label: 'Acquisition Fee' },
                  { value: '8%', label: 'Preferred Return' },
                  { value: '80/20', label: 'Profit Split' },
                ].map((t, i) => (
                  <div key={t.label} className="px-4 py-4 rounded-xl border-t-2"
                    style={{ background: APO.bg, borderColor: i % 2 === 0 ? APO.dark : APO.teal }}
                  >
                    <div className="text-lg font-bold" style={{ color: APO.dark }}>{t.value}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: APO.dark + '60' }}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exit Pathways */}
            <div>
              <p className="text-sm font-bold mb-4" style={{ color: APO.dark }}>Exit Pathways</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Platform Sale', desc: 'To institutional investors' },
                  { title: 'REIT / IPO', desc: 'Public market exit' },
                  { title: 'Strategic Sale', desc: 'To industry operators' },
                  { title: 'Recapitalization', desc: 'Partial liquidity event' },
                ].map((e, i) => (
                  <div key={e.title} className="px-5 py-4 rounded-xl border-t-2"
                    style={{ background: APO.bg, borderColor: i < 2 ? APO.teal : APO.mid }}
                  >
                    <div className="text-sm font-bold" style={{ color: APO.dark }}>{e.title}</div>
                    <div className="text-xs mt-1" style={{ color: APO.dark + '60' }}>{e.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── KPI ROW ───────────────────────────────────────────────────────────── */}
        <motion.div {...fu(0.15)} className="grid grid-cols-3 gap-px rounded-3xl overflow-hidden" style={{ background: APO.dark + '15' }}>
          {[
            { value: '97%', label: 'Global DC Occupancy' },
            { value: '77%', label: 'New Builds Pre-Leased' },
            { value: '94%', label: 'Platform Utilization' },
          ].map((s) => (
            <div key={s.label} className="bg-white px-8 py-7 flex flex-col gap-1">
              <span className="text-2xl font-semibold" style={{ color: APO.dark }}>{s.value}</span>
              <span className="text-xs uppercase tracking-wider" style={{ color: APO.dark + '40' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── IMAGE COLLAGE ─────────────────────────────────────────────────────── */}
        <Collage images={APO_COLLAGE} label="Platform Assets" />

        {/* ── CHARTS ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Demand Drivers */}
          <motion.div {...fu(0.2)} className="p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>Data Center Demand Drivers</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Breakdown of demand creating unprecedented capacity shortfall</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={apotechDemand} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                    paddingAngle={2} dataKey="value" animationDuration={1200}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                  >
                    {apotechDemand.map((_, i) => <Cell key={i} fill={APO.pie[i % APO.pie.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Capacity Growth */}
          <motion.div {...fu(0.25)} className="p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>North America DC Capacity Growth</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Installed capacity (GW) — ~25% CAGR, fueling a critical supply gap</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apotechCapacity} margin={{ top: 20, right: 10, left: -10, bottom: 0 }} barSize={72}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={APO.dark + '12'} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: APO.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} tickFormatter={(v) => `${v} GW`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: APO.dark + '05' }} formatter={(v: number) => [`${v} GW`, 'Capacity']} />
                  <Bar dataKey="gw" fill={APO.dark} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="gw" position="top" formatter={(v: number) => `${v} GW`} style={{ fontSize: '11px', fill: APO.dark, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* NOI Growth */}
          <motion.div {...fu(0.3)} className="md:col-span-2 p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>Platform NOI Growth Trajectory</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Net Operating Income (Millions USD) — actuals through 2023, projections thereafter</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={apotechNoi} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={APO.dark} stopOpacity={0.65} />
                      <stop offset="95%" stopColor={APO.dark} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={APO.dark + '12'} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`$${v}M`, 'NOI']} />
                  <Area type="monotone" dataKey="noi" stroke={APO.dark} strokeWidth={2} fillOpacity={1} fill="url(#colorNoi)" animationDuration={1200} animationEasing="ease-out" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Asset NOI */}
          <motion.div {...fu(0.35)} className="p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>Portfolio — Asset NOI Contribution</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Stable NOI per asset (Millions USD), $18M total platform</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apotechAssets} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={APO.dark + '12'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: APO.dark + '05' }} formatter={(v: number) => [`$${v}M`, 'NOI']} />
                  <Bar dataKey="noi" fill={APO.mid} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="noi" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: APO.mid, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chicago Value Creation */}
          <motion.div {...fu(0.4)} className="p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>Chicago Asset — Value Creation</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Revenue +61% & EBITDA +146% since acquisition (Millions USD)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apotechChicago} margin={{ top: 20, right: 20, left: -10, bottom: 0 }} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={APO.dark + '12'} />
                  <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: APO.dark + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: APO.dark + '05' }} formatter={(v: number) => [`$${v}M`, '']} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="before" name="At Acquisition" fill={APO.light} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="before" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: APO.teal, fontWeight: 'bold' }} />
                  </Bar>
                  <Bar dataKey="after" name="Current" fill={APO.dark} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="after" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: APO.dark, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Market CAGR */}
          <motion.div {...fu(0.45)} className="md:col-span-2 p-8 rounded-3xl" style={{ background: APO.dark + '06' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: APO.dark }}>Structural Demand — Market CAGR Drivers</h4>
            <p className="text-xs mb-8" style={{ color: APO.dark + '50' }}>Annual growth rate across key demand vectors powering data center expansion</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apotechMarketCAGR} layout="vertical" margin={{ top: 0, right: 60, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={APO.dark + '12'} />
                  <XAxis type="number" domain={[0, 30]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: APO.dark + '80' }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: APO.dark + '80' }} width={120} />
                  <Tooltip contentStyle={TT} cursor={{ fill: APO.dark + '05' }} formatter={(v: number) => [`${v}%`, 'CAGR']} />
                  <Bar dataKey="cagr" fill={APO.dark} radius={[0, 4, 4, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="cagr" position="right" formatter={(v: number) => `${v}% CAGR`} style={{ fontSize: '11px', fill: APO.dark, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // FRONTGATE AVON
  // ═══════════════════════════════════════════════════════════════════════════════
  if (projectId === 'fontgate-01') {
    return (
      <div className="mt-12 pt-12 border-t border-black/10 space-y-10">

        {/* ── LIVE THE LUXURY OF ADVENTURE ─────────────────────────────────────── */}
        <motion.div {...fu(0)} className="rounded-3xl overflow-hidden" style={{ background: FG.cream, border: `1px solid ${FG.gold}20` }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-10 py-10">
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-8" style={{ color: FG.gold }}>
                Live the Luxury<br />of Adventure
              </h3>
              <ul className="space-y-3">
                {[
                  'Up to 75 Luxury Condominiums: 2-, 3-, 4- and 5-Bedroom Residences',
                  '9 Luxury Townhomes: 4-Bedroom Residences with Attached Garage',
                  '4-Story Residential Building',
                  'Mountain Modern Design',
                  'Resort-Style Amenities',
                  'Located adjacent to the entrance of Beaver Creek Resort',
                  'Construction began in April of 2022',
                  'Opened Ski Season 2023–2024',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: '#3A3A3A' }}>
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: FG.gold }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-72 md:h-auto overflow-hidden">
              <img
                src="/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p1_i0.jpeg"
                alt="Frontgate Avon Exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ── RESIDENCE SELECTION ───────────────────────────────────────────────── */}
        <motion.div {...fu(0.05)} className="rounded-3xl overflow-hidden" style={{ background: FG.cream, border: `1px solid ${FG.gold}20` }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-10 py-10">
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase leading-tight mb-2" style={{ color: FG.gold }}>
                Residence Selection
              </h3>
              <p className="text-sm font-semibold mb-7" style={{ color: FG.slate }}>Up to 84 Luxury Residences*</p>
              <div className="space-y-5">
                {[
                  { count: 32, type: '2-Bedroom Condominiums', sqft: '1,135 – 1,912 sf', price: '$1.925M' },
                  { count: 26, type: '3-Bedroom Condominiums', sqft: '1,905 – 2,320 sf', price: '$2.375M' },
                  { count: 17, type: '4-Bedroom Condominiums', sqft: '2,659 – 3,066 sf', price: '$3.210M' },
                  { count: 2,  type: '5-Bedroom Condominiums', sqft: '2,662 sf', price: '$3.210M' },
                  { count: 9,  type: '4-Bedroom Townhomes', sqft: '2,637 – 2,679 sf', price: '$3.650M' },
                ].map((r) => (
                  <div key={r.type}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold" style={{ color: FG.gold }}>{r.count}</span>
                      <span className="text-sm font-medium" style={{ color: '#2C2C2C' }}>| {r.type}</span>
                    </div>
                    <div className="text-xs mt-0.5 ml-7" style={{ color: '#777' }}>
                      {r.sqft} | Starting at <strong style={{ color: FG.gold }}>{r.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-6 italic" style={{ color: '#999' }}>*Many of these floorplans also include a den and/or office.</p>
            </div>
            <div className="h-72 md:h-auto overflow-hidden">
              <img
                src="/projects/frontgate/Broker_Deck_Unbranded_8.26.24_compressed_compressed_p5_i0.jpeg"
                alt="Frontgate Residence Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* ── AMENITIES OVERVIEW ────────────────────────────────────────────────── */}
        <motion.div {...fu(0.1)} className="rounded-3xl px-10 py-10" style={{ background: FG.cream, border: `1px solid ${FG.gold}20` }}>
          <h3 className="text-3xl md:text-4xl font-extrabold uppercase mb-8" style={{ color: FG.gold }}>
            Amenities Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: FG.slate }}>Recreation</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>The Springs Outdoor Oasis &amp; Pioneer Plunge</p>
                    <p className="text-xs leading-relaxed mt-1" style={{ color: '#666' }}>
                      Residents and their guests will enjoy a one-of-a-kind, year-round outdoor aquatics experience
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {[
                        { bold: 'Big Spring', rest: ' – 15-person hot tub' },
                        { bold: 'Great Spring', rest: ' – 35-person hot tub' },
                        { bold: 'Pioneer Plunge', rest: ' – Large, state-of-the-art pool and water slide' },
                      ].map((b) => (
                        <li key={b.bold} className="flex gap-2 text-xs" style={{ color: '#666' }}>
                          <span style={{ color: FG.gold }}>•</span>
                          <span><strong style={{ color: '#3A3A3A' }}>{b.bold}</strong>{b.rest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>Riverview Terrace</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#666' }}>Spacious, elevated patio facing the Eagle River with fire pits, grills and outdoor gathering areas</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>Mountainside Courtyard</p>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>Expansive fire pits, dining areas and grills</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>Community Bikes + eBikes</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#666' }}>Hit the roads, trails, or head into town with community and environmentally friendly transportation</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>Golf Simulator*</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#666' }}>Get in a practice round with friends before hitting the Vail Valley's world-class golf courses</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2C2C2C' }}>Theater Room*</p>
                    <p className="text-xs mt-1" style={{ color: '#666' }}>Enjoy the latest big screen releases in your own on-site movie theater</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: FG.slate }}>Health &amp; Wellness</p>
                <ul className="space-y-1.5">
                  {['Private, state-of-the-art Techno Gym', 'Mountainside outdoor fitness equipment', 'State-of-the-art Air Sanitation System'].map((b) => (
                    <li key={b} className="flex gap-2 text-xs" style={{ color: '#666' }}>
                      <span style={{ color: FG.gold }}>•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: FG.slate }}>Child + Teen Activities</p>
                <ul className="space-y-1.5">
                  {['Mountainside Discovery Zone', 'Gaming / Teen Room – Multiple VR Gaming Stations, Arcade*'].map((b) => (
                    <li key={b} className="flex gap-2 text-xs" style={{ color: '#666' }}>
                      <span style={{ color: FG.gold }}>•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: FG.slate }}>Owner Conveniences</p>
              <ul className="space-y-2">
                {[
                  "Frontgate Market complete with grab n' go food options, staples, and libations",
                  '2 Adventure Shuttles to Vail & Beaver Creek',
                  'Private Resident Lockers + Storage',
                  'Ski/Boot Storage + Locker Room',
                  'Underground Heated Parking + Electric Vehicle Charging',
                  'On-site Concierge / Property Management Services',
                  '2 Common Work Spaces',
                  'Solar Energy Capture System to Minimize Energy Usage',
                  'Car, Bike and Dog washes',
                ].map((b) => (
                  <li key={b} className="flex gap-2 text-xs list-none" style={{ color: '#666' }}>
                    <span style={{ color: FG.gold }}>•</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── KPI ROW ───────────────────────────────────────────────────────────── */}
        <motion.div {...fu(0.15)} className="grid grid-cols-3 gap-px rounded-3xl overflow-hidden" style={{ background: FG.gold + '28' }}>
          {[
            { value: '84', label: 'Total Residences' },
            { value: '$1.925M+', label: 'Starting Price' },
            { value: '30 Yrs', label: 'Developer Track Record' },
          ].map((s) => (
            <div key={s.label} className="bg-white px-8 py-7 flex flex-col gap-1">
              <span className="text-2xl font-semibold" style={{ color: FG.gold }}>{s.value}</span>
              <span className="text-xs uppercase tracking-wider" style={{ color: FG.gold + '80' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── IMAGE COLLAGE ─────────────────────────────────────────────────────── */}
        <Collage images={FG_COLLAGE} label="Residence Gallery" />

        {/* ── CHARTS ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Starting Price */}
          <motion.div {...fu(0.2)} className="p-8 rounded-3xl" style={{ background: FG.gold + '08' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: FG.pine }}>Starting Price by Residence Type</h4>
            <p className="text-xs mb-8" style={{ color: FG.pine + '80' }}>Entry pricing (Millions USD) — luxury mountain living</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frontgatePricing} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={FG.gold + '20'} />
                  <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: FG.pine + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: FG.pine + '80' }} tickFormatter={(v) => `$${v}M`} domain={[0, 4]} />
                  <Tooltip contentStyle={TT} cursor={{ fill: FG.gold + '08' }} formatter={(v: number) => [`$${v.toFixed(3)}M`, 'Starting at']} />
                  <Bar dataKey="price" fill={FG.gold} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="price" position="top" formatter={(v: number) => `$${v.toFixed(3)}M`} style={{ fontSize: '9px', fill: FG.gold, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Residence Mix */}
          <motion.div {...fu(0.25)} className="p-8 rounded-3xl" style={{ background: FG.gold + '08' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: FG.pine }}>Residence Mix</h4>
            <p className="text-xs mb-8" style={{ color: FG.pine + '80' }}>Unit count distribution across 75 condos and 9 townhomes</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={frontgateUnitMix} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                    paddingAngle={2} dataKey="value" animationDuration={1200}
                    label={({ name, value }) => `${name}: ${value}`} labelLine={false}
                  >
                    {frontgateUnitMix.map((_, i) => <Cell key={i} fill={FG.pie[i % FG.pie.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={TT} formatter={(v: number) => [`${v} units`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Square Footage */}
          <motion.div {...fu(0.3)} className="p-8 rounded-3xl" style={{ background: FG.gold + '08' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: FG.pine }}>Average Interior Square Footage</h4>
            <p className="text-xs mb-8" style={{ color: FG.pine + '80' }}>Mid-range of floorplan sizes across residence categories</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frontgateSqft} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={FG.gold + '20'} />
                  <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: FG.pine + '80' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: FG.pine + '80' }} tickFormatter={(v) => `${v.toLocaleString()} sf`} />
                  <Tooltip contentStyle={TT} cursor={{ fill: FG.gold + '08' }} formatter={(v: number) => [`${v.toLocaleString()} sq ft`, 'Avg Size']} />
                  <Bar dataKey="sqft" fill={FG.slate} radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="sqft" position="top" formatter={(v: number) => `${v.toLocaleString()} sf`} style={{ fontSize: '9px', fill: FG.slate, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Proximity */}
          <motion.div {...fu(0.35)} className="p-8 rounded-3xl" style={{ background: FG.gold + '08' }}>
            <h4 className="text-sm font-semibold tracking-tight mb-2" style={{ color: FG.pine }}>Proximity to Key Destinations</h4>
            <p className="text-xs mb-8" style={{ color: FG.pine + '80' }}>Distance in miles — unmatched access to world-class ski resorts</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frontgateDistance} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={FG.gold + '20'} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: FG.pine + '80' }} tickFormatter={(v) => `${v} mi`} />
                  <YAxis type="category" dataKey="place" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: FG.pine + '80' }} width={100} />
                  <Tooltip contentStyle={TT} cursor={{ fill: FG.gold + '08' }} formatter={(v: number) => [`${v} miles`, '']} />
                  <Bar dataKey="miles" fill={FG.stone} radius={[0, 4, 4, 0]} animationDuration={1200} animationEasing="ease-out">
                    <LabelList dataKey="miles" position="right" formatter={(v: number) => `${v} mi`} style={{ fontSize: '11px', fill: FG.stone, fontWeight: 'bold' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  return null;
}
