import { useState } from 'react'
import { createSubscriber } from '../api'

const emptyForm = {
    name: '',
    plan: 'Basic',
    activationDate: '',
}

function SubscriberForm({ onCreated }) {
    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        setErrors({})
        setSuccess('')
        setErrorMsg('')

        try {
            const subscriber = await createSubscriber(form)

            setSuccess(`Subscriber ${subscriber.id} - ${subscriber.name} created`)
            setForm(emptyForm)
            onCreated()
        } catch (err) {
            setErrors(err.errors || {})
            setErrorMsg(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Add Subscriber</h2>

            <label>
                Name
                <input
                    type="text"
                    name="name"
                    maxLength="100"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <small className="error">{errors.name[0]}</small>}
            </label>

            <label>
                Plan
                <select name="plan" value={form.plan} onChange={handleChange} required>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Family">Family</option>
                </select>
                {errors.plan && <small className="error">{errors.plan[0]}</small>}
            </label>

            <label>
                Activation Date
                <input
                    type="date"
                    name="activationDate"
                    value={form.activationDate}
                    onChange={handleChange}
                    required
                />
                {errors.activationDate && <small className="error">{errors.activationDate[0]}</small>}
            </label>

            <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Add Subscriber'}
            </button>

            {success && <p className="success">{success}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
    )
}

export default SubscriberForm
