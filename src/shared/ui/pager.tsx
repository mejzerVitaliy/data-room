import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from 'shared/ui/button';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pager = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="mr-1 size-4" />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight className="ml-1 size-4" />
      </Button>
    </div>
  );
};
