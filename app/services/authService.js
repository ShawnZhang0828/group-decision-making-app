const authenticate = async (username, password) => {
    if (username === 'A') {
        return 'Hungry Panda';
    } else if (username === 'B') {
        return 'Mighty Narwhal';
    } else {
        return 'Cheerful Otter';
    }

    return null;
};

export default { authenticate };