import React from 'react';

import type { TxKeyPath } from '@/core';
import { View } from '@/ui';

type Props = {
  children: React.ReactNode;
};

export const ItemsContainer = ({ children }: Props) => {
  return (
        <View className=" border-neutral-200 dark:border-charcoal-700 dark:bg-charcoal-800">
          {children}
        </View>
  );
};
