export interface ICreateUploadUrlPayload {
  dataRoomId: string;
  folderId?: string | null;
  name: string;
  mimeType: string;
  sizeBytes: number;
}

export interface ICreateUploadUrlResult {
  uploadUrl: string;
  storageKey: string;
}

export interface ICompleteUploadPayload {
  dataRoomId: string;
  folderId?: string | null;
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
}

export interface IUpdateFilePayload {
  name?: string;
  folderId?: string | null;
}
