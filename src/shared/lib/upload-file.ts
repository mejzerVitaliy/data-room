import axios from 'axios';

export const uploadFileToStorage = async (params: {
  uploadUrl: string;
  file: File;
  onProgress: (percent: number) => void;
  signal?: AbortSignal;
}): Promise<void> => {
  const { uploadUrl, file, onProgress, signal } = params;
  const PERCENT_MULTIPLIER = 100;

  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    signal,
    onUploadProgress: event => {
      if (!event.total) {
        return;
      }

      onProgress(Math.round((event.loaded / event.total) * PERCENT_MULTIPLIER));
    },
  });
};
