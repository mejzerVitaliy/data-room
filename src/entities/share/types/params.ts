import { ShareResourceType } from './responses';

export interface IResourceRef {
  resourceType: ShareResourceType;
  resourceId: string;
}
