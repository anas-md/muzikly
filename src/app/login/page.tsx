'use client';

import Login from '@/actions/authentication/login';
import Image from 'next/image';
import { Button } from '@/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import loginSchema from '@/schemas/login';
import userStore from '@/store/user.store';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { MdNightsStay, MdOutlineLightMode } from 'react-icons/md';
import { z } from 'zod';

export default function Page() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    setError('');
    setLoading(true);
    const res = await Login(values);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError('');
    window.location.href = '/';
  }

  return (
    <div className="flex h-screen w-full items-center justify-center dark:bg-black">
      <div
        onClick={() => userStore.toggleTheme()}
        className="fixed right-2 top-2 aspect-square h-full max-h-9 cursor-pointer select-none rounded-full bg-black/5 text-2xl hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/30"
      >
        <div className="flex h-full w-full items-center justify-center">
          <MdNightsStay className="hidden dark:block" />
          <MdOutlineLightMode className="block dark:hidden" />
        </div>
      </div>
      <div>
        <h1 className="text-center text-xl mx-10 font-bold dark:text-white">
          Welcome to Muzikly
        </h1>
        <Image
          src="/muzikly.svg"
          alt="Muzikly Logo"
          className="mx-auto justify-center"
          width={100}
          height={100}
          priority
        />
        <p className="text-center text-sm italic mx-10 dark:text-white">
          Your one-stop music center
        </p>
      </div>

      <div className="w-full space-y-5 rounded-xl p-5 dark:border-white/10 sm:max-w-[350px] sm:border">
        <h2 className="text-center text-xl font-bold dark:text-white">Login</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="!text-black dark:!text-white">
                      Email
                    </FormLabel>
                    <FormMessage className="grow dark:text-red-400" />
                  </div>
                  <FormControl>
                    <Input
                      className="dark:text-slate-200"
                      autoComplete="email"
                      placeholder="mail@example.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel className="!text-black dark:!text-white">
                      Password
                    </FormLabel>
                    <FormMessage className="grow dark:text-red-400" />
                  </div>
                  <FormControl>
                    <Input
                      className="dark:text-slate-200"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Forgot Password?
                  </Link>
                </FormItem>
              )}
            />
            {error && (
              <div className="flex items-center gap-3 rounded-md bg-red-100 px-3 py-3 text-sm font-medium text-red-400 dark:bg-red-300/10">
                <IoAlertCircleOutline className="text-base" /> {error}
              </div>
            )}
            <Button
              disabled={loading}
              loading={loading}
              type="submit"
              className="w-full gap-2"
            >
              Login
            </Button>
          </form>
        </Form>
        <Link
          href="/signup"
          className="mx-auto block w-fit text-sm font-medium text-blue-500 hover:underline dark:text-blue-400"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  );
}
