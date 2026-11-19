const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export async function getSubscribers() {
    const res = await fetch(`${API_URL}/subsribers`);
    if (!res.ok) {
        throw new Error('Failed to load subscribers')
    }

    const json = await res.json();

    console.log(json.data);
    return json.data;
}

export async function getUsages(subscriberId) {
    let url = `${API_URL}/usages`;

    if (subscriberId) {
        url += `?subscriberId=${encodeURIComponent(subscriberId)}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to load usages')
    }

    const json = await res.json();

    console.log(json.data);
    return json.data;
}

export async function createUsage(usageData) {
    const res = await fetch(`${API_URL}/usages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(usageData),
    })

    if (!res.ok) {
        const err = new Error(json.message || 'Failed to create usage');
        err.errors = json.errors || {};
        throw err;
    }

    const json = await res.json();

    console.log(json.data);
    return json.data;
}