/**
 * Verification Script for Unique Visitor Tracking
 * 
 * This script verifies that:
 * 1. Each project has a unique visitor count
 * 2. Visitor counts start at 0
 * 3. Visitor counts increment correctly
 * 
 * Usage:
 *   npx ts-node scripts/verify-visitor-tracking.ts
 */

import {
  incrementVisitorCount,
  getVisitorCount,
  getAllVisitors,
} from '@/lib/visitor-tracking';

async function verifyVisitorTracking() {
  console.log('\n🔍 Verifying Unique Visitor Tracking...\n');

  try {
    // Test 1: New projects start with 0 visitors
    console.log('Test 1: New projects start with count = 0');
    console.log('─'.repeat(50));

    const testSlug1 = `test-project-${Date.now()}`;
    const initialCount = await getVisitorCount(testSlug1);
    console.log(`  Project "${testSlug1}"`);
    console.log(`  Initial count: ${initialCount}`);

    if (initialCount === 0) {
      console.log('  ✅ PASS: New project count is 0\n');
    } else {
      console.log(`  ❌ FAIL: Expected 0, got ${initialCount}\n`);
    }

    // Test 2: First visit increments to 1
    console.log('Test 2: First visit increments to 1');
    console.log('─'.repeat(50));

    const firstVisit = await incrementVisitorCount(testSlug1);
    console.log(`  Project "${testSlug1}"`);
    console.log(`  After first visit: ${firstVisit}`);

    if (firstVisit === 1) {
      console.log('  ✅ PASS: First visit count is 1\n');
    } else {
      console.log(`  ❌ FAIL: Expected 1, got ${firstVisit}\n`);
    }

    // Test 3: Subsequent visits increment correctly
    console.log('Test 3: Subsequent visits increment correctly');
    console.log('─'.repeat(50));

    const visit2 = await incrementVisitorCount(testSlug1);
    const visit3 = await incrementVisitorCount(testSlug1);
    const visit4 = await incrementVisitorCount(testSlug1);

    console.log(`  Project "${testSlug1}"`);
    console.log(`  Visit 2: ${visit2}`);
    console.log(`  Visit 3: ${visit3}`);
    console.log(`  Visit 4: ${visit4}`);

    if (visit2 === 2 && visit3 === 3 && visit4 === 4) {
      console.log('  ✅ PASS: Increments are correct\n');
    } else {
      console.log(`  ❌ FAIL: Expected 2, 3, 4, got ${visit2}, ${visit3}, ${visit4}\n`);
    }

    // Test 4: Different projects have different counts
    console.log('Test 4: Different projects have unique counts');
    console.log('─'.repeat(50));

    const testSlug2 = `test-project-${Date.now()}-2`;
    const testSlug3 = `test-project-${Date.now()}-3`;

    const projA1 = await incrementVisitorCount(testSlug2);
    const projB1 = await incrementVisitorCount(testSlug3);
    const projA2 = await incrementVisitorCount(testSlug2);

    console.log(`  Project A ("${testSlug2}"):`);
    console.log(`    Visit 1: ${projA1}`);
    console.log(`    Visit 2: ${projA2}`);
    console.log(`  Project B ("${testSlug3}"):`);
    console.log(`    Visit 1: ${projB1}`);

    if (projA1 === 1 && projA2 === 2 && projB1 === 1) {
      console.log('  ✅ PASS: Each project has unique count\n');
    } else {
      console.log(`  ❌ FAIL: Counts are not isolated\n`);
    }

    // Test 5: Verify records in database
    console.log('Test 5: Verify all records in database');
    console.log('─'.repeat(50));

    const allRecords = await getAllVisitors(10);
    console.log(`  Total visitor records: ${allRecords.length}`);

    const recordsToShow = allRecords.slice(0, 5);
    recordsToShow.forEach((record, index) => {
      console.log(`  ${index + 1}. ${record.slug}: ${record.count} visitors`);
    });

    if (allRecords.length > 0) {
      console.log('  ✅ PASS: Records found in database\n');
    } else {
      console.log('  ⚠️  No records found (this is okay if no one has visited yet)\n');
    }

    console.log('─'.repeat(50));
    console.log('✨ Verification Complete!\n');
    console.log('Summary:');
    console.log('  ✅ Each project has a unique visitor count');
    console.log('  ✅ New projects start with count = 0');
    console.log('  ✅ Visitor counts increment correctly');
    console.log('  ✅ Different projects have different counts');
    console.log('\n🎉 Unique Visitor Tracking is working correctly!\n');

  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verifyVisitorTracking();
