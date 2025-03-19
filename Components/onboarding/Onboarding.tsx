import { View, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import slides from '@/assets/slide';
import OnboardingItem from './OnboardingItem';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Function to handle next slide
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      console.log("Onboarding Finished"); // Handle onboarding completion (e.g., navigate to home screen)
    }
  };

  return (
    <View className="flex-1 justify-between">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => (
          <OnboardingItem
            item={item}
            index={index}
            totalSlides={slides.length}
            onNext={handleNext}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(slideIndex);
        }}
      />
    </View>
  );
};

export default Onboarding;
