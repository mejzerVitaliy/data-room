export const suggestAlternateName = (name: string): string => {
  const lastDotIndex = name.lastIndexOf('.');
  const hasExtension = lastDotIndex > 0;
  const base = hasExtension ? name.slice(0, lastDotIndex) : name;
  const extension = hasExtension ? name.slice(lastDotIndex) : '';

  return `${base} (1)${extension}`;
};
