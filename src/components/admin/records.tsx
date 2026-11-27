import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownUp, ChevronLeft, ChevronRight, FlaskConical, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/admin/primitives';
import { statusTone, type TimelineEntry } from '@/lib/sample-data';

export function SampleNotice({ text = 'Illustrative sample data. Nothing on this screen is saved — changes reset when you reload.' }: { text?: string }) {
  return <div className="admin-notice compact sample" role="status"><FlaskConical size={17} /><div><strong>Sample data</strong> <span className="muted">· {text}</span></div><span className="admin-tag info">Frontend preview</span></div>;
}
export const StatusTag = ({ value }: { value: string }) => <Tag tone={statusTone(value)}>{value}</Tag>;
export const demoToast = (what: string) => toast(what, { description: 'Preview only — not saved or sent anywhere.' });

export type Column<T> = { key: string; label: string; render: (row: T) => ReactNode; sort?: (row: T) => string | number; className?: string };
export type Filter<T> = { label: string; options: string[]; get: (row: T) => string | string[] };

export function DataTable<T extends { id: string }>({ rows, columns, search, filters = [], pageSize = 8, onOpen, placeholder = 'Search…', empty = 'No records match your filters.' }: { rows: T[]; columns: Column<T>[]; search: (row: T) => string; filters?: Filter<T>[]; pageSize?: number; onOpen?: (row: T) => void; placeholder?: string; empty?: string }) {
  const [q, setQ] = useState('');
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = rows.filter((r) => (!term || search(r).toLowerCase().includes(term)) && filters.every((f) => { const v = chosen[f.label]; if (!v) return true; const got = f.get(r); return Array.isArray(got) ? got.includes(v) : got === v; }));
    const col = sort && columns.find((c) => c.key === sort.key);
    if (sort && col?.sort) { const fn = col.sort; out = [...out].sort((a, b) => { const x = fn(a), y = fn(b); return (x < y ? -1 : x > y ? 1 : 0) * sort.dir; }); }
    return out;
  }, [rows, q, chosen, sort, columns, filters, search]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);
  return (
    <div className="admin-datatable">
      <div className="admin-filters">
        <div className="admin-input-icon"><Search size={15} /><input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder={placeholder} aria-label="Search records" /></div>
        {filters.map((f) => (
          <select key={f.label} aria-label={f.label} value={chosen[f.label] ?? ''} onChange={(e) => { setChosen({ ...chosen, [f.label]: e.target.value }); setPage(1); }}>
            <option value="">All {f.label.toLowerCase()}</option>
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>{columns.map((c) => <th key={c.key} className={c.className}>{c.sort ? <button className="admin-sort" onClick={() => setSort(sort?.key === c.key ? { key: c.key, dir: sort.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 })}>{c.label}<ArrowDownUp size={12} /></button> : c.label}</th>)}{onOpen && <th />}</tr></thead>
          <tbody>
            {visible.length === 0 && <tr><td colSpan={columns.length + 1} className="admin-empty-row">{empty}</td></tr>}
            {visible.map((r) => (
              <tr key={r.id} className={onOpen ? 'is-clickable' : undefined} onClick={onOpen ? () => onOpen(r) : undefined}>
                {columns.map((c) => <td key={c.key} className={c.className}>{c.render(r)}</td>)}
                {onOpen && <td className="text-right"><button className="admin-link" onClick={(e) => { e.stopPropagation(); onOpen(r); }}>View</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-pager">
        <span className="muted">{filtered.length} record{filtered.length === 1 ? '' : 's'}</span>
        <div><button className="admin-icon-btn" aria-label="Previous page" disabled={current <= 1} onClick={() => setPage(current - 1)}><ChevronLeft size={16} /></button><span>Page {current} of {pages}</span><button className="admin-icon-btn" aria-label="Next page" disabled={current >= pages} onClick={() => setPage(current + 1)}><ChevronRight size={16} /></button></div>
      </div>
    </div>
  );
}

export function DetailSheet({ open, onClose, title, subtitle, children, wide = false }: { open: boolean; onClose: () => void; title: string; subtitle?: string; children: ReactNode; wide?: boolean }) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className={wide ? 'admin-sheet wide' : 'admin-sheet'}>
        <SheetHeader><SheetTitle className="font-display text-xl">{title}</SheetTitle>{subtitle && <SheetDescription>{subtitle}</SheetDescription>}</SheetHeader>
        <div className="admin-sheet-body">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export function Facts({ items }: { items: [string, ReactNode][] }) {
  return <dl className="admin-facts">{items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}
export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <section className="admin-section"><header><h3>{title}</h3>{action}</header>{children}</section>;
}
export function Timeline({ items }: { items: TimelineEntry[] }) {
  return <ol className="admin-timeline">{items.map((t, i) => <li key={`${t.date}-${i}`}><span /><div><strong>{t.label}</strong><small>{t.date}{t.by ? ` · ${t.by}` : ''}</small></div></li>)}</ol>;
}
export function Notes({ initial }: { initial: string[] }) {
  const [notes, setNotes] = useState(initial);
  const [text, setText] = useState('');
  return (
    <div className="admin-notes">
      {notes.length === 0 && <p className="muted text-sm">No internal notes yet.</p>}
      <ul>{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
      <form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setNotes([...notes, text.trim()]); setText(''); demoToast('Note added to this preview'); }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Add an internal note (staff only)…" aria-label="Internal note" />
        <Button type="submit" size="sm" variant="outline">Add note</Button>
      </form>
    </div>
  );
}
export const money = (n: number) => `${n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;
