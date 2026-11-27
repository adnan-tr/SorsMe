import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

const palette = ['var(--primary)', 'var(--gold)', 'var(--success)', 'var(--muted-foreground)', 'var(--warning)'];
const axis = { fontSize: 11, fill: 'var(--muted-foreground)' };

export function TrendChart<T extends Record<string, string | number>>({ data, x, series, height = 220, kind = 'area' }: { data: T[]; x: string; series: { key: string; label: string }[]; height?: number; kind?: 'area' | 'bar' }) {
  return (
    <div style={{ height }} className="admin-chart">
      <ResponsiveContainer width="100%" height="100%">
        {kind === 'area' ? (
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey={x} tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', fontSize: 12 }} />
            {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} />}
            {series.map((s, i) => <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={palette[i % palette.length]} fill={palette[i % palette.length]} fillOpacity={0.12} strokeWidth={2} />)}
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey={x} tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', fontSize: 12 }} cursor={{ fill: 'var(--accent)' }} />
            {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} />}
            {series.map((s, i) => <Bar key={s.key} dataKey={s.key} name={s.label} fill={palette[i % palette.length]} radius={[3, 3, 0, 0]} />)}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
export function DonutChart({ data, height = 220 }: { data: { name: string; value: number }[]; height?: number }) {
  return (
    <div style={{ height }} className="admin-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2}>{data.map((d, i) => <Cell key={d.name} fill={palette[i % palette.length]} />)}</Pie>
          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
/** Count rows by a field, for "x by status" charts. */
export function countBy<T>(rows: T[], get: (r: T) => string) {
  const m = new Map<string, number>();
  rows.forEach((r) => m.set(get(r), (m.get(get(r)) ?? 0) + 1));
  return [...m].map(([name, value]) => ({ name, value }));
}
