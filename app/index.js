import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './LaunchScreen';
import LoginScreen from './UserManagement/Login';
import StudentRegister from './UserManagement/StudentRegister';
import { UserProvider } from '../hooks/UserContext';
import NearbyClassView from './ClassManagement/NearbyClassView';
import AddClass from './ClassManagement/AddClass';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
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
        <Stack.Screen name="NearbyClasses" component={NearbyClassView} options={{ title: 'Nearby Classes' }} />
        <Stack.Screen name="AddClass" component={AddClass} options={{ title: 'Add Class' }} />
      </Stack.Navigator>
    </UserProvider>
  );
}
