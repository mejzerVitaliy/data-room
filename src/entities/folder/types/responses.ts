import { IBreadcrumb } from 'shared/types/breadcrumb';

export interface IFolder {
  id: string;
  dataRoomId: string;
  parentId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFolderResponse {
  message: string;
  data: {
    folder: IFolder;
    breadcrumbs: IBreadcrumb[];
  };
}

export interface IFoldersResponse {
  message: string;
  data: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
    folders: IFolder[];
    breadcrumbs: IBreadcrumb[];
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
