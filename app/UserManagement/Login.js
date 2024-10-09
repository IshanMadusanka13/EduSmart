import { useNavigation } from 'expo-router';
import { AppText } from './../../components/AppText';
import { AppView } from './../../components/AppView';
import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DB } from '../../utils/DBConnect';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

export default function LoginScreen() {

    const navigation = useNavigation();


    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setLoginDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleLogin = async () => {
        const { email, password } = loginDetails;
        if (!email || !password) {
            Alert.alert('Error', "Please enter both email and password.");
            return;
        }
        setLoading(true);

        try {
            // Query Firestore to check if the manager exists with matching email and password
            const q = query(collection(DB, "managers"), where("Email_Address", "==", email), where("Password", "==", password));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // If a manager is found, set session in AsyncStorage (for 24 hours)
                const session = {
                    email,
                    timestamp: new Date().getTime(), // Current time in milliseconds
                };
                await AsyncStorage.setItem('userSession', JSON.stringify(session));


                // Navigate to managerDashboard
                navigation.navigate('ManagerDashboard');
            } else {
                Alert.alert("Login Failed", "Invalid email or password.");
            }
        } catch (error) {
            console.error("Error during login: ", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppView style={styles.container}>
            <View style={styles.headerContainer}>
                <AppText type='title'>EduSmart</AppText>
                <AppText type='subtitle'>Login</AppText>
            </View>
            <View style={styles.formContainer}>
                <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                <TextInput
                    label="Email"
                    value={loginDetails.email}
                    onChangeText={text => handleChange('email', text)}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Password"
                    value={loginDetails.password}
                    onChangeText={text => handleChange('password', text)}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                />
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleLogin} style={styles.buttonStyle} loading={loading} disabled={loading}>
                        Login
                    </Button>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')} style={styles.registerContainer}>
                    <AppText>Don't have an account? <AppText style={styles.registerText}>Register</AppText></AppText>
                </TouchableOpacity>

            </View>
        </AppView>
    );
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        width: '100%',
        paddingTop: height * 0.12,
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
        marginBottom: 40,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        height: 50,
        borderColor: 'none',
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    buttonStyle: {
        height: 50,
        justifyContent: 'center',
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});
