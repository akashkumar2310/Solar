import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TouchableHighlight,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Appbar, Button, TextInput, IconButton } from 'react-native-paper';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome'
import String from '../constant/String';
import { ActivityIndicator } from 'react-native';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [panaadhar, setPanaadhar] = useState('');
  const [associateOffice, setAssociateOffice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error:', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);

        try {
          const base64Image = await convertToBase64(imageUri);
          // Do something with base64Image if needed
        } catch (error) {
          console.error('Error converting to base64:', error);
        }
      }
    });
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      if (!isValidName(name)) {
        Alert.alert('Error', 'Please enter a valid name');
        return;
      }

      if (!isValidMobile(mobile)) {
        setIsLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        setIsLoading(false);
        return;
      }


      let base64Image = '';
      if (selectedImage) {
        base64Image = await convertToBase64(selectedImage);
      }

      const requestData = {
        Sp_Name: name,
        Sp_MobileNo: mobile,
        Sp_Email: email,
        Sp_Address: address,
        Sp_Document: panaadhar,
        Sp_AssociateOffice: associateOffice,
        Sp_UploadSelfie: base64Image,
      };

      const url = String.url + 'api/API/SalesPromotorRegister';
      console.log(url);

      const response = await axios.post(url, requestData);

      resetField();
      if (response && response.data && response.data.API_STATUS === 'OK') {
        Alert.alert(response.data.MSG);
      } else {
        Alert.alert('Error:', response?.data?.MSG || 'Unknown error');
      }
    } catch (error) {
      console.error('Error in handleSignUp:', error);
    }
    finally {
      setIsLoading(false);
    }
  };


  const isValidName = (name) => {
    return name.trim().length > 0;
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    const isValid = mobileRegex.test(mobile);

    if (!isValid) {
      Alert.alert('Error', 'Please enter a 10-digit mobile number');
    }

    return isValid;
  };

  // Helper function to validate email address
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const convertToBase64 = async (path) => {
    try {
      const base64 = await RNFS.readFile(path, 'base64');
      return base64;
    } catch (error) {
      throw new Error(`Error converting to base64: ${error.message}`);
    }
  };

  const resetField = () => {
    setName('');
    setMobile('');
    setEmail('');
    setAddress('');
    setPanaadhar('');
    setAssociateOffice('');
    setSelectedImage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: Platform.OS === 'ios' ? '#FCFAFA' : 'green',
        }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="SignUp" color="white" />
      </Appbar.Header>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              left={<TextInput.Icon icon={() => <Icon name="user" size={20} color="green" />} />}
            />

            <TextInput
              mode="outlined"
              label="Mobile/WhatsApp Number"
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              keyboardType="phone-pad"
              maxLength={10}
              left={<TextInput.Icon icon={() => <Icon name="mobile" size={24} color="green" />} />}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              left={<TextInput.Icon icon={() => <Icon name="at" size={20} color="green" />} />}
            />
            <TextInput
              mode="outlined"
              label="Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
              left={<TextInput.Icon icon={() => <Icon name="address-card" size={20} color="green" />} />}
            />
            <TextInput
              mode="outlined"
              label="Pan/Adhaar"
              value={panaadhar}
              onChangeText={(text) => setPanaadhar(text)}
              left={<TextInput.Icon icon={() => <Icon name="file" size={20} color="green" />} />}
            />
            <TextInput
              mode="outlined"
              label="Associate Office"
              value={associateOffice}
              onChangeText={(text) => setAssociateOffice(text)}
              left={<TextInput.Icon icon={() => <Icon name="address-card" size={20} color="green" />} />}
            />
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginHorizontal: 60 }}>
              <View style={{ marginTop: 0, }}>
                <IconButton
                  icon="camera"
                  color="white"
                  size={40}
                  onPress={handleCameraLaunch}
                />
                <Text>Upload Selfie</Text>
              </View>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ flex: 1, marginLeft: 50 }}
                  resizeMode="contain"
                />
              )}
            </View>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="green"
                style={{ marginTop: 20 }}
              />
            ) : (
              <Button
                mode="contained"
                onPress={handleSignUp}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Sign Up
              </Button>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff' }}>already have an account ?  </Text>
              <TouchableHighlight>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", borderBottomWidth: 1, borderColor: "white" }} onPress={() => navigation.navigate("LoginScreen")}> Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    width: '90%',
    marginTop: '5%',
    alignSelf: 'center',
    gap: 10,
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
    color: 'white',
  },
  welcomeText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});

export default SignUp;
