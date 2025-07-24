import intances from "./instances";
export const createCombiningEpisodes = async (data: any) => {
  return await intances.post("/combining-episodes", data);
};

export const getListCombiningEpisodes = async () => {
  return await intances.get("/combining-episodes");
};

export const getCombiningEpisodesById = async (id: string) => {
  return await intances.get(`/combining-episodes/${id}`);
};

export const getCombiningEpisodesByEpisodeSlug = async (slug: string) => {
  return await intances.get(`/combining-episodes/episode/${slug}`);
};

export const updateCombiningEpisodes = async (id: string, data: any) => {
  return await intances.put(`/combining-episodes/${id}`, data);
};

export const deleteCombiningEpisodes = async (id: string) => {
  return await intances.delete(`/combining-episodes/${id}`);
};
