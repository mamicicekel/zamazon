import { Dimensions } from 'react-native'
import React, {useState, useRef} from 'react'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Image, PageIndicator, View } from '@/ui'

export const NCarousel = () => {
  const width = Dimensions.get('window').width;

  const carouselData = [
    require('../../../assets/home-carousel-1.jpeg'),
    require('../../../assets/home-carousel-2.jpeg'),
    require('../../../assets/home-carousel-3.jpeg'),
  ]
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  return (
    <View>
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
            ref={carouselRef}
          onProgressChange={() => {
            const index = carouselRef.current?.getCurrentIndex() ?? 0;
            setCurrentIndex(index);
          }}
          />
           <PageIndicator currentIndex={currentIndex} totalItems={carouselData.length}/>
    </View>
  )
}