import { IBreadcrumb } from 'shared/types/breadcrumb';

export type SharedResourceType = 'DATA_ROOM' | 'FOLDER' | 'FILE';

export interface ISharedFolder {
  id: string;
  dataRoomId: string;
  parentId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISharedFile {
  id: string;
  dataRoomId: string;
  folderId: string | null;
  name: string;
  mimeType: string;
  sizeBytes: number;
  uploadedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISharedContents {
  resourceType: SharedResourceType;
  dataRoomName: string;
  folder: ISharedFolder | null;
  breadcrumbs: IBreadcrumb[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
  folders: ISharedFolder[];
  files: ISharedFile[];
}

export interface ISharedContentsResponse {
  message: string;
  data: ISharedContents;
}

export interface ISharedFileDetails {
  resourceType: SharedResourceType;
  dataRoomName: string;
  file: ISharedFile;
  viewUrl: string;
}

export interface ISharedFileResponse {
  message: string;
  data: ISharedFileDetails;
}

export type ISharedEntryResponse =
  | ISharedContentsResponse
  | ISharedFileResponse;

export interface ISharedWithMeItem {
  shareId: string;
  resourceType: SharedResourceType;
  resourceId: string;
  name: string;
  dataRoomName: string;
  sharedAt: string;
}

export interface ISharedWithMeListResponse {
  message: string;
  data: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
    shares: ISharedWithMeItem[];
  };
}
