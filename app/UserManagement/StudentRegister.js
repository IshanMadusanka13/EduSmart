import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { AppText } from '../../components/AppText';
import { AppView } from '../../components/AppView';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DatePicker from '../../components/AppDatePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { addDoc,collection } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';

const { width, height } = Dimensions.get('window');

const StudentRegister = () => {
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
        
        console.log('Register:', { firstName, lastName, dateOfBirth, stream, email, password });

        addDoc(collection(DB, "Student"), {
            email: email,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            stream: stream,
            password: password
        })
          .then(() => {
            console.log('Data added');
            navigation.navigate('index');
          })
          .catch((error) => {
            console.log(error);
          });

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
