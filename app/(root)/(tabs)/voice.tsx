import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import VoiceScreen from '@/Components/voice/Speaking'

const Voice = () => {
  return (
    <ImageBackground source={images.speak} className='flex-1'>
      <VoiceScreen/>
    </ImageBackground>
  )
}

export default Voice