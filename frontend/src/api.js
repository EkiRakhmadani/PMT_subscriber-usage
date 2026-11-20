const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Get subscribers datas.
export async function getSubscribers() {
    const res = await fetch(`${API_URL}/subscribers`);
    if (!res.ok) {
        throw new Error('Failed to load subscribers')
    }

    const json = await res.json();

    console.log(json.data);
    return json.data;
}

// Post subscriber.
export async function createSubscriber(subscriberData) {
    const res = await fetch(`${API_URL}/subscribers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(subscriberData),
    });

    const json = await res.json();

    if (!res.ok) {
        const err = new Error(json.message || 'Failed to create subscriber');
        err.errors = json.errors || {};
        throw err;
    }

    console.log(json.data);
    return json.data;
}

// Get usages data, single or multiple as a lists.
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

// Post a new usage data.
export async function createUsage(usageData) {
    const res = await fetch(`${API_URL}/usages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(usageData),
    })

    const json = await res.json();

    if (!res.ok) {
        const err = new Error(json.message || 'Failed to create usage');
        err.errors = json.errors || {};
        throw err;
    }

    console.log(json.data);
    return json.data;
}