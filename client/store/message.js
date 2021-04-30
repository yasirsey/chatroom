export const state = () => ({
    registered: ''
});

export const mutations = {
    setRegistered(state, message) {
        state.registered = message;
    }
};