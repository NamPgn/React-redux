import intances from "./instances"

export const getAllPostListsRequest = async () => {
  return await intances.get('/post');
}

export const addPostlistRequest = async (data) => {
  return await intances.post('/post', data)
}