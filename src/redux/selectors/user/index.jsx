export const userErr$ = (state => state.user.error);

export const cartUserPending$ = (state => state.user.isLoading);
export const cartUserFulfilled$ = (state => state.user.cartUser);