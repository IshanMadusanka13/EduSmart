import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaunchScreen from './LaunchScreen';
import LoginScreen from './UserManagement/Login';
import StudentRegister from './UserManagement/StudentRegister';

import AddClass from './SubjectManagement/AddClass';
import ViewClasses from './SubjectManagement/ViewClasses';
import SearchLessons from './SubjectManagement/SearchLessons';
import UpdateClass from './SubjectManagement/UpdateClass';
import ClassDetails from './SubjectManagement/ClassDetails';
import Menu from './SubjectManagement/Menu';
import Dashboard from './SubjectManagement/Dashboard';
import TeaLogin from './SubjectManagement/TeaLogin';
import ViewStudents from './SubjectManagement/ViewStudents';

import UserFeedback from './UserFeedback/UserFeedback';
import ManagerRegister from './Manager/ManagerRegister';
import ManagerDashboard from './Manager/ManageDashboard';
import StudentManagement from './Manager/StudentsManagement';
import TeachersManagement from './Manager/TeachersManagement';
import { UserProvider } from '../hooks/UserContext';
import NearbyClassView from './ClassManagement/NearbyClassView';
// import AddClass from './ClassManagement/AddClass';
import HomeScreen from './homeScreen';
import AttendenceMark from './AttendenceManagement/attendenceMark';
import StudentAttend from './StudentManagement/studentAttend';
import ParentNotification from './ParentManagement/parentNotification';
import AttendanceReport from './AttendenceManagement/attendanceReport';
import AddStudents from './Manager/AddStudents';
import AddTeachers from './Manager/AddTeachers';

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

      {/*Subject Management*/}
        {/* <Stack.Screen name="AddClass" component={AddClass} options={{ headerShown: false }} /> */}
      <Stack.Screen name="ViewClasses" component={ViewClasses} options={{ headerShown: false }} />
      <Stack.Screen name="SearchLessons" component={SearchLessons} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateClass" component={UpdateClass} options={{ headerShown: false }} />
      <Stack.Screen name="ClassDetails" component={ClassDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="TeaLogin" component={TeaLogin} options={{ headerShown: false }} />
      <Stack.Screen name="ViewStudents" component={ViewStudents} options={{ headerShown: false }} />
      
        <Stack.Screen name="NearbyClasses" component={NearbyClassView} options={{ title: 'Nearby Classes' }} />
        <Stack.Screen name="AddClass" component={AddClass} options={{ title: 'Add Class' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MarkAttendance" component={AttendenceMark} options={{ title: 'Mark Attendance' }} />
          <Stack.Screen name="StudentAttend" component={StudentAttend} options={{ title: 'Scan Attendance' }} />
          <Stack.Screen name="ParentNotification" component={ParentNotification} options={{ title: 'Parent Notifications' }} />
          <Stack.Screen name="AttendanceReport" component={AttendanceReport} options={{ title: 'Attendance Report' }} />

        {/* prasad added */}
        <Stack.Screen name="UserFeedback" component={UserFeedback} options={{ headerShown: false, }} />
        <Stack.Screen name="ManagerRegister" component={ManagerRegister} options={{ headerShown: false, }} />
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} options={{ headerShown: false, }} />
        <Stack.Screen name="StudentManagement" component={StudentManagement} options={{ headerShown: false, }} />
        <Stack.Screen name="TeachersManagement" component={TeachersManagement} options={{ headerShown: false, }} />
        <Stack.Screen name="AddStudents" component={AddStudents} options={{ headerShown: false, }} />
        <Stack.Screen name="AddTeachers" component={AddTeachers} options={{ headerShown: false, }} />
      </Stack.Navigator>
    </UserProvider>
  );
}

