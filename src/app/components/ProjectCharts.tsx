import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList, AreaChart, Area, Legend,
} from 'recharts';
import { motion } from 'motion/react';

const PIE_COLORS = ['#2d3748', '#4a5568', '#718096', '#a0aec0', '#cbd5e0'];
const TT = { borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' };

// ─── EPC DATA ──────────────────────────────────────────────────────────────────
const epcTrackRecord = [
  { name: 'Fund I', irr: 21.2 },
  { name: 'Fund II', irr: 24.1 },
  { name: 'WGA Co-Inv', irr: 41.1 },
  { name: 'Belay PJV', irr: 25.2 },
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
  { year: "04-09", ret: 34 }, { year: "05-10", ret: 18 }, { year: "06-11", ret: 28 },
  { year: "07-12", ret: 25 }, { year: "08-13", ret: 31 }, { year: "09-14", ret: 89 },
  { year: "10-15", ret: 109 }, { year: "11-16", ret: 87 }, { year: "12-17", ret: 72 },
  { year: "13-18", ret: 65 }, { year: "14-19", ret: 66 }, { year: "15-20", ret: 35 },
  { year: "16-21", ret: 58 }, { year: "17-22", ret: 33 }, { year: "18-23", ret: 19 },
  { year: "19-24", ret: 24 }, { year: "20-25", ret: 25 },
];

const epcSatisfaction = [
  { metric: 'Likely to Recommend', pct: 90 },
  { metric: 'Comm. Frequency', pct: 98 },
  { metric: 'Comm. Clarity', pct: 90 },
  { metric: 'Return Satisfaction', pct: 76 },
  { metric: 'Confidence in Performance', pct: 87 },
];

const epcReinvest = [
  { cohort: 'Fund II → III', rate: 85.1 },
  { cohort: 'Fund III → IV', rate: 59.7 },
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

// ─── APOTECH DATA ──────────────────────────────────────────────────────────────
const apotechDemand = [
  { name: 'AI Workloads', value: 50 },
  { name: 'Cloud', value: 30 },
  { name: 'Enterprise', value: 20 },
];

const apotechCapacity = [
  { year: '2020', gw: 13 },
  { year: '2025', gw: 42 },
  { year: '2030E', gw: 128 },
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

// ─── FRONTGATE DATA ────────────────────────────────────────────────────────────
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

export function ProjectCharts({ projectId }: { projectId: string }) {

  // ─── EPC ─────────────────────────────────────────────────────────────────────
  if (projectId === 'epc-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">

        {/* KPI Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 rounded-3xl overflow-hidden"
        >
          {[
            { value: '$1.2B', label: 'Assets Under Management' },
            { value: '23', label: 'Realized Investments' },
            { value: '23.5%', label: 'Avg Net IRR (Realized)' },
            { value: '2.2x', label: 'Avg Equity Multiple' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-8 py-7 flex flex-col gap-1">
              <span className="text-2xl font-semibold text-black">{stat.value}</span>
              <span className="text-xs text-black/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 1. Track Record */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Historical Performance (Net IRR %)</h4>
          <p className="text-xs text-black/50 mb-8">Sample realized & unrealized track record across funds</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcTrackRecord} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v}%`, 'Net IRR']} />
                <Bar dataKey="irr" fill="#1a1a1a" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="irr" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: '10px', fill: '#1a1a1a', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 2. AUM Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">AUM Growth</h4>
          <p className="text-xs text-black/50 mb-8">Assets Under Management (Millions USD) — 44% CAGR since 2011</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={epcAum} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={TT} formatter={(v: number) => [`$${v}M`, 'AUM']} />
                <Area type="monotone" dataKey="aum" stroke="#1a1a1a" fillOpacity={1} fill="url(#colorAum)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. Geographic Diversification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Geographic Diversification</h4>
          <p className="text-xs text-black/50 mb-8">Portfolio distribution across high-growth Sun-Belt markets</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={epcCities} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  paddingAngle={2} dataKey="value" animationDuration={1500}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                >
                  {epcCities.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 4. 5-Year CRE Returns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">5-Year CRE Total Returns by Vintage</h4>
          <p className="text-xs text-black/50 mb-8">Early-cycle acquisitions consistently outperform across market cycles</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcCreReturns} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#00000080' }} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v}%`, 'Return']} />
                <Bar dataKey="ret" fill="#718096" radius={[2, 2, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 5. Investor Satisfaction (horizontal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Investor Satisfaction Scores</h4>
          <p className="text-xs text-black/50 mb-8">% of surveyed investors responding favorably</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcSatisfaction} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#00000015" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} width={130} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v}%`, 'Score']} />
                <Bar dataKey="pct" fill="#1a1a1a" radius={[0, 4, 4, 0]} animationDuration={1500}>
                  <LabelList dataKey="pct" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: '10px', fill: '#1a1a1a', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 6. Reinvestment Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.35 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Investor Reinvestment Rate</h4>
          <p className="text-xs text-black/50 mb-8">% of investors who re-committed capital in the subsequent fund</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcReinvest} margin={{ top: 20, right: 20, left: -20, bottom: 0 }} barSize={56}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="cohort" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v}%`, 'Reinvestment Rate']} />
                <Bar dataKey="rate" fill="#4a5568" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="rate" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: '11px', fill: '#4a5568', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 7. Property Class Mix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Portfolio Class Composition</h4>
          <p className="text-xs text-black/50 mb-8">Asset quality distribution across current portfolio</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={epcClassMix} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  paddingAngle={2} dataKey="value" animationDuration={1500}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                >
                  {epcClassMix.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 8. Value-Add Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.45 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Value-Add Execution Impact</h4>
          <p className="text-xs text-black/50 mb-8">Average % improvement post-renovation (Realized vs. Unrealized)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcValueAdd} margin={{ top: 20, right: 20, left: -20, bottom: 0 }} barSize={42}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `+${v}%`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`+${v}%`, '']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="realized" name="Realized" fill="#1a1a1a" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="realized" position="top" formatter={(v: number) => `+${v}%`} style={{ fontSize: '10px', fill: '#1a1a1a', fontWeight: 'bold' }} />
                </Bar>
                <Bar dataKey="unrealized" name="Unrealized" fill="#a0aec0" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="unrealized" position="top" formatter={(v: number) => `+${v}%`} style={{ fontSize: '10px', fill: '#718096', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    );
  }

  // ─── APOTECH ─────────────────────────────────────────────────────────────────
  if (projectId === 'apotech-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">

        {/* KPI Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="md:col-span-2 grid grid-cols-3 gap-px bg-black/10 rounded-3xl overflow-hidden"
        >
          {[
            { value: '97%', label: 'Global DC Occupancy' },
            { value: '77%', label: 'New Builds Pre-Leased' },
            { value: '94%', label: 'Platform Utilization' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-8 py-7 flex flex-col gap-1">
              <span className="text-2xl font-semibold text-black">{stat.value}</span>
              <span className="text-xs text-black/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 1. Demand Drivers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Data Center Demand Drivers</h4>
          <p className="text-xs text-black/50 mb-8">Breakdown of demand creating unprecedented capacity shortfall</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={apotechDemand} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  paddingAngle={2} dataKey="value" animationDuration={1500}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}
                >
                  {apotechDemand.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v: number) => [`${v}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 2. North America DC Capacity Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">North America DC Capacity Growth</h4>
          <p className="text-xs text-black/50 mb-8">Installed capacity (GW) — ~25% CAGR, fueling a critical supply gap</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apotechCapacity} margin={{ top: 20, right: 10, left: -10, bottom: 0 }} barSize={72}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `${v} GW`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v} GW`, 'Capacity']} />
                <Bar dataKey="gw" fill="#2d3748" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="gw" position="top" formatter={(v: number) => `${v} GW`} style={{ fontSize: '11px', fill: '#2d3748', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. NOI Growth Timeline (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="md:col-span-2 bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Platform NOI Growth Trajectory</h4>
          <p className="text-xs text-black/50 mb-8">Net Operating Income (Millions USD) — actuals through 2023, projections thereafter</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={apotechNoi} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d3748" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2d3748" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={TT} formatter={(v: number) => [`$${v}M`, 'NOI']} />
                <Area type="monotone" dataKey="noi" stroke="#2d3748" strokeWidth={2} fillOpacity={1} fill="url(#colorNoi)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 4. Portfolio Asset NOI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Portfolio — Asset NOI Contribution</h4>
          <p className="text-xs text-black/50 mb-8">Stable NOI per asset (Millions USD), $18M total platform</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apotechAssets} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`$${v}M`, 'NOI']} />
                <Bar dataKey="noi" fill="#4a5568" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="noi" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: '#4a5568', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 5. Chicago Asset Value Creation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Chicago Asset — Value Creation</h4>
          <p className="text-xs text-black/50 mb-8">Revenue +61% & EBITDA +146% since acquisition (Millions USD)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apotechChicago} margin={{ top: 20, right: 20, left: -10, bottom: 0 }} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`$${v}M`, '']} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="before" name="At Acquisition" fill="#a0aec0" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="before" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: '#718096', fontWeight: 'bold' }} />
                </Bar>
                <Bar dataKey="after" name="Current" fill="#2d3748" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="after" position="top" formatter={(v: number) => `$${v}M`} style={{ fontSize: '10px', fill: '#2d3748', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 6. Market CAGR Demand Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.35 }}
          className="md:col-span-2 bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Structural Demand — Market CAGR Drivers</h4>
          <p className="text-xs text-black/50 mb-8">Annual growth rate across key demand vectors powering data center expansion</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apotechMarketCAGR} layout="vertical" margin={{ top: 0, right: 60, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#00000015" />
                <XAxis type="number" domain={[0, 30]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} width={120} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v}%`, 'CAGR']} />
                <Bar dataKey="cagr" fill="#1a1a1a" radius={[0, 4, 4, 0]} animationDuration={1500}>
                  <LabelList dataKey="cagr" position="right" formatter={(v: number) => `${v}% CAGR`} style={{ fontSize: '11px', fill: '#1a1a1a', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    );
  }

  // ─── FRONTGATE AVON ───────────────────────────────────────────────────────────
  if (projectId === 'fontgate-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">

        {/* KPI Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="md:col-span-2 grid grid-cols-3 gap-px bg-black/10 rounded-3xl overflow-hidden"
        >
          {[
            { value: '84', label: 'Total Residences' },
            { value: '$1.925M+', label: 'Starting Price' },
            { value: '30 Yrs', label: 'Developer Track Record' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-8 py-7 flex flex-col gap-1">
              <span className="text-2xl font-semibold text-black">{stat.value}</span>
              <span className="text-xs text-black/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* 1. Pricing by Unit Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Starting Price by Residence Type</h4>
          <p className="text-xs text-black/50 mb-8">Entry pricing (Millions USD) — luxury mountain living</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frontgatePricing} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `$${v}M`} domain={[0, 4]} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`$${v.toFixed(3)}M`, 'Starting at']} />
                <Bar dataKey="price" fill="#2d3748" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="price" position="top" formatter={(v: number) => `$${v.toFixed(3)}M`} style={{ fontSize: '9px', fill: '#2d3748', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 2. Unit Mix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Residence Mix</h4>
          <p className="text-xs text-black/50 mb-8">Unit count distribution across 75 condos and 9 townhomes</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={frontgateUnitMix} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  paddingAngle={2} dataKey="value" animationDuration={1500}
                  label={({ name, value }) => `${name}: ${value}`} labelLine={false}
                >
                  {frontgateUnitMix.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={TT} formatter={(v: number) => [`${v} units`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. Average Square Footage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Average Interior Square Footage</h4>
          <p className="text-xs text-black/50 mb-8">Mid-range of floorplan sizes across residence categories</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frontgateSqft} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `${v.toLocaleString()} sf`} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v.toLocaleString()} sq ft`, 'Avg Size']} />
                <Bar dataKey="sqft" fill="#4a5568" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="sqft" position="top" formatter={(v: number) => `${v.toLocaleString()} sf`} style={{ fontSize: '9px', fill: '#4a5568', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 4. Distance to Key Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Proximity to Key Destinations</h4>
          <p className="text-xs text-black/50 mb-8">Distance in miles — unmatched access to world-class ski resorts</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frontgateDistance} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#00000015" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(v) => `${v} mi`} />
                <YAxis type="category" dataKey="place" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} width={100} />
                <Tooltip contentStyle={TT} cursor={{ fill: '#00000005' }} formatter={(v: number) => [`${v} miles`, '']} />
                <Bar dataKey="miles" fill="#718096" radius={[0, 4, 4, 0]} animationDuration={1500}>
                  <LabelList dataKey="miles" position="right" formatter={(v: number) => `${v} mi`} style={{ fontSize: '11px', fill: '#718096', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    );
  }

  return null;
}
