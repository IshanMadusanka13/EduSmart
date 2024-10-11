import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaunchScreen from './LaunchScreen';
import LoginScreen from './UserManagement/Login';
import StudentRegister from './UserManagement/StudentRegister';
import { UserProvider } from '../hooks/UserContext';
import NearbyClassView from './ClassManagement/NearbyClassView';
import AddClass from './ClassManagement/AddClass';
import HomeScreen from './homeScreen';
import AttendenceMark from './AttendenceManagement/attendenceMark';
import StudentAttend from './StudentManagement/studentAttend';
import ParentNotification from './ParentManagement/parentNotification';
import AttendanceReport from './AttendenceManagement/attendanceReport';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import { AppText } from '../components/AppText';
import { View, StyleSheet, Dimensions } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors.light.accent,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 60,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={styles.headerRight}>
            
            <Ionicons name="person-circle-outline" size={30} color='white' style={styles.icon} />
          </View>
        ),
      })}
    
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'HOME' }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Stack.Navigator
        initialRouteName='Launch'
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: Colors.light.accent,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Ionicons name="school-outline" size={24} color='white' />
              <AppText style={styles.headerText}>{route.name}</AppText>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
             
              
              <Ionicons name="person-circle-outline" size={30} color='white' style={styles.icon} />
            </View>
          ),
          
        })}
      >
        <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ headerShown: false  }} />
        <Stack.Screen name="NearbyClasses" component={NearbyClassView} options={{ title: 'Nearby Classes' }} />
        <Stack.Screen name="AddClass" component={AddClass} options={{ title: 'Add Class' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MarkAttendance" component={AttendenceMark} options={{ title: 'Mark Attendance' }} />
        <Stack.Screen name="StudentAttend" component={StudentAttend} options={{ title: 'Scan Attendance' }} />
        <Stack.Screen name="ParentNotification" component={ParentNotification} options={{ title: 'Parent Notifications' }} />
        <Stack.Screen name="AttendanceReport" component={AttendanceReport} options={{ title: 'Attendance Report' }} />
        </Stack.Navigator>
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  icon: {
    marginHorizontal: 8,
    
  },
});