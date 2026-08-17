import { completeUpload } from 'entities/file/api/post';
import { createUploadUrl } from 'entities/file/api/upload-url';

import { QueryKeys } from 'shared/constants/query-keys';
import { getErrorMessage } from 'shared/lib/errors';
import { queryClient } from 'shared/lib/query';
import { uploadFileToStorage } from 'shared/lib/upload-file';
import {
  UploadQueueItem,
  UploadStatus,
  useUploadQueueStore,
} from 'shared/store/upload-queue';

const DEFAULT_MIME_TYPE = 'application/octet-stream';

type UploadTarget = {
  dataRoomId: string;
  folderId: string | null;
};

const runUpload = async (
  queueItem: UploadQueueItem,
  updateItem: (id: string, patch: Partial<UploadQueueItem>) => void,
) => {
  const { id, file, dataRoomId, folderId, name } = queueItem;

  try {
    const { data } = await createUploadUrl({
      dataRoomId,
      folderId,
      name,
      mimeType: file.type || DEFAULT_MIME_TYPE,
      sizeBytes: file.size,
    });

    await uploadFileToStorage({
      uploadUrl: data.uploadUrl,
      file,
      onProgress: progress => updateItem(id, { progress }),
    });

    updateItem(id, { status: UploadStatus.Processing, progress: 100 });

    await completeUpload({
      dataRoomId,
      folderId,
      name,
      mimeType: file.type || DEFAULT_MIME_TYPE,
      sizeBytes: file.size,
      storageKey: data.storageKey,
    });

    updateItem(id, { status: UploadStatus.Success });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_FILES] });
  } catch (error) {
    updateItem(id, {
      status: UploadStatus.Error,
      errorMessage: getErrorMessage(error),
    });
  }
};

export const useUploadFiles = () => {
  const addItem = useUploadQueueStore(state => state.addItem);
  const updateItem = useUploadQueueStore(state => state.updateItem);

  const uploadFiles = (files: File[], target: UploadTarget) => {
    files.forEach(file => {
      const queueItem: UploadQueueItem = {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        dataRoomId: target.dataRoomId,
        folderId: target.folderId,
        status: UploadStatus.Uploading,
        progress: 0,
      };

      addItem(queueItem);
      runUpload(queueItem, updateItem).catch(() => {});
    });
  };

  const retryWithName = (queueItem: UploadQueueItem, newName: string) => {
    const renamedFile = new File([queueItem.file], newName, {
      type: queueItem.file.type,
    });
    const nextItem: UploadQueueItem = {
      ...queueItem,
      file: renamedFile,
      name: newName,
      status: UploadStatus.Uploading,
      progress: 0,
      errorMessage: undefined,
    };

    updateItem(queueItem.id, nextItem);
    runUpload(nextItem, updateItem).catch(() => {});
  };

  return { uploadFiles, retryWithName };
};
