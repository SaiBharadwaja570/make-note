export const validEmail = (email) => {
    const regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    return email.test(regex);
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