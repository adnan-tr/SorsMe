import { Link } from '@tanstack/react-router';
import { ArrowLeft, Database, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';

export function ConnectionNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'admin-notice compact' : 'admin-notice'} role="status">
      <ShieldAlert size={18} />
      <div>
        <strong>Admin services not connected</strong>
        {!compact && <p>Admin sign-in, private records and saving aren't available yet. Only the public catalogue is shown, and forms download a draft file instead of saving.</p>}
      </div>
      <span className="admin-tag warning">Read-only preview</span>
    </div>
  );
}
export function PageTitle({ title, subtitle, crumbs, children }: { title: string; subtitle: string; crumbs?: string[]; children?: ReactNode }) {
  return (
    <div className="admin-page-heading">
      <div>
        {crumbs && <p className="admin-crumbs">{['Home', ...crumbs].join('  ›  ')}</p>}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children && <div className="admin-heading-actions">{children}</div>}
    </div>
  );
}
export function Panel({ title, icon, action, children, className = '' }: { title: string; icon?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`admin-panel ${className}`}>
      <header><h2>{icon}{title}</h2>{action}</header>
      <div className="admin-panel-body">{children}</div>
    </section>
  );
}
export function Unavailable({ title = 'No records available', text = 'These records will appear once admin services are connected.' }: { title?: string; text?: string }) {
  return (
    <div className="admin-empty">
      <Database />
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="admin-tag">Not connected</span>
    </div>
  );
}
export function Stat({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note?: string }) {
  return <div className="admin-stat">{icon}<span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>;
}
export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }) {
  return <span className={`admin-tag ${tone}`}>{children}</span>;
}
export function Field({ label, error, required, hint, children }: { label: string; error?: string | undefined; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <label className={error ? 'admin-field has-error' : 'admin-field'}>
      <span>{label}{required && <em> *</em>}</span>
      {children}
      {hint && !error && <small>{hint}</small>}
      {error && <small className="admin-error">{error}</small>}
    </label>
  );
}
export function BackLink({ to, label }: { to: '/admin/suppliers' | '/admin/products' | '/admin/categories'; label: string }) {
  return <Link className="admin-back" to={to}><ArrowLeft size={15} />{label}</Link>;
}
