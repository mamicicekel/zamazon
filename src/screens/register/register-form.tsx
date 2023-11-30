import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Image, Text, View } from '@/ui';

const schema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    }),
    surname: z
    .string({
      required_error: 'Name is required',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RegisterForm = ({ onSubmit = () => {} }: RegisterFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Image 
        className="h-16 w-44 object-cover self-center mb-20"
        source={require('../../../assets/logo.png')}
      />
      <ControlledInput
        testID="name-input"
        control={control}
        name="name"
        label="Name"
        placeholder='Name'
      />
      <ControlledInput
        testID="surname-input"
        control={control}
        name="surname"
        label="Surname"
        placeholder='Surname'
      />
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        placeholder='example@zamazon.com'

      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="******"
        secureTextEntry={true}
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="******"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Sign Up"
        onPress={handleSubmit(onSubmit)}
        variant="secondary"
      />
    </View>
  );
};
