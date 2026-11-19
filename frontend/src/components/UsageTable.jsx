function UsageTable({ usages, subscribers, filter, onFilterChange, loading }) {
    const totalCalls = usages.reduce((sum, u) => sum + u.callMinutes, 0);
    const totalSms = usages.reduce((sum, u) => sum + u.smsCount, 0);
    const totalData = usages.reduce((sum, u) => sum + u.dataUsageMB, 0);

    return (
        <div className="card">
            <div className="table-header">
                <h2>Usage Records</h2>
                <select value={filter} onChange={onFilterChange}>
                    <option value="">All Subscribers</option>
                    {subscribers.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                            {sub.id} - {sub.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : usages.length === 0 ? (
                <p>No usage records found.</p>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Subscriber</th>
                                <th className="num">Call (min)</th>
                                <th className="num">SMS</th>
                                <th className="num">Data (MB)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usages.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.timestamp}</td>
                                    <td>{u.subscriberId} - {u.subscriberName}</td>
                                    <td className="num">{u.callMinutes}</td>
                                    <td className="num">{u.smsCount}</td>
                                    <td className="num">{u.dataUsageMB.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colSpan="2">Total ({usages.length} records)</td>
                                <td className="num">{totalCalls}</td>
                                <td className="num">{totalSms}</td>
                                <td className="num">{totalData.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UsageTable;