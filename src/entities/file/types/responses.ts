import { IBreadcrumb } from 'shared/types/breadcrumb';

export interface IFile {
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

export interface IFileResponse {
  message: string;
  data: {
    file: IFile;
  };
}

export interface IFileWithViewUrlResponse {
  message: string;
  data: {
    file: IFile;
    viewUrl: string;
  };
}

export interface IFilesResponse {
  message: string;
  data: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
    files: IFile[];
    breadcrumbs: IBreadcrumb[];
  };
}
