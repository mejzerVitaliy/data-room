import { z } from 'zod';

const MAX_NAME_LENGTH = 255;

export const folderNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(MAX_NAME_LENGTH, { message: 'Name is too long' }),
});

export type FolderNameInput = z.infer<typeof folderNameSchema>;
