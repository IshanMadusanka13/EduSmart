import { useNavigation } from 'expo-router';
import { AppText } from './../../components/AppText';
import { AppView } from './../../components/AppView';
import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';
import { useUser } from '../../hooks/UserContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const { setUser } = useUser();
    const navigation = useNavigation();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const handleChange = (field, value) => {
        setLoginDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleLogin = () => {
        const userRef = collection(DB, "user");

        console.log("Login details:", loginDetails);

        const q = query(
            userRef,
            where("email", "==", loginDetails.email),
            where("password", "==", loginDetails.password)
        );

        getDocs(q).then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.error("Invalid email or password");
            } else {
                const userData = querySnapshot.docs[0].data();
                setUser(userData);
                console.log("User logged in:", userData);
            }
        }).catch((error) => {
            console.error("Error during login:", error);
        });
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
                    <Button mode="contained" onPress={() => handleLogin()} style={styles.buttonStyle}>
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
