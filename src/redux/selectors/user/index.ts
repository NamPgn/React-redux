export const userErr$ = (state => state.user.error);
export const loginUser$ = (state => state.user.login);
export const isLogin$=(state => state.user.isLogin);

export const cartUserPending$ = (state => state.user.isLoading);
export const cartUserFulfilled$ = (state => state.user.cartUser);