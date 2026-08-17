import { create } from 'zustand';

export enum UploadStatus {
  Uploading = 'uploading',
  Processing = 'processing',
  Success = 'success',
  Error = 'error',
}

export type UploadQueueItem = {
  id: string;
  file: File;
  name: string;
  dataRoomId: string;
  folderId: string | null;
  status: UploadStatus;
  progress: number;
  errorMessage?: string;
};

interface UploadQueueStore {
  items: UploadQueueItem[];
  addItem: (queueItem: UploadQueueItem) => void;
  updateItem: (id: string, patch: Partial<UploadQueueItem>) => void;
  removeItem: (id: string) => void;
  clearFinished: () => void;
}

export const useUploadQueueStore = create<UploadQueueStore>(set => ({
  items: [],
  addItem: queueItem => set(state => ({ items: [...state.items, queueItem] })),
  updateItem: (id, patch) =>
    set(state => ({
      items: state.items.map(queueItem =>
        queueItem.id === id ? { ...queueItem, ...patch } : queueItem,
      ),
    })),
  removeItem: id =>
    set(state => ({
      items: state.items.filter(queueItem => queueItem.id !== id),
    })),
  clearFinished: () =>
    set(state => ({
      items: state.items.filter(
        queueItem =>
          queueItem.status !== UploadStatus.Success &&
          queueItem.status !== UploadStatus.Error,
      ),
    })),
}));
