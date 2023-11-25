import { Dimensions } from 'react-native';
import React, {useState, useRef} from 'react';
import { SafeAreaView, Text, Image, View, Button, PageIndicator } from '@/ui';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRoute } from '@react-navigation/native';
import TapRating from 'react-native-ratings/dist/TapRating';

interface ProductParams {
  id: number;
  title: string;
  description: string
  price: number;
  discountPercentage: number
  rating: number;
  stock:number
  brand: string
  category: string
  thumbnail: string;
  images: string[];
}

export const Product = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const route = useRoute();
  const { title, price, rating, images, description, discountPercentage, stock, brand, category } = route.params as ProductParams;
  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);


  return (
    <SafeAreaView className='flex-1'>
        <Carousel
          width={width}
          height={height / 3}
          pagingEnabled={true}
          autoPlay={false}
          data={images.map(image => ({ uri: image }))}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={item} className="w-auto h-full" />
          )}
          ref={carouselRef}
          onProgressChange={() => {
            const index = carouselRef.current?.getCurrentIndex() ?? 0;
            setCurrentIndex(index);
          }}
        />
        <PageIndicator currentIndex={currentIndex} totalItems={images.length} />
        <Text className='text-sm px-4 pt-4 text-charcoal-700'>{brand}</Text>
        <Text className='text-2xl p-4 pt-2 font-bold '>{title}</Text>
        <View className='px-4'>
          <TapRating
            isDisabled={true}
            defaultRating={rating}
            size={18}
            starContainerStyle={{ marginBottom: 15, alignSelf: 'flex-start' }}
            showRating={false}
          />
        </View>
        <Text className='flex-1 px-4'>{description}</Text>
        <View className='flex-row items-center mx-4 mb-4'>
          <Text className='flex-1 text-3xl font-semibold'>${price}</Text>
          <Button label='Add to Cart' variant='secondary'/>
        </View>
    </SafeAreaView>
  );
};
