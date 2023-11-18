import { Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { Image } from '@/ui'

export const NCarousel = () => {
  const width = Dimensions.get('window').width;

  const carouselData = [
    require('../../../assets/home-carousel-1.jpeg'),
    require('../../../assets/home-carousel-2.jpeg'),
    require('../../../assets/home-carousel-3.jpeg'),
  ]
  return (
    <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={carouselData}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image source={item} className="w-auto h-full mx-4 rounded-md"/>
            )}
          />
  )
}