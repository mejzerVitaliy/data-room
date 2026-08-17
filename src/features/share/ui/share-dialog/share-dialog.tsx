'use client';

import { useEffect, useState } from 'react';

import { useGetSharingState } from 'entities/share/hooks/get';
import {
  useRevokePermissionedShare,
  useSetPermissionedGrantees,
} from 'entities/share/hooks/permissioned';
import {
  useEnablePublicShare,
  useRevokePublicShare,
} from 'entities/share/hooks/public';
import { Copy, X } from 'lucide-react';
import { toast } from 'sonner';

import { ShareableResource } from 'features/share/types';
import { getErrorMessage } from 'shared/lib/errors';
import { Button } from 'shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/dialog';
import { Input } from 'shared/ui/input';
import { Separator } from 'shared/ui/separator';
import { Skeleton } from 'shared/ui/skeleton';
import { Switch } from 'shared/ui/switch';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  resource: ShareableResource | null;
  onOpenChange: (open: boolean) => void;
};

export const ShareDialog = ({ resource, onOpenChange }: Props) => {
  const ref = resource
    ? { resourceType: resource.resourceType, resourceId: resource.resourceId }
    : { resourceType: 'FILE' as const, resourceId: '' };

  const { data, isPending } = useGetSharingState(ref, Boolean(resource));
  const enablePublic = useEnablePublicShare();
  const revokePublic = useRevokePublicShare();
  const setGrantees = useSetPermissionedGrantees();
  const revokePermissioned = useRevokePermissionedShare();

  const [granteeInput, setGranteeInput] = useState('');
  const [pendingEmails, setPendingEmails] = useState<string[]>([]);

  useEffect(() => {
    setPendingEmails(
      data?.data.permissionedShare?.grantees.map(grantee => grantee.email) ??
        [],
    );
    setGranteeInput('');
  }, [data, resource]);

  const publicShare = data?.data.publicShare ?? null;
  const shareUrl =
    publicShare && typeof window !== 'undefined'
      ? `${window.location.origin}/share/${publicShare.token}`
      : '';

  const onTogglePublic = (checked: boolean) => {
    if (checked) {
      enablePublic.mutate(ref, {
        onError: error => toast.error(getErrorMessage(error)),
      });
    } else {
      revokePublic.mutate(ref, {
        onError: error => toast.error(getErrorMessage(error)),
      });
    }
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => toast.success('Link copied to clipboard'),
      () => toast.error('Could not copy the link'),
    );
  };

  const addGrantee = () => {
    const email = granteeInput.trim().toLowerCase();

    if (!email) {
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.error('Enter a valid email address');

      return;
    }

    if (pendingEmails.includes(email)) {
      setGranteeInput('');

      return;
    }

    const nextEmails = [...pendingEmails, email];

    setPendingEmails(nextEmails);
    setGranteeInput('');
    setGrantees.mutate(
      { ...ref, granteeEmails: nextEmails },
      { onError: error => toast.error(getErrorMessage(error)) },
    );
  };

  const removeGrantee = (email: string) => {
    const nextEmails = pendingEmails.filter(
      existingEmail => existingEmail !== email,
    );

    setPendingEmails(nextEmails);

    if (nextEmails.length === 0) {
      revokePermissioned.mutate(ref, {
        onError: error => toast.error(getErrorMessage(error)),
      });

      return;
    }

    setGrantees.mutate(
      { ...ref, granteeEmails: nextEmails },
      { onError: error => toast.error(getErrorMessage(error)) },
    );
  };

  return (
    <Dialog open={Boolean(resource)} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">
            Share &ldquo;{resource?.name}&rdquo;
          </DialogTitle>
          <DialogDescription>
            The people you share with get read-only access.
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Public link</p>
                  <p className="text-xs text-muted-foreground">
                    Anyone with the link can view
                  </p>
                </div>
                <Switch
                  checked={Boolean(publicShare)}
                  onCheckedChange={onTogglePublic}
                  disabled={enablePublic.isPending || revokePublic.isPending}
                />
              </div>
              {publicShare && (
                <div className="flex gap-2">
                  <Input readOnly value={shareUrl} className="text-xs" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Copy link"
                    onClick={onCopyLink}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">Invite people</p>
              <div className="flex gap-2">
                <Input
                  placeholder="email@company.com"
                  value={granteeInput}
                  onChange={event => setGranteeInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addGrantee();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addGrantee}>
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {pendingEmails.map(email => (
                  <div
                    key={email}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-sm"
                  >
                    <span className="truncate">{email}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-6 shrink-0"
                      aria-label={`Remove ${email}`}
                      onClick={() => removeGrantee(email)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ))}
                {pendingEmails.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No one else has access yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
