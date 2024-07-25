export const handleImage = (width: number | string, url?: string): string => {
  const parts = url ? url.split("/") : null;

  const uploadIndex = parts?.indexOf(`upload`);
  if (uploadIndex !== -1) {
    parts?.splice(uploadIndex + 1, 0, `w_${width}/f_webp`);
  }
  return parts?.join("/");
};
