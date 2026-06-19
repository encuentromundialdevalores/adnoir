import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList, AreaChart, Area, LineChart, Line } from 'recharts';
import { motion } from 'motion/react';

const COLORS = ['#1a365d', '#4a5568', '#718096', '#a0aec0']; // Ad Noir inspired
const PIE_COLORS = ['#2d3748', '#4a5568', '#718096', '#a0aec0', '#cbd5e0'];

// APOTECH DATA
const apotechDemandData = [
  { name: 'Enterprise', value: 50 },
  { name: 'Cloud', value: 30 },
  { name: 'AI', value: 20 }
];

const apotechNoiData = [
  { year: '2025E', noi: 8.3 },
  { year: '2030E', noi: 21.8 }
];

// EPC DATA
const epcTrackRecordData = [
  { name: 'Fund I', irr: 21.2 },
  { name: 'Fund II', irr: 24.1 },
  { name: 'WGA Co-Inv', irr: 41.1 },
  { name: 'Belay PJV', irr: 25.2 },
  { name: 'Fund III', irr: 75.0 },
];

const epcAumData = [
  { year: '2015', aum: 132 },
  { year: '2016', aum: 222 },
  { year: '2017', aum: 212 },
  { year: '2018', aum: 295 },
  { year: '2019', aum: 392 },
  { year: '2020', aum: 431 },
  { year: '2021', aum: 778 },
  { year: '2022', aum: 1122 },
  { year: '2023', aum: 1133 },
  { year: '2024', aum: 1265 },
  { year: '2025', aum: 1232 },
  { year: '2026', aum: 1246 },
];

const epcCitiesData = [
  { name: 'DFW', value: 53 },
  { name: 'Orlando', value: 30 },
  { name: 'Tampa', value: 10 },
  { name: 'Houston', value: 7 },
];

const epcCreReturnsData = [
  { year: "04-09", return: 34 },
  { year: "05-10", return: 18 },
  { year: "06-11", return: 28 },
  { year: "07-12", return: 25 },
  { year: "08-13", return: 31 },
  { year: "09-14", return: 89 },
  { year: "10-15", return: 109 },
  { year: "11-16", return: 87 },
  { year: "12-17", return: 72 },
  { year: "13-18", return: 65 },
  { year: "14-19", return: 66 },
  { year: "15-20", return: 35 },
  { year: "16-21", return: 58 },
  { year: "17-22", return: 33 },
  { year: "18-23", return: 19 },
  { year: "19-24", return: 24 },
  { year: "20-25", return: 25 },
];


export function ProjectCharts({ projectId }: { projectId: string }) {
  if (projectId === 'epc-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">
        
        {/* Track Record */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Historical Performance (Net IRR %)</h4>
          <p className="text-xs text-black/50 mb-8">Sample realized and unrealized track record from previous funds.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcTrackRecordData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  cursor={{ fill: '#00000005' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Net IRR']}
                />
                <Bar dataKey="irr" fill="#1a1a1a" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="irr" position="top" formatter={(value: number) => `${value}%`} style={{ fontSize: '10px', fill: '#1a1a1a', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AUM Growth */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">AUM Growth</h4>
          <p className="text-xs text-black/50 mb-8">Assets Under Management (Millions $)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={epcAumData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(value) => `$${value}M`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`$${value}M`, 'AUM']}
                />
                <Area type="monotone" dataKey="aum" stroke="#1a1a1a" fillOpacity={1} fill="url(#colorAum)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cities Allocation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-black/5 p-8 rounded-3xl flex flex-col"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Geographic Diversification</h4>
          <p className="text-xs text-black/50 mb-8">Portfolio distribution across major Sun-Belt cities</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={epcCitiesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {epcCitiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CRE Total Returns */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-black/5 p-8 rounded-3xl"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">5-Year CRE Total Returns</h4>
          <p className="text-xs text-black/50 mb-8">Outperformance advantage on early cycle acquisitions</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={epcCreReturnsData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#00000080' }} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#00000080' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  cursor={{ fill: '#00000005' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Return']}
                />
                <Bar dataKey="return" fill="#718096" radius={[2, 2, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    );
  }

  if (projectId === 'apotech-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-black/5 p-8 rounded-3xl flex flex-col"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Demand Drivers</h4>
          <p className="text-xs text-black/50 mb-8">Data center demand breakdown</p>
          <div className="h-64 w-full flex-grow flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={apotechDemandData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {apotechDemandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-black/5 p-8 rounded-3xl flex flex-col"
        >
          <h4 className="text-sm font-semibold tracking-tight text-black mb-2">Projected NOI Growth</h4>
          <p className="text-xs text-black/50 mb-8">Net Operating Income (Millions US$)</p>
          <div className="h-64 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apotechNoiData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000015" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#00000080' }} tickFormatter={(value) => `$${value}M`} />
                <Tooltip 
                  cursor={{ fill: '#00000005' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`$${value}M`, 'NOI']}
                />
                <Bar dataKey="noi" fill="#2d3748" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  <LabelList dataKey="noi" position="top" formatter={(value: number) => `$${value}M`} style={{ fontSize: '10px', fill: '#2d3748', fontWeight: 'bold' }} />
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
