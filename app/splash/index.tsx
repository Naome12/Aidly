import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect } from 'react'
import images from '@/constants/images'

import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(root)');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <ImageBackground source={images.profile} className='flex-1 justify-center items-center'>
      <Image source={images.aidly}/>
    </ImageBackground>
  )
}

export default SplashScreen