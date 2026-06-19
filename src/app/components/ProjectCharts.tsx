import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import { motion } from 'motion/react';

const COLORS = ['#1a365d', '#4a5568', '#718096', '#a0aec0']; // Ad Noir inspired or professional colors

const apotechDemandData = [
  { name: 'Enterprise', value: 50 },
  { name: 'Cloud', value: 30 },
  { name: 'AI', value: 20 }
];

const apotechNoiData = [
  { year: '2025E', noi: 8.3 },
  { year: '2030E', noi: 21.8 }
];

const epcTrackRecordData = [
  { name: 'Fund I', irr: 21.2 },
  { name: 'Fund II', irr: 24.1 },
  { name: 'WGA Co-Inv', irr: 41.1 },
  { name: 'Belay PJV', irr: 25.2 },
  { name: 'Fund III', irr: 75.0 },
];

export function ProjectCharts({ projectId }: { projectId: string }) {
  if (projectId === 'epc-01') {
    return (
      <div className="grid grid-cols-1 gap-8 mt-12 pt-12 border-t border-black/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
      </div>
    );
  }

  if (projectId === 'apotech-01') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-black/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
