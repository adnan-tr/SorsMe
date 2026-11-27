import { describe, it, expect } from 'vitest';
import { plans, quotationPrice, requestCategoriesValid, paymentPolicy } from '@/lib/sorsme';
describe('Approved SorsMe business rules',()=>{
 it('charges $15/month for the sourcing database',()=>{const plan=plans.find(p=>p.id==='database');expect(plan?.price).toBe(15);expect(plan?.unit).toBe('month');});
 it('charges $20/request for up to 50 products',()=>{expect(quotationPrice(1)).toBe(20);expect(quotationPrice(50)).toBe(20);expect(plans.find(p=>p.id==='standard')?.price).toBe(20);});
 it('charges $45/request for 51–200 products',()=>{expect(quotationPrice(51)).toBe(45);expect(quotationPrice(200)).toBe(45);expect(plans.find(p=>p.id==='large')?.price).toBe(45);});
 it('rejects counts outside the quotation ranges',()=>{expect(quotationPrice(0)).toBeNull();expect(quotationPrice(201)).toBeNull();expect(quotationPrice(1.5)).toBeNull();});
 it('accepts multiple categories in one sourcing request',()=>{expect(requestCategoriesValid(['horeca','textiles','furniture'])).toBe(true);expect(requestCategoriesValid([])).toBe(false);expect(requestCategoriesValid(['unknown'])).toBe(false);});
 it('separates service fee and goods payment recipients',()=>{expect(paymentPolicy.servicePayee).toBe('SorsMe');expect(paymentPolicy.goodsPayee).toBe('Suppliers directly');});
});