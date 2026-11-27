import { Link, useNavigate, useRouterState, type LinkProps } from '@tanstack/react-router';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User, X, type LucideIcon } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { demoToast } from '@/components/admin/records';

type To = NonNullable<LinkProps['to']>;
export type NavItem = { label: string; to: To; icon: LucideIcon; exact?: boolean; also?: string[] };
export type NavGroup = { title: string; items: NavItem[] };
export type SearchEntry = { label: string; hint: string; to: To };
export type ShellNotice = { title: string; date: string; unread?: boolean };

export function AppShell({ variant, brandTo, label, groups, user, notices, searchEntries, profileTo, settingsTo, children }: { variant: 'admin' | 'portal'; brandTo: To; label: string; groups: NavGroup[]; user: { name: string; role: string }; notices: ShellNotice[]; searchEntries: SearchEntry[]; profileTo: To; settingsTo: To; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname }).replace(/\/$/, '') || '/';
  const isActive = (it: NavItem) => { const to = String(it.to); return it.exact ? path === to : path === to || path.startsWith(`${to}/`) || (it.also ?? []).some((p) => path.startsWith(p)); };
  const crumbs = useMemo(() => { for (const g of groups) for (const it of g.items) if (isActive(it)) return [g.title, it.label]; return []; }, [path, groups]); // eslint-disable-line react-hooks/exhaustive-deps
  const results = q.trim() ? searchEntries.filter((e) => `${e.label} ${e.hint}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 7) : [];
  const unread = notices.filter((n) => n.unread).length;
  return (
    <div className={`admin-app ${variant}-app`}>
      <aside className={open ? 'admin-sidebar is-open' : 'admin-sidebar'} aria-label={`${label} navigation`}>
        <div className="admin-brand"><Link to={brandTo} onClick={() => setOpen(false)}>SorsMe</Link><span>{label}</span></div>
        <nav>
          {groups.map((g) => (
            <div key={g.title} className="admin-nav-group">
              {groups.length > 1 && <button className="admin-nav-title" aria-expanded={!collapsed[g.title]} onClick={() => setCollapsed({ ...collapsed, [g.title]: !collapsed[g.title] })}>{g.title}<ChevronDown size={13} className={collapsed[g.title] ? '-rotate-90 transition-transform' : 'transition-transform'} /></button>}
              {!collapsed[g.title] && g.items.map((it) => <Link key={String(it.to)} to={it.to} onClick={() => setOpen(false)} className={isActive(it) ? 'is-active' : undefined}><it.icon size={16} />{it.label}</Link>)}
            </div>
          ))}
        </nav>
        <Link to="/" className="admin-site-link">← Back to website</Link>
      </aside>
      {open && <button className="admin-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="admin-search">
            <Search size={15} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={variant === 'admin' ? 'Search pages, requests, customers…' : 'Search your account…'} aria-label="Global search" onKeyDown={(e) => { if (e.key === 'Enter' && results[0]) { void navigate({ to: results[0].to }); setQ(''); } if (e.key === 'Escape') setQ(''); }} />
            {results.length > 0 && <ul className="admin-search-results" role="listbox">{results.map((r) => <li key={`${r.label}-${r.hint}`}><Link to={r.to} onClick={() => setQ('')}><strong>{r.label}</strong><small>{r.hint}</small></Link></li>)}</ul>}
            {q.trim() && results.length === 0 && <ul className="admin-search-results"><li className="muted px-3 py-2 text-sm">No matches</li></ul>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className="admin-icon-btn relative" aria-label={`Notifications (${unread} unread)`}><Bell size={18} />{unread > 0 && <i className="admin-dot">{unread}</i>}</button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications · sample</DropdownMenuLabel><DropdownMenuSeparator />
              {notices.map((n) => <DropdownMenuItem key={n.title} className="flex flex-col items-start gap-0.5"><span className={n.unread ? 'font-semibold' : ''}>{n.title}</span><small className="text-muted-foreground">{n.date}</small></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className="admin-user"><span className="admin-avatar">{user.name.charAt(0)}</span><div className="text-left"><strong>{user.name}</strong><small>{user.role}</small></div><ChevronDown size={14} /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Preview account — not signed in</DropdownMenuLabel><DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to={profileTo}><User />Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={settingsTo}><Settings />Settings</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => demoToast('Sign-in is not connected yet')}><LogOut />Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="admin-content">
          {crumbs.length > 0 && <nav aria-label="Breadcrumb" className="admin-breadcrumbs"><Link to={brandTo}>{label}</Link>{crumbs.map((c) => <span key={c}>›<b>{c}</b></span>)}</nav>}
          {children}
        </div>
      </div>
    </div>
  );
}
