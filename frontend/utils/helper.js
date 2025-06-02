export const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');

    let initials = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            initials += words[i][0].toUpperCase();
        }
    }

    return initials.toUpperCase();
}

const API_BASE = 'http://localhost:8000';

export const apiGet = async (url, token) => {
    const res = await fetch(API_BASE + url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.json();
};

export const apiPost = async (url, data, token) => {
    const res = await fetch(API_BASE + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const apiPut = async (url, data, token) => {
    const res = await fetch(API_BASE + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const apiDelete = async (url, token) => {
    const res = await fetch(API_BASE + url, {
        method: 'DELETE',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return res.json();
};

export const apiPatch = async (url, data, token) => {
    const res = await fetch(API_BASE + url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(data)
    });
    return res.json();
};