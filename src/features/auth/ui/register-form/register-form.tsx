'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from 'entities/auth/hooks/register';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  RegisterInput,
  registerSchema,
} from 'features/auth/schemas/validation';
import { getErrorMessage } from 'shared/lib/errors';
import { Button } from 'shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'shared/ui/form';
import { Input } from 'shared/ui/input';

export const RegisterForm = () => {
  const router = useRouter();
  const registerUser = useRegister();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (values: RegisterInput) => {
    registerUser.mutate(values, {
      onSuccess: () => router.push('/data-rooms'),
      onError: error => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={registerUser.isPending}
        >
          {registerUser.isPending ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </Form>
  );
};
