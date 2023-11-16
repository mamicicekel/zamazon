import React, {useState} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import { useNavigation } from '@react-navigation/native';
import type { RegisterFormProps } from './register-form';
import { RegisterForm } from './register-form';
import { showMessage } from 'react-native-flash-message';

import {supabase} from '../../api/supabase'

export const Register = () => {
  useSoftKeyboardEffect();
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const onSubmit: RegisterFormProps['onSubmit'] = async (formData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const { error } = await supabase
        .from('Users')
        .insert({ email:formData.email, password:formData.password })
        navigate('Login')
        showMessage({
          message: 'Account created successfully',
          type: 'success',
        });
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
      <RegisterForm onSubmit={onSubmit} />
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
