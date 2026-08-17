export interface IDataRoom {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDataRoomResponse {
  message: string;
  data: {
    dataRoom: IDataRoom;
  };
}

export interface IDataRoomsResponse {
  message: string;
  data: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
    dataRooms: IDataRoom[];
  };
}

export interface IDeletePreview {
  folderCount: number;
  fileCount: number;
  totalSizeBytes: number;
}

export interface IDeletePreviewResponse {
  message: string;
  data: IDeletePreview;
}
