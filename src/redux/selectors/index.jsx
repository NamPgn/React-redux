
//product
export const product$ = (state => state.product.value);
export const getOneProduct$ = (state => state.product.getOneProduct);

//category
export const category$ = (state => state.category.value);
export const allCategoryNotReq$ = (state => state.category.categoryNotReqId);
export const getCategoryOne$=(state => state.category.details);
//user
export const user$ = (state => state.user.value);


//admin
export const admin$ = (state) => state.user.value;

//post

export const post$ = (state => state.post.value);