import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { AppText } from '../../components/AppText';
import { AppView } from '../../components/AppView';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DatePicker from '../../components/AppDatePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';
import { UserTypes } from '../../constants/UserTypes';

const StudentRegister = ({ }) => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [stream, setStream] = useState('Maths');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Maths', value: 'Maths' },
        { label: 'Science', value: 'Science' },
        { label: 'Art', value: 'Art' },
        { label: 'Tech', value: 'Tech' },
    ]);

    const handleRegister = () => {

        const q = query(collection(DB, "user"), where("userType", "==", UserTypes.student));
        getDocs(q)
            .then((querySnapshot) => {
                const firstLetter = UserTypes.student.charAt(0).toUpperCase();
                const size = querySnapshot.empty ? 0 : querySnapshot.size;
                const paddedNumber = (size + 1).toString().padStart(4, '0');
                var studentId = `${firstLetter}${paddedNumber}`;

                var student = {
                    studentId: studentId,
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    stream: stream,
                }

                addDoc(collection(DB, "user"), {
                    email: email,
                    password: password,
                    userType: UserTypes.student,
                    user: student
                })
                    .then(() => {
                        console.log('Data added');
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            })
            .catch((error) => {
                console.log(error);
                throw error;
            });

    };

    const hadleManagerRegister = () => {
        navigation.navigate('ManagerRegister');
    };
    return (
        <AppView style={styles.container}>
            <TextInput
                style={styles.input}
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            <AppText>Date Of Birth:</AppText>
            <DatePicker date={dateOfBirth} onDateChange={setDateOfBirth} />

            <View style={styles.pickerContainer}>
                <AppText>A/L Stream:</AppText>
                <DropDownPicker
                    open={open}
                    value={stream}
                    items={items}
                    setOpen={setOpen}
                    setValue={setStream}
                    setItems={setItems}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                />

            </View>

            <TextInput
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleRegister} style={styles.buttonStyle}>
                    Register
                </Button>
            </View>
            <View style={{ marginTop: 10 }}>
                <Button onPress={hadleManagerRegister}>
                    Manager Register
                </Button>

            </View>
        </AppView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    pickerContainer: {
        marginBottom: 10,
        zIndex: 1000,
    },
    dropdown: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        borderRadius: 0,
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderTopWidth: 0,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    buttonStyle: {
        height: 50,
        justifyContent: 'center',
    },
});

export default StudentRegister;
