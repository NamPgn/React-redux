
//product
export const product$ = (state => state.product.value);
export const getOneProduct$ = (state => state.product.getOneProduct);
export const getAllProductsByCategory$ = (state => state.product.getAllProductByCategory);
//category
export const category$ = (state => state.category.category);
export const allCategoryNotReq$ = (state => state.category.categoryNotReqId);
export const getCategoryOne$ = ((state:any) => state.category.details);


//user
export const user$ = (state => state.user.value);


//admin
export const admin$ = (state) => state.user.value;

//post

export const post$ = (state => state.post.value);
export const trailerEdit$ = (state => state.post.trailerValues);


//comment

export const comment$ = (state => state.comment.value);