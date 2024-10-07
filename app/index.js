import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './LaunchScreen';
import LoginScreen from './UserManagement/Login';
import StudentRegister from './UserManagement/StudentRegister';
import UserFeedback from './UserFeedback/UserFeedback';

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
      <Stack.Screen name="UserFeedback" component={UserFeedback} options={{ headerShown: false, }} />


    </Stack.Navigator>
  );
}
