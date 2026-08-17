const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
const BYTES_PER_UNIT = 1024;

export const formatBytes = (bytes: number): string => {
  if (bytes <= 0) {
    return '0 B';
  }

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(BYTES_PER_UNIT)),
    BYTE_UNITS.length - 1,
  );
  const value = bytes / BYTES_PER_UNIT ** exponent;
  const decimals = exponent === 0 ? 0 : 1;

  return `${value.toFixed(decimals)} ${BYTE_UNITS[exponent]}`;
};

export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
