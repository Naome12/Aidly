/**
 * Codia React Native App
 * https://codia.ai
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView className='flex-1 items-center'>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior='automatic'
      >
        <View
          style={{
            width: 393,
            height: 852,
            backgroundColor: '#0d0d0d',
            // borderTopLeftRadius: 40,
            // borderTopRightRadius: 40,
            // borderBottomRightRadius: 40,
            // borderBottomLeftRadius: 40,
            // position: 'relative',
            overflow: 'hidden',
            // marginTop: 0,
            // marginRight: 'auto',
            // marginBottom: 0,
            // marginLeft: 'auto',
          }}
        >
          <View
            style={{
              width: 518.182,
              height: 250,
              position: 'relative',
              zIndex: 27,
              marginTop: -260,
              marginRight: 0,
              // marginBottom: 0,
              // marginLeft: ,
            }}
          >
            <ImageBackground
              style={{
                width: 250,
                height: 250,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 27,
              }}
              source={require('./../../../assets/images/3fe7edfa-1042-42fe-b3cb-96da8a743d54.png')}
              resizeMode='cover'
            />
            <Text
              style={{
                display: 'flex',
                width: 30,
                height: '8%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                fontFamily: 'Poppins',
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 20,
                color: 'rgba(128, 128, 128, 0.55)',
                position: 'absolute',
                top: '29.2%',
                left: 125,
                textAlign: 'center',
                zIndex: 25,
              }}
              numberOfLines={1}
            >
              9:41
            </Text>
            <ImageBackground
              style={{
                width: 66.662,
                height: 11.336,
                position: 'absolute',
                top: 77.331,
                right: 35.52,
                zIndex: 23,
              }}
              source={require('./../../../assets/images/b0eeac77-4e24-4e9e-b12c-3fd295dff165.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 30,
                height: 35,
                position: 'absolute',
                top: 207.969,
                left: 488.182,
                overflow: 'hidden',
                zIndex: 20,
              }}
              source={require('./../../../assets/images/3e4d2654-f499-48a7-9032-380a89758865.png')}
              resizeMode='cover'
            />
            <Text
              style={{
                display: 'flex',
                height: 18,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontFamily: 'Poppins',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: '#090a08',
                position: 'absolute',
                top: 213.969,
                left: 150.182,
                textAlign: 'left',
                zIndex: 19,
              }}
              numberOfLines={1}
            >
              8:30
            </Text>
            <ImageBackground
              style={{
                width: 27,
                height: 20,
                position: 'absolute',
                top: 215.302,
                left: 440.182,
                overflow: 'hidden',
                zIndex: 17,
              }}
              source={require('./../../../assets/images/0d0c817a-a358-462e-b281-517b9ab4471f.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 17,
                height: 16,
                position: 'absolute',
                top: 217.302,
                left: 469.182,
                overflow: 'hidden',
                zIndex: 18,
              }}
              source={require('./../../../assets/images/88b9098b-4f7c-48e3-b752-a1a65669382a.png')}
              resizeMode='cover'
            />
          </View>
          <ImageBackground
            style={{
              width: 20,
              position: 'relative',
              zIndex: 1,
              marginTop: 49.105,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 42.063,
            }}
            source={require('./../../../assets/images/4c5b8437-6ba7-4e09-808b-6ed67a871857.png')}
            resizeMode='cover'
          />
          <Text
            style={{
              height: 38,
              fontFamily: 'Poppins',
              fontSize: 25,
              fontWeight: '600',
              lineHeight: 37.5,
              color: '#fe1b1b',
              position: 'relative',
              textAlign: 'left',
              zIndex: 8,
              // marginTop: 65.895,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 77,
            }}
            numberOfLines={1}
          >
            Symptom Analysis
          </Text>
          <Text
            style={{
              display: 'flex',
              width: 298,
              height: 46,
              justifyContent: 'center',
              alignItems: 'flex-start',
              fontFamily: 'Poppins',
              fontSize: 15,
              fontWeight: '400',
              lineHeight: 22.5,
              color: '#aea1e9',
              position: 'relative',
              textAlign: 'center',
              zIndex: 7,
              marginTop: 11,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 38,
            }}
          >
            Please point the camera at the Symptom Area
          </Text>
          <View
            style={{
              width: 452,
              height: 534.65,
              position: 'relative',
              zIndex: 34,
              marginTop: 33,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 20,
            }}
          >
            <ImageBackground
              style={{
                width: 64,
                height: 63,
                position: 'absolute',
                top: -5,
                left: 3,
                zIndex: 3,
              }}
              source={require('./../../../assets/images/4904a82e-9ea2-460b-babd-d443eebfdd42.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 63.5,
                height: 62.5,
                position: 'absolute',
                top: -4.5,
                left: 264,
                zIndex: 5,
              }}
              source={require('./../../../assets/images/823325ef-c81c-4546-b28c-a675955b9fbb.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 263,
                height: 241,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
                position: 'absolute',
                top: 29,
                left: 31,
                zIndex: 29,
              }}
              source={require('./../../../assets/images/b496bdca90c19bd0685896b4d929992061e8ac2c.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 250,
                height: 250,
                position: 'absolute',
                top: 229,
                left: 202,
                zIndex: 28,
              }}
              source={require('./../../../assets/images/d1292037-a235-4eb1-bc57-9303fe881f9c.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 63.5,
                height: 62.5,
                position: 'absolute',
                top: 241,
                left: 3.5,
                zIndex: 6,
              }}
              source={require('./../../../assets/images/124a7074-0457-4b98-a50b-798de62637b6.png')}
              resizeMode='cover'
            />
            <ImageBackground
              style={{
                width: 63.5,
                height: 62.5,
                position: 'absolute',
                top: 241,
                left: 264,
                zIndex: 4,
              }}
              source={require('./../../../assets/images/a992c162-95d1-4913-92c3-f0f13b88b006.png')}
              resizeMode='cover'
            />
            <View
              style={{
                display: 'flex',
                width: 262,
                height: 100,
                flexDirection: 'row',
                gap: 26,
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'nowrap',
                position: 'absolute',
                top: 327,
                left: '50%',
                zIndex: 9,
                transform: [{ translateY: 0 }, { translateX: -191 }],
              }}
            >
              <View
                style={{
                  display: 'flex',
                  width: 55,
                  height: 55,
                  paddingTop: 17,
                  paddingRight: 17,
                  paddingBottom: 17,
                  paddingLeft: 17,
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  flexWrap: 'nowrap',
                  backgroundColor: '#e2e5fc',
                  borderTopLeftRadius: 27.5,
                  borderTopRightRadius: 27.5,
                  borderBottomRightRadius: 27.5,
                  borderBottomLeftRadius: 27.5,
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                <ImageBackground
                  style={{
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 11,
                  }}
                  source={require('./../../../assets/images/gallery.png')}
                  resizeMode='cover'
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  width: 100,
                  height: 100,
                  paddingTop: 33,
                  paddingRight: 31,
                  paddingBottom: 33,
                  paddingLeft: 31,
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  flexWrap: 'nowrap',
                  backgroundColor: '#fe1b1b',
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                  position: 'relative',
                  zIndex: 12,
                }}
              >
                <ImageBackground
                  style={{
                    width: 35.5,
                    height: 31.75,
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 13,
                  }}
                  source={require('./../../../assets/images/camera.png')}
                  resizeMode='cover'
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  width: 55,
                  height: 55,
                  paddingTop: 17,
                  paddingRight: 16,
                  paddingBottom: 17,
                  paddingLeft: 16,
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  flexWrap: 'nowrap',
                  backgroundColor: '#e2e5fc',
                  borderTopLeftRadius: 27.5,
                  borderTopRightRadius: 27.5,
                  borderBottomRightRadius: 27.5,
                  borderBottomLeftRadius: 27.5,
                  position: 'relative',
                  zIndex: 14,
                }}
              >
                <ImageBackground
                  style={{
                    width: 22,
                    height: 20,
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 15,
                  }}
                  source={require('./../../../assets/images/folder.png')}
                  resizeMode='cover'
                />
              </View>
            </View>
            <ImageBackground
              style={{
                width: 96.015,
                height: 87.628,
                position: 'absolute',
                top: 442,
                left: 75.802,
                zIndex: 34,
              }}
              source={require('./../../../assets/images/8457c5b6-8a61-4f53-82f5-792d24af1f5d.png')}
              resizeMode='cover'
            >
              <ImageBackground
                style={{
                  width: 40.427,
                  height: 36.896,
                  position: 'relative',
                  zIndex: 36,
                  marginTop: 22.138,
                  marginRight: 0,
                  marginBottom: 0,
                  marginLeft: 27.793,
                }}
                source={require('./../../../assets/images/66842300-50d2-4fa3-b534-82a20adde03d.png')}
              />
            </ImageBackground>
            <View
              style={{
                width: 331,
                height: 90.19,
                backgroundColor: '#0d0d0d',
                borderTopLeftRadius: 90,
                borderTopRightRadius: 90,
                borderBottomRightRadius: 90,
                borderBottomLeftRadius: 90,
                position: 'absolute',
                top: 444.459,
                left: 0,
                zIndex: 32,
              }}
            >
              <ImageBackground
                style={{
                  width: '28.66%',
                  height: '95.59%',
                  position: 'absolute',
                  top: '-0.51%',
                  left: '45.92%',
                  zIndex: 38,
                }}
                source={require('./../../../assets/images/d437be7b-f91f-479a-9c43-4603bc6be2ba.png')}
              />
              <ImageBackground
                style={{
                  width: '26.17%',
                  height: '86.54%',
                  position: 'absolute',
                  top: '3.38%',
                  left: '47.27%',
                  zIndex: 40,
                }}
                source={require('../../../assets/images/73e34c22-9fbb-4ade-84af-74ffd512fadc.png')}
              />
              <ImageBackground
                style={{
                  width: '20.07%',
                  height: '70.93%',
                  position: 'absolute',
                  top: '13.46%',
                  left: '50.21%',
                  zIndex: 39,
                }}
                source={require('../../../assets/images/565b4618-5cd4-4144-a87b-59b12b98d70b.png')}
              />
              <ImageBackground
                style={{
                  width: '12.21%',
                  height: '42.02%',
                  position: 'absolute',
                  top: '26.1%',
                  left: '54.38%',
                  zIndex: 41,
                }}
                source={require('../../../assets/images/bafe9fbf-db6d-4290-a0c2-024bb4c157a6.png')}
              />
              <ImageBackground
                style={{
                  width: '10.22%',
                  height: '41.03%',
                  position: 'absolute',
                  top: '29.09%',
                  left: '74.81%',
                  zIndex: 37,
                }}
                source={require('../../../assets/images/240a1ed5-da44-4096-b669-c7a70dcacb6f.png')}
              />
              <ImageBackground
                style={{
                  width: '8.7%',
                  height: '41.96%',
                  position: 'absolute',
                  top: '30%',
                  left: '11.7%',
                  zIndex: 35,
                }}
                source={require('../../../assets/images/de841c93-7a06-464d-8ff4-b746612afbf3.png')}
              />
            </View>
          </View>
          <ImageBackground
            style={{
              width: 105,
              position: 'relative',
              zIndex: 2,
              marginTop: 78.657,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 163,
            }}
            source={require('../../../assets/images/8457c5b6-8a61-4f53-82f5-792d24af1f5d.png')}
            resizeMode='cover'
          />
          <ImageBackground
            style={{
              width: 417,
              height: 417,
              position: 'absolute',
              top: -211.197,
              left: 216.322,
            }}
            source={require('../../../assets/images/8457c5b6-8a61-4f53-82f5-792d24af1f5d.png')}
            resizeMode='cover'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}