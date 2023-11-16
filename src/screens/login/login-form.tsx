import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigation } from '@react-navigation/native';

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
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};


export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 justify-center px-4">
      <Image 
        className="h-16 w-44 object-cover self-center mb-20"
        source={require('../../../assets/logo.png')}
      />
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        placeholder='example@zamazon.com'
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
      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
        variant="secondary"
      />
      <Text className='self-end py-2 font-bold color-primary-500 text-sm' onPress={() => navigate('ForgotPassword')}>Forgot Password?</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View className='flex-1 h-px bg-neutral-400'/>
          <View>
            <Text className='w-auto text-center text-neutral-700 py-5'> New to Zamazon? </Text>
          </View>
        <View className='flex-1 h-px bg-neutral-400' />
      </View>
      <Button
        testID="register-button"
        label="Register"
        onPress={() => navigate('Register')}
        variant="outline"
      />
    </View>
  );
};
