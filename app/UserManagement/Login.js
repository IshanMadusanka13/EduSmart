import { useNavigation } from 'expo-router';
import { AppText } from './../../components/AppText';
import { AppView } from './../../components/AppView';
import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';
import { useUser } from '../../hooks/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const { setUser } = useUser();
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
            // Query Firestore for users table
            const userRef = collection(DB, "user");
            const qUser = query(
                userRef,
                where("email", "==", email),
                where("password", "==", password)
            );

            const userSnapshot = await getDocs(qUser);

            if (!userSnapshot.empty) {
                const userData = userSnapshot.docs[0].data();
                setUser(userData);
                await AsyncStorage.setItem('userSession', JSON.stringify(userData));
                navigation.navigate("Home");
                return;
            }

            // Query Firestore for managers table
            const managerRef = collection(DB, "managers");
            const qManager = query(
                managerRef,
                where("Email_Address", "==", email),
                where("Password", "==", password)
            );

            const managerSnapshot = await getDocs(qManager);

            if (!managerSnapshot.empty) {
                const managerData = managerSnapshot.docs[0].data();
                const session = {
                    email: managerData.Email_Address,
                    timestamp: new Date().getTime(),
                };
                await AsyncStorage.setItem('userSession', JSON.stringify(session));
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
                <AppText style={styles.header} type='title'>EduSmart</AppText>
            </View>
            <View style={styles.titleContainer}>
                <AppText style={styles.title} type='subtitle'>Login</AppText>
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
                    <Button mode="contained" onPress={() => handleLogin()} style={styles.buttonStyle} loading={loading} disabled={loading}>
                        Login
                    </Button>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')} style={styles.registerContainer}>
                    <AppText>Don't have an account? <AppText style={styles.registerText}>Register</AppText></AppText>
                </TouchableOpacity>
            </View>
        </AppView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        width: '100%',
        paddingTop: height * 0.019,
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'left',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#674fa3',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#674fa3',
        alignItems: 'left',
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
        marginBottom: 25,
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
        color: '#674fa3',
        fontWeight: 'bold',
    },
});
