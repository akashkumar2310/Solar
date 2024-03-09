// Dashboard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constant/Colors';
import { Appbar, Card } from 'react-native-paper';

// Reusable Card Component
const Cards = ({ iconName, text, onPress }) => (
  <Pressable style={styles.cardContainer} onPress={onPress}>
    <Card style={[styles.card, { backgroundColor: Colors.blue }]}>
      <View style={styles.cardContent}>
        <Image source={iconName} style={{ height: 70, width: 70 }} />
        <Text style={[styles.cardText, { textAlign: 'center', }]}>{text}</Text>
      </View>
    </Card>
  </Pressable>
);

const Dashboard = ({ navigation }) => {
  const navigateToScreen = () => {
    navigation.navigate('');
  };

  const backAction = () => {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to logout from this device?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Logout', onPress: () => logoutAction() },
      ],
    );
    return true;
  };

  const logoutAction = async () => {
    await AsyncStorage.removeItem('@id');
    await AsyncStorage.removeItem('@loginType');
    navigation.replace('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: Platform.OS === 'ios' ? '#FCFAFA' : 'green',
        }}
      >
        {/* <Appbar.BackAction onPress={() => navigation.goBack()} color='white' /> */}
        <Appbar.Content title="Dasboard" color='white' />
        <Appbar.Action
          icon="logout"
          onPress={backAction}
          color={Platform.OS === 'ios' ? 'green' : '#FFF'}
        />
      </Appbar.Header>
      <StatusBar translucent backgroundColor="green" />
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View>
            <Image source={require('../assets/icons/logo.png')} style={styles.logoImage} />
          </View>
          <View style={styles.userInfo}>
            <Image source={require('../assets/icons/acc.png')} style={styles.userIcon} />
            <Text style={styles.username}>Admin</Text>
            <Icon name="angle-down" style={styles.dropdownIcon} />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Cards iconName={require('../assets/icons/home.png')} text="New Lead" onPress={() => navigation.navigate('NewLead')} />
          <Cards iconName={require('../assets/icons/home.png')} text="Last Modification" onPress={() => navigateToScreen('LastModification')} />
          <Cards iconName={require('../assets/icons/home.png')} text="View Status" onPress={() => navigateToScreen('ViewLeadStatus')} />
          <Cards iconName={require('../assets/icons/home.png')} text="Lead Modification" onPress={() => navigateToScreen('LeadModification')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 25,
    height: 70,
  },
  logoImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  userIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  dropdownIcon: {
    color: '#fff',
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '43%',
    marginBottom: 25,
  },
  card: {
    borderRadius: 10,
    alignItems: 'center',
    height: 140,
    justifyContent: 'center',
    width: '100%',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  addButton: {
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
