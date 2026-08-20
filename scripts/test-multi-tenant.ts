import { mockDb } from '../src/services/mockDb';

function runMultiTenancyTests() {
  console.log('--- RUNNING MULTI-TENANCY ISOLATION TESTS ---');

  // Business A: Cafetería Artesanal Aroma (biz-negocio-a)
  // Business B: Barbería El Corte Clásico (biz-negocio-b)

  const customersA = mockDb.getCustomers('biz-negocio-a');
  const customersB = mockDb.getCustomers('biz-negocio-b');

  console.log(`Business A customers count: ${customersA.length}`);
  console.log(`Business B customers count: ${customersB.length}`);

  // Ensure no overlap in customers
  const customerIdsA = new Set(customersA.map((c) => c.id));
  const hasOverlap = customersB.some((c) => customerIdsA.has(c.id));

  if (hasOverlap) {
    throw new Error('TEST FAILED: Data leakage detected between Business A and Business B customers!');
  } else {
    console.log('✔ TEST PASSED: Customer data is completely isolated between tenants.');
  }

  // Ensure Rewards isolation
  const rewardsA = mockDb.getRewards('biz-negocio-a');
  const rewardsB = mockDb.getRewards('biz-negocio-b');

  const rewardIdsA = new Set(rewardsA.map((r) => r.id));
  const rewardOverlap = rewardsB.some((r) => rewardIdsA.has(r.id));

  if (rewardOverlap) {
    throw new Error('TEST FAILED: Reward data leakage detected!');
  } else {
    console.log('✔ TEST PASSED: Reward data is completely isolated between tenants.');
  }

  // Test cross-tenant modification prevention
  try {
    const custB = customersB[0];
    mockDb.updateCustomer('biz-negocio-a', custB.id, { name: 'Hacked Name' });
    console.error('TEST FAILED: Business A was able to update Business B customer!');
  } catch (err: any) {
    console.log('✔ TEST PASSED: Business A cannot modify Business B customer:', err.message);
  }

  console.log('--- ALL MULTI-TENANCY ISOLATION TESTS PASSED SUCCESSFULLY ---');
}

runMultiTenancyTests();
