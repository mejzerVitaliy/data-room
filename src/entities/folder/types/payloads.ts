export interface ICreateFolderPayload {
  dataRoomId: string;
  parentId?: string | null;
  name: string;
}

export interface IUpdateFolderPayload {
  name?: string;
  parentId?: string | null;
}
