import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppView } from '../components/AppView';
import { AppText } from '../components/AppText';
import { Colors } from '../constants/Colors';
import { useUser } from '../hooks/UserContext';
import { UserTypes } from '../constants/UserTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.accent]}
        style={styles.header}
      >
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
        />
        <AppText type="title" style={styles.title}>EduSmart</AppText>
        <AppText style={styles.welcomeText}>Welcome, {user?.user.firstName}</AppText>
      </LinearGradient>

      <AppView style={styles.container}>
        <View style={styles.content}>
          <LoadHomeScreen />
        </View>
      </AppView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color={Colors.light.text} />
        <AppText style={styles.logoutText}>Logout</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const LoadHomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const renderButton = (icon, text, onPress, color) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color="white" />
      <AppText style={styles.cardText}>{text}</AppText>
    </TouchableOpacity>
  );

  const renderButtonRow = (buttons) => (
    <View style={styles.buttonRow}>
      {buttons.map((button, index) => (
        <React.Fragment key={index}>
          {renderButton(button.icon, button.text, button.onPress, button.color)}
        </React.Fragment>
      ))}
    </View>
  );

      if (!user) {
        navigation.navigate('Login');
      } else {
        var typeUser = user?.user;
    
        switch (user?.userType) {
          case UserTypes.student:
            return (
              <>
                {renderButtonRow([
                  {
                    icon: 'qr-code-outline',
                    text: 'Mark Attendance',
                    onPress: () => navigation.navigate('StudentAttend', { studentId: typeUser.studentId }),
                    color: Colors.light.primary
                  },
                  {
                    icon: 'location-outline',
                    text: 'Nearby Classes',
                    onPress: () => navigation.navigate('NearbyClasses'),
                    color: Colors.light.success
                  }
                ])}
                {renderButtonRow([
                 
                  {
                    icon: 'book-outline',
                    text: 'Assignments',
                    onPress: () => navigation.navigate('Assignments'),
                    color: Colors.light.info
                  }
                ])}
              </>
            );

            case UserTypes.parent:
              return (
                <>
                  {renderButtonRow([
                    {
                      icon: 'notifications-outline',
                      text: 'Parent Notifications',
                      onPress: () => navigation.navigate('ParentNotification', { studentId: typeUser.studentId }),
                      color: Colors.light.primary
                    },
                    {
                      icon: 'location-outline',
                      text: 'Nearby Classes',
                      onPress: () => navigation.navigate('NearbyClasses'),
                      color: Colors.light.success
                    }
                  ])}
                </>
              );

          case UserTypes.teacher:
          return (
            <View></View>
          );

          case UserTypes.InstituteManager:
        return (
          <>
            {renderButtonRow([
              {
                icon: 'checkmark-circle-outline',
                text: 'Mark Attendance',
                onPress: () => navigation.navigate('MarkAttendance'),
                color: Colors.light.primary
              },
              {
                icon: 'document-text-outline',
                text: 'Attendance Report',
                onPress: () => navigation.navigate('AttendanceReport'),
                color: Colors.light.info
              }
            ])}
            {renderButtonRow([
              {
                icon: 'add-circle-outline',
                text: 'Add Classes',
                onPress: () => navigation.navigate('AddClass'),
                color: Colors.light.success
              },
              {
                icon: 'location-outline',
                text: 'Nearby Classes',
                onPress: () => navigation.navigate('NearbyClasses'),
                color: Colors.light.success
              }
            ])}
          </>
        );

    
        default:
          return null;
        }
      }
};


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    padding: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
});
