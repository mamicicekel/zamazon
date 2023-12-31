import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

import {supabase} from '../../api/supabase'

export const Login = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const [loading, setLoading] = useState(false);

  const onSubmit: LoginFormProps['onSubmit'] = async (formData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        signIn({ access: 'access-token', refresh: 'refresh-token' });
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator/>
        </View>
      )}
    </>
  );
};
