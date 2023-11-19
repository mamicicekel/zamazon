import React from 'react';
import { Image, View, Text } from '@/ui';

interface CategoryItemProps {
  category: string;
  image: any;
}

export const Container: React.FC<CategoryItemProps> = ({ category, image }) => {
  return (
    <View className=' border-[1px] border-primary-600 rounded-xl w-[125] p-2 h-36'>
      <Text className='self-center m-2'>{category}</Text>
        <Image
          className='h-16 w-24 rounded-xl self-center'
          source={image}
        />
    </View>
  );
};
