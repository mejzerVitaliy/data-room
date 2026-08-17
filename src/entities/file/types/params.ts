export type FileSortBy = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
export type FileTypeFilter =
  | 'pdf'
  | 'image'
  | 'document'
  | 'spreadsheet'
  | 'other';

export interface IGetFilesParams {
  dataRoomId: string;
  folderId?: string;
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: FileSortBy;
  sortOrder?: SortOrder;
  fileType?: FileTypeFilter;
}
