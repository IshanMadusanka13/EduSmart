import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

      {/*Subject Management*/}
      <Stack.Screen name="AddClass" component={AddClass} options={{ headerShown: false }} />
      <Stack.Screen name="ViewClasses" component={ViewClasses} options={{ headerShown: false }} />
      <Stack.Screen name="SearchLessons" component={SearchLessons} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateClass" component={UpdateClass} options={{ headerShown: false }} />
      <Stack.Screen name="ClassDetails" component={ClassDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="TeaLogin" component={TeaLogin} options={{ headerShown: false }} />
      <Stack.Screen name="ViewStudents" component={ViewStudents} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
