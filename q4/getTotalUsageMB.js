// Test question
function getTotalUsageMBBuggy(records) {
    return records.reduce((total, record) => {
        total += record.dataUsageMB;
    });
}

function getTotalUsageMB(records) {
    return records.reduce((total, record) => {
        const usage = record.dataUsageMB || 0;

        return total + usage;
    }, 0);
}

module.exports = { getTotalUsageMB, getTotalUsageMBBuggy };