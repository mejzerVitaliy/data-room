'use client';

import { useEffect, useState } from 'react';

import { Search } from 'lucide-react';

import { useDebouncedValue } from 'shared/hooks/use-debounced-value';
import { Input } from 'shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui/select';

const SEARCH_DEBOUNCE_MS = 300;

export type SortValue = 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export type FileTypeValue =
  | 'all'
  | 'pdf'
  | 'image'
  | 'document'
  | 'spreadsheet'
  | 'other';

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
  fileType: FileTypeValue;
  onFileTypeChange: (fileType: FileTypeValue) => void;
  sort: SortValue;
  onSortChange: (sort: SortValue) => void;
};

const FILE_TYPE_OPTIONS: { value: FileTypeValue; label: string }[] = [
  { value: 'all', label: 'All types' },
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Images' },
  { value: 'document', label: 'Documents' },
  { value: 'spreadsheet', label: 'Spreadsheets' },
  { value: 'other', label: 'Other' },
];

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
];

export const BrowseToolbar = ({
  search,
  onSearchChange,
  fileType,
  onFileTypeChange,
  sort,
  onSortChange,
}: Props) => {
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebouncedValue(inputValue, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[180px] flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          placeholder="Search this folder"
          className="pl-8"
        />
      </div>

      <Select
        value={fileType}
        onValueChange={value => onFileTypeChange(value as FileTypeValue)}
      >
        <SelectTrigger className="w-40 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FILE_TYPE_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={value => onSortChange(value as SortValue)}
      >
        <SelectTrigger className="w-44 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
