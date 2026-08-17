import Link from 'next/link';

import { RegisterForm } from 'features/auth/ui/register-form/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'shared/ui/card';

const RegisterPage = () => (
  <Card>
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-xl">Create your account</CardTitle>
      <CardDescription>Set up a secure Data Room in seconds</CardDescription>
    </CardHeader>
    <CardContent>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </CardContent>
  </Card>
);

export default RegisterPage;
