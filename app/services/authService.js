const authenticate = async (username, password) => {
    if (username === 'A') {
        return 'Hungry Panda';
    } else if (username === 'B') {
        return 'Exciting Giraffe';
    }

    return null;
};

export default { authenticate };