import intances from "./instances";

export const getCategoryMains = async () => await intances.get('/types');
export const getCategoryMain = async () => await intances.get('/types');