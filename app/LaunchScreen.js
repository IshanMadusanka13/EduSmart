import { useNavigation } from 'expo-router';
import { AppText } from './../components/AppText';
import { AppView } from './../components/AppView';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function LaunchScreen() {

  const navigation = useNavigation();
  
    return (
        <AppView style={styles.container}>
            <AppText type='title'>EduSmart</AppText>
            <Image source={require('../assets/images/icon.png')} style={styles.logo} />
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.buttonStyle} onPress={() => navigation.navigate('Login')}>
                    Login
                </Button>
                <Button mode="contained" style={styles.buttonStyle} onPress={() => navigation.navigate('StudentRegister')}>
                    Register
                </Button>
                {/* <Button mode="contained" style={styles.buttonStyle} onPress={() => navigation.navigate('UserFeedback')}>
                    Feedback
                </Button> */}
                <Button mode="contained" style={styles.buttonStyle} onPress={() => navigation.navigate('SearchLessons')}>
                    Check
                </Button>
            </View>
        </AppView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'space-between',
        height: 100,
    },
    buttonStyle: {
        height: '40%',
        borderRadius: 5,

    },
});
