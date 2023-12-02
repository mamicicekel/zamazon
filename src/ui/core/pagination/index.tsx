import React from 'react';
import { View, colors } from '@/ui';

interface PageIndicatorProps {
  currentIndex: number;
  totalItems: number;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({ currentIndex, totalItems }) => {
  return (
    <View className='flex-row items-center justify-center mt-4'>
      {Array.from({ length: totalItems }).map((_, index) => (
        <View
          key={index}
          style={[
            { backgroundColor: index === currentIndex ? colors.primary[600] : 'gray' },
          ]}
          className='w-2 h-2 rounded-full mx-1'
        />
      ))}
    </View>
  );
};
