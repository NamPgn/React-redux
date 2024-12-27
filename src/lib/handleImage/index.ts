export const handleImage = (width: number | string, url?: string): string => {
  if (!url) return ''; 
  const parts = url.split("/");

  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex !== -1) {
    parts.splice(uploadIndex + 1, 0, `w_${width},f_webp`);
  }

  return parts.join("/") || url;
};
