const test = require('node:test');
const assert = require('node:assert');
const { getTotalUsageMB, getTotalUsageMBBuggy } = require('./getTotalUsageMB');

const records = [
    { subscriberId: 'SUB01', dataUsageMB: 1500 },
    { subscriberId: 'SUB01', dataUsageMB: 1200 },
    { subscriberId: 'SUB02', dataUsageMB: 6000 },
    { subscriberId: 'SUB02', dataUsageMB: 5800 },
    { subscriberId: 'SUB03', dataUsageMB: 500 },
    { subscriberId: 'SUB04', dataUsageMB: 9000 },
    { subscriberId: 'SUB05', dataUsageMB: 5000 },
    { subscriberId: 'SUB06', dataUsageMB: 700 },
];

test('bug: hasilnya undefined kalau datanya banyak', () => {
    assert.strictEqual(getTotalUsageMBBuggy(records), undefined);
});

test('bug: mengembalikan object record kalau datanya cuma 1', () => {
    assert.deepStrictEqual(getTotalUsageMBBuggy([records[0]]), records[0]);
});

test('bug: error TypeError kalau array kosong', () => {
    assert.throws(() => getTotalUsageMBBuggy([]), TypeError);
});

test('fix: menjumlahkan dataUsageMB semua record', () => {
    assert.strictEqual(getTotalUsageMB(records), 29700);
});

test('fix: bisa untuk 1 record', () => {
    assert.strictEqual(getTotalUsageMB([records[0]]), 1500);
});

test('fix: hasilnya 0 kalau array kosong', () => {
    assert.strictEqual(getTotalUsageMB([]), 0);
});

test('fix: record tanpa dataUsageMB dihitung 0', () => {
    assert.strictEqual(getTotalUsageMB([records[0], { subscriberId: 'SUB07' }]), 1500);
});
