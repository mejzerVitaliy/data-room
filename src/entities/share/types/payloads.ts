import { IResourceRef } from './params';

export interface ISetPermissionedGranteesPayload extends IResourceRef {
  granteeEmails: string[];
}
