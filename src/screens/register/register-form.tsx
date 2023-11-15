import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Image, Text, View } from '@/ui';

const schema = z.object({
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

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RegisterForm = ({ onSubmit = () => {} }: LoginFormProps) => {
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
        testID="email-input"
        control={control}
        name="email"
        label="Email"
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
