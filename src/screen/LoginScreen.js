import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import Colors from '../constant/Colors';
import Video from 'react-native-video';


const LoginScreen = ({ navigation }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [checked, setChecked] = React.useState(false);


  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        muted
      />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <StatusBar translucent backgroundColor={'green'} />
          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/icons/logo.png')}
              style={styles.logo}
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Welcome Back...</Text>
              <Text style={styles.subtitleText}>Please Login into your</Text>
              <Text style={styles.subtitleText}>account</Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Your Email"
                placeholder="Your Email"
                style={styles.textInput}
                placeholderTextColor="white"
                left={<TextInput.Icon icon="account" size={20} color='green' />}
              />
              <TextInput
                label="Your Password"
                placeholder="Your Password"
                style={styles.textInput}
                placeholderTextColor="white"
                secureTextEntry={isPasswordSecure}
                left={<TextInput.Icon icon="lock" size={20} color='green' />}
                right={
                  <TextInput.Icon
                    icon={isPasswordSecure ? "eye" : "eye-off"}
                    size={20}
                    color='green'
                    onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                  />
                } />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    uncheckedColor='white'
                    color="#fff"
                    style={{ borderColor: '#fff', borderWidth: 1, borderRadius: 2 }}
                  />
                  <Text style={{ color: '#fff' }}>Remember me</Text>
                </View>
                <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}>Forgot  Password ?</Text>
              </View>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('BottomNavigation')}
                style={styles.button}
                labelStyle={styles.buttonLabel}>
                Login
              </Button>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <Text style={{ color: '#fff' }}>Don't have an account? </Text>
                <TouchableHighlight>
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", borderBottomWidth: 1, borderColor: "white" }} onPress={() => navigation.navigate("SignUp")}>Signup</Text>
                </TouchableHighlight>
              </View>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View >
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '85%',
    marginTop: 120,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    height: 150,
    width: 150,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: '15%'
  },
  textInput: {
    borderColor: Colors.white,
    borderWidth: 1,
    paddingLeft: 10,
    color: Colors.white,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.white,
    fontWeight: '600',
  },
});

export default LoginScreen;
