export type ShareResourceType = 'DATA_ROOM' | 'FOLDER' | 'FILE';

export interface IGrantee {
  id: string;
  email: string;
  createdAt: string;
}

export interface IPublicShare {
  id: string;
  token: string;
  createdAt: string;
}

export interface IPermissionedShare {
  id: string;
  grantees: IGrantee[];
}

export interface ISharingStateResponse {
  message: string;
  data: {
    publicShare: IPublicShare | null;
    permissionedShare: IPermissionedShare | null;
  };
}

export interface IPublicShareResponse {
  message: string;
  data: {
    publicShare: IPublicShare;
  };
}

export interface IPermissionedShareResponse {
  message: string;
  data: {
    permissionedShare: IPermissionedShare;
  };
}
