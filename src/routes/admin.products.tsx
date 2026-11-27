import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { ArrowDownAZ, ArrowUpAZ, Pencil, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionNotice, PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { categories } from '@/lib/sorsme';
import { filterCatalogue, paginate, productRows } from '@/lib/admin';

export const Route = createFileRoute('/admin/products')({ component: Products });
const PAGE = 6;

function Products() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const rows = useMemo(() => filterCatalogue(productRows, q, cat, dir), [q, cat, dir]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const shown = paginate(rows, Math.min(page, pages), PAGE);
  return (
    <>
      <PageTitle title="Product Management" subtitle="Manage your product catalogue, visibility and publication status." crumbs={['Products']}>
        <Button asChild><Link to="/admin/product/$productId" params={{ productId: 'new' }}><Plus />Add Product</Link></Button>
      </PageTitle>
      <ConnectionNotice compact />
      <Panel title={`Catalogue (${rows.length})`}>
        <div className="admin-filters">
          <div className="admin-input-icon"><Search size={15} /><input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search products by name, slug or keyword…" aria-label="Search products" /></div>
          <select value={cat} onChange={(e) => { setCat(e.target.value); setPage(1); }} aria-label="Category"><option value="">All categories</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <Button variant="outline" onClick={() => setDir(dir === 'asc' ? 'desc' : 'asc')} aria-label="Sort by name">{dir === 'asc' ? <ArrowDownAZ /> : <ArrowUpAZ />}Name</Button>
          {(q || cat) && <button className="admin-link" onClick={() => { setQ(''); setCat(''); }}>Clear filters</button>}
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Product</th><th>Slug</th><th>Category</th><th>Supplier</th><th>Visibility</th><th>Status</th><th /></tr></thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p.id}>
                  <td><div className="admin-cell-media"><img src={p.image} alt="" /><div><strong>{p.name}</strong><small>{p.description}</small></div></div></td>
                  <td className="mono">{p.slug}</td>
                  <td>{p.category}</td>
                  <td className="muted">Private</td>
                  <td><Tag tone="success">Public</Tag></td>
                  <td><Tag tone="success">Active</Tag></td>
                  <td><Link className="admin-icon-btn" to="/admin/product/$productId" params={{ productId: p.id }} aria-label={`Edit ${p.name}`}><Pencil size={15} /></Link></td>
                </tr>
              ))}
              {shown.length === 0 && <tr><td colSpan={7} className="admin-empty-row">No products match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="admin-pager">
          <span>Showing {rows.length ? (Math.min(page, pages) - 1) * PAGE + 1 : 0}–{Math.min(Math.min(page, pages) * PAGE, rows.length)} of {rows.length} products</span>
          <div>{Array.from({ length: pages }, (_, i) => <button key={i} className={i + 1 === Math.min(page, pages) ? 'is-active' : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}</div>
        </div>
      </Panel>
    </>
  );
}
