import React, { useState } from 'react';
import { View, StyleSheet, Image, SafeAreaView, Text, TouchableHighlight, ScrollView } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Appbar, Button, TextInput, IconButton, Card } from 'react-native-paper';

const NewLead = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: Platform.OS === 'ios' ? '#FCFAFA' : 'green',
        }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} color='white' />
        <Appbar.Content title="New Lead" color='white' />
      </Appbar.Header>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Create Acount</Text>
          <View style={styles.formContainer}>
            <TextInput
              label="Name"
              placeholder="Name"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <TextInput
              label="Mobile/Whatsapp Number"
              placeholder="Mobile/Whatsapp Number"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <TextInput
              label="Pan/Aadhar Number"
              placeholder="Your Email"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <TextInput
              label="Address"
              placeholder="Address"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <TextInput
              label="Associate Office"
              placeholder="Associate Office"
              mode='outlined'
              left={<TextInput.Icon icon="account" size={20} color='green' />}
            />
            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ flex: 1 }}
                  resizeMode="contain"
                />
              )}
              <View style={{ marginTop: 0, justifyContent: 'center' }}>
                <IconButton
                  icon="folder-image"
                  color="white"
                  size={40}
                  onPress={openImagePicker}
                />
                <Text>Upload ID</Text>
              </View>
              <View style={{ marginTop: 0, justifyContent: 'center' }}>
                <IconButton
                  icon="camera"
                  color="white"
                  size={40}
                  onPress={handleCameraLaunch}
                />
                <Text>Upload Selfie</Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('BottomNavigation')}
              style={styles.button}
              labelStyle={styles.buttonLabel}>
              Sign Up
            </Button>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, paddingHorizontal: 20, }}>
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
    gap: 10
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
    borderColor: "black",

  },
});

export default NewLead;
