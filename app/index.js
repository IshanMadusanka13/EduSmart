import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './LaunchScreen';
import LoginScreen from './UserManagement/Login';
import StudentRegister from './UserManagement/StudentRegister';
import HomeScreen from './homeScreen';
import AttendenceMark from './AttendenceManagement/attendenceMark';
import StudentAttend from './StudentManagement/studentAttend';
import ParentNotification from './ParentManagement/parentNotification';
import AttendanceReport from './AttendenceManagement/attendanceReport';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName='Launch'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7781FB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentRegister" component={StudentRegister} options={{ title: 'Student Registration' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EduSmart Home' }} />
      <Stack.Screen name="MarkAttendance" component={AttendenceMark} options={{ title: 'Mark Attendance' }} />
      <Stack.Screen name="StudentAttend" component={StudentAttend} options={{ title: 'Scan Attendance' }} />
      <Stack.Screen name="ParentNotification" component={ParentNotification} options={{ title: 'Parent Notifications' }} />
      <Stack.Screen name="AttendanceReport" component={AttendanceReport} options={{ title: 'Attendance Report' }} />
    </Stack.Navigator>
  );
}