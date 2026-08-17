import Link from 'next/link';

import { LoginForm } from 'features/auth/ui/login-form/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'shared/ui/card';

const LoginPage = () => (
  <Card>
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-xl">Welcome back</CardTitle>
      <CardDescription>Sign in to access your data rooms</CardDescription>
    </CardHeader>
    <CardContent>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </CardContent>
  </Card>
);

export default LoginPage;
