import { describe, it, expect } from 'vitest';
import { canViewProduct, hasDatabaseAccess, productVisibility, recordStatuses, validateProduct, type ProductDraft } from '@/lib/admin';

const now = new Date('2026-03-10T12:00:00Z');
describe('Admin business rules', () => {
  it('offers exactly Public, Database Subscriber and Internal visibility', () => { expect([...productVisibility]).toEqual(['Public', 'Database Subscriber', 'Internal']); });
  it('offers exactly Active and Inactive status', () => { expect([...recordStatuses]).toEqual(['Active', 'Inactive']); });
  it('shows Public products to visitors', () => { expect(canViewProduct({ visibility: 'Public', status: 'Active' }, 'visitor')).toBe(true); });
  it('shows Database Subscriber products only to subscribers and staff', () => {
    expect(canViewProduct({ visibility: 'Database Subscriber', status: 'Active' }, 'visitor')).toBe(false);
    expect(canViewProduct({ visibility: 'Database Subscriber', status: 'Active' }, 'subscriber')).toBe(true);
  });
  it('hides Internal products from subscribers', () => { expect(canViewProduct({ visibility: 'Internal', status: 'Active' }, 'subscriber')).toBe(false); expect(canViewProduct({ visibility: 'Internal', status: 'Active' }, 'staff')).toBe(true); });
  it('hides Inactive products from customers', () => { expect(canViewProduct({ visibility: 'Public', status: 'Inactive' }, 'subscriber')).toBe(false); });
  it('keeps access for a cancelled subscription until the paid period ends', () => {
    expect(hasDatabaseAccess({ status: 'Cancelled', paidThrough: new Date('2026-03-15T00:00:00Z') }, now)).toBe(true);
    expect(hasDatabaseAccess({ status: 'Cancelled', paidThrough: new Date('2026-03-01T00:00:00Z') }, now)).toBe(false);
  });
  it('gives expired subscriptions no access', () => { expect(hasDatabaseAccess({ status: 'Expired', paidThrough: new Date('2026-04-01T00:00:00Z') }, now)).toBe(false); });
  it('rejects product descriptions over 1,000 characters', () => {
    const d: ProductDraft = { name: 'A', sku: 'A-1', slug: 'a', description: 'x'.repeat(1001), categoryId: 'food', supplier: '', origin: '', packaging: '', moq: '', leadTime: '', specs: [], visibility: 'Public', status: 'Active' };
    expect(validateProduct(d)['description']).toBeDefined();
    expect(validateProduct({ ...d, description: 'ok' })).toEqual({});
  });
});
