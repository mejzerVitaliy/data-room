import { ShareResourceType } from 'entities/share/types/responses';

export type ShareableResource = {
  resourceType: ShareResourceType;
  resourceId: string;
  name: string;
};
