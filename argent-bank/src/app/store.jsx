import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

let state = {
    isAuthenticated: false,
    userInfo: null,
    token: null,
    error: null,
}

export const login = createAction('LOGIN', ({ userInfo, token }) => ({
    payload: { userInfo, token },
}));

export const logout = createAction('LOGOUT');

export const setError = createAction('SET_ERROR', (error) => ({
    payload: error
}));

export const clearError = createAction('CLEAR_ERROR');

export const updateUserName = createAction('UPDATE_USER_NAME', (newUserName) => ({
    payload: newUserName,
}));

const reducer = createReducer(state, (builder) => {
    builder
    .addCase(login, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload.userInfo;
        state.error = null;
        state.token = action.payload.token;
    })
    .addCase(logout, (state) => {
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = null;
        state.token = null;
    })
    .addCase(setError, (state, action) => {
        state.error = action.payload;
    })
    .addCase(clearError, (state) => {
        state.error = null;
    })
    .addCase(updateUserName, (state, action) => {
        if (state.userInfo) {
            state.userInfo.userName = action.payload;
        }
    });
});

export const store = configureStore({
    preloadedState: state,
    reducer: {
        auth: reducer
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});