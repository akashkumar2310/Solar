import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import { TouchableRipple, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({ navigation }) => {
  const zoomValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const zoomInAnimation = Animated.timing(zoomValue, {
      toValue: 1.2,
      duration: 1000,
      useNativeDriver: true,
    });

    const zoomOutAnimation = Animated.timing(zoomValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const zoomInOut = Animated.sequence([
      zoomInAnimation,
      zoomOutAnimation,
    ]);

    const loop = Animated.loop(zoomInOut);
    loop.start();

  }, [navigation, zoomValue]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        muted
      />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <StatusBar translucent backgroundColor={'green'} />
        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: 'white',
            }}>
            Solar Panel
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            source={require('../assets/icons/logo.png')}
            style={[
              { height: 180, width: 180, },
              {
                transform: [
                  {
                    scale: zoomValue,
                  },
                ],
              },
            ]}
          />
        </View>
        <TouchableRipple
          style={{
            backgroundColor: 'green',
            padding: 20,
            width: '90%',
            borderRadius: 10,
            marginBottom: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.replace('LoginScreen')}>
          <>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Let's Begin
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
          </>
        </TouchableRipple>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SplashScreen;
