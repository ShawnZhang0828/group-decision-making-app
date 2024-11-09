const authenticate = async (username, password) => {
    if (username === 'A') {
        return 'Manager';
    } else if (username === 'B') {
        return 'Member';
    }

    return null;
};

export default { authenticate };