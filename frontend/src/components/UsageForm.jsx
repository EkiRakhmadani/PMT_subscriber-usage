import { useState } from 'react'
import { createUsage } from '../api'


const emptyForm = {
    subscriberId: '',
    callMinutes: '',
    smsCount: '',
    dataUsageMB: '',
}

function UsageForm({ subscribers, onCreated }) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        setSuccess('');
        setErrorMsg('');

        try {
            const usage = await createUsage({
                subscriberId: form.subscriberId,
                callMinutes: Number(form.callMinutes),
                smsCount: Number(form.smsCount),
                dataUsageMB: Number(form.dataUsageMB)
            });

            setSuccess(`Usage for ${usage.subscriberId} saved at ${usage.timestamp}`);
            setForm(emptyForm);
            onCreated();
        } catch (err) {
            setErrors(err.errors || {});
            setErrorMsg(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Record Usage</h2>

            <label>
                Subscriber
                <select name="subscriberId" value={form.subscriberId} onChange={handleChange} required>
                    <option value="">-- choose subscriber --</option>
                    {subscribers.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                            {sub.id} - {sub.name} ({sub.plan})
                        </option>
                    ))}
                </select>
                {errors.subscriberId &&
                    <small className="error">{errors.subscriberId[0]}</small>
                }
            </label>

            <label>
                Call Minutes
                <input
                    name="callMinutes"
                    type="number"
                    min="0"
                    step="1"
                    value={form.callMinutes}
                    onChange={handleChange}
                    required
                />
                {errors.callMinutes &&
                    <small className="error">{errors.callMinutes[0]}</small>
                }
            </label>

            <label>
                SMS Count
                <input
                    name="smsCount"
                    type="number"
                    min="0"
                    step="1"
                    value={form.smsCount}
                    onChange={handleChange}
                    required
                />
                {errors.smsCount &&
                    <small className="error">{errors.smsCount[0]}</small>
                }
            </label>

            <label>
                Data Usage (MB)
                <input
                    type="number"
                    name="dataUsageMB"
                    min="0"
                    step="1"
                    value={form.dataUsageMB}
                    onChange={handleChange}
                    required
                />
                {errors.dataUsageMB &&
                    <small className="error">{errors.dataUsageMB[0]}</small>
                }
            </label>

            <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Usage'}
            </button>

            {success && <p className="success">{success}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
    )
}

export default UsageForm