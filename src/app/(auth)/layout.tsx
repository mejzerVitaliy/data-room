import { ReactNode } from 'react';

import { AuthGuard } from 'widgets/auth-guard/ui/auth-guard/auth-guard';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <AuthGuard mode="require-guest">
      <div className="relative flex items-center justify-center overflow-hidden bg-background px-4 min-h-full-screen">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 0%, oklch(var(--brand) / 0.18), transparent 60%)',
          }}
        />
        <div className="relative w-full max-w-sm">
          <div className="mb-8 text-center">
            <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground">
              Data Room
            </span>
          </div>
          {children}
        </div>
      </div>
    </AuthGuard>
  );
};

export default AuthLayout;
