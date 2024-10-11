import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { AppText } from './../../components/AppText';
import { AppView } from './../../components/AppView';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';
import { useUser } from '../../hooks/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

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
                navigation.navigate("MainTabs");
            }
        }).catch((error) => {
            console.error("Error during login:", error);
        });
    };

    return (
        <ScrollView style={styles.scrollView}>
            <LinearGradient
                colors={[Colors.light.primary, Colors.light.accent]}
                style={styles.header}
            >
                <Ionicons name="school-outline" size={60} color="white" />
                <AppText style={styles.headerText}>Welcome to EduSmart</AppText>
            </LinearGradient>
            <AppView style={styles.container}>
                <View style={styles.formSection}>
                    <AppText style={styles.sectionTitle}>Login</AppText>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={loginDetails.email}
                        onChangeText={text => handleChange('email', text)}
                        keyboardType="email-address"
                        left={<TextInput.Icon icon="email" />}
                    />
                    <TextInput
                        style={styles.input}
                        label="Password"
                        value={loginDetails.password}
                        onChangeText={text => handleChange('password', text)}
                        secureTextEntry
                        left={<TextInput.Icon icon="lock" />}
                    />
                </View>

                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Login
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')} style={styles.registerLink}>
                    <AppText style={styles.registerText}>Don't have an account? Register</AppText>
                </TouchableOpacity>
            </AppView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.35,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 30,
    },
    formSection: {
        marginBottom: 50,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 50,
        paddingVertical: 8,
        backgroundColor: Colors.light.primary,
    },
    registerLink: {
        marginTop: 15,
        alignItems: 'center',
    },
    registerText: {
        color: Colors.light.primary,
        fontSize: 16,
    },
});