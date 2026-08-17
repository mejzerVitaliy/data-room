export type FolderSortBy = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface IGetFoldersParams {
  dataRoomId: string;
  parentId?: string;
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: FolderSortBy;
  sortOrder?: SortOrder;
}
