import {passwordIssues} from '../src/services/authService.js';import {addPeriod} from '../src/services/billingService.js';
test('password policy reports all missing requirements',()=>{expect(passwordIssues('abc')).toHaveLength(3);expect(passwordIssues('StrongPass!')).toHaveLength(0);});
test('monthly billing advancement handles month end',()=>{expect(addPeriod(new Date('2026-01-31T00:00:00Z'),'monthly').toISOString()).toBe('2026-02-28T00:00:00.000Z');});
test('yearly billing advancement handles leap day',()=>{expect(addPeriod(new Date('2024-02-29T00:00:00Z'),'yearly').toISOString()).toBe('2025-02-28T00:00:00.000Z');});
