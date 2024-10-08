import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { DB } from '../../utils/DBConnect'; // Firebase connection
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods

const ManagerRegister = () => {
	const navigation = useNavigation();
	const [registerDetails, setRegisterDetails] = useState({
		Institute_name: '',
		city: '',
		Address: '',
		Email_Address: '',
		Username: '',
		Password: '',
		Re_Password: '',
	});

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [rePasswordVisible, setRePasswordVisible] = useState(false);

	const handleChange = (field, value) => {
		setRegisterDetails((prevDetails) => ({
			...prevDetails,
			[field]: value,
		}));
	};

	const handleBackPress = () => {
		console.log('Back button pressed');
		navigation.goBack();
	};

	const handleRegister = async () => {
		const { Institute_name, city, Address, Email_Address, Username, Password, Re_Password } = registerDetails;

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(Email_Address)) {
			Alert.alert('Error', 'Please enter a valid email address.');
			return;
		}

		if (!Institute_name || !city || !Address || !Email_Address || !Username || !Password || !Re_Password) {
			Alert.alert('Error', 'Please fill in all required fields.');
			return;
		}

		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]{8,}$/;
		if (!passwordPattern.test(Password)) {
			Alert.alert('Error', 'Password must contain at least 8 characters, including uppercase, lowercase, special character, and number.');
			return;
		}

		if (/\s/.test(Username)) {
			Alert.alert('Error', 'Username cannot contain spaces.');
			return;
		}

		try {
			const docRef = await addDoc(collection(DB, "managers"), {
				Institute_name: Institute_name,
				city: city,
				Address: Address,
				Email_Address: Email_Address,
				Username: Username,
				Password: Password,
				createdAt: new Date(),
			});

			Alert.alert('Success', 'Manager registered successfully!');
			navigation.navigate('Login');
		} catch (error) {
			console.error("Error adding document: ", error);
			Alert.alert('Error', 'Failed to register. Please try again.');
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: 'white' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<StatusBar barStyle="light-content" backgroundColor="#7781FB" />
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Manager Register</Text>
					<TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
						<AntDesign name="arrowleft" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View>
						<Text style={styles.title}>Register</Text>
					</View>
					<View style={styles.formContainer}>
						<TextInput
							label="Institute Name"
							value={registerDetails.Institute_name}
							onChangeText={(text) => handleChange('Institute_name', text)}
							style={[styles.input, { borderRadius: 20 }]}
							mode="outlined"
						/>
						<TextInput
							label="City"
							value={registerDetails.city}
							onChangeText={(text) => handleChange('city', text)}
							style={styles.input}
							mode="outlined"
						/>
						<TextInput
							label="Address"
							value={registerDetails.Address}
							onChangeText={(text) => handleChange('Address', text)}
							style={styles.input}
							mode="outlined"
						/>
						<TextInput
							label="Email Address"
							value={registerDetails.Email_Address}
							onChangeText={(text) => handleChange('Email_Address', text)}
							style={styles.input}
							mode="outlined"
						/>
						<TextInput
							label="Username"
							value={registerDetails.Username}
							onChangeText={(text) => handleChange('Username', text)}
							style={styles.input}
							mode="outlined"
						/>
						<TextInput
							label="Password"
							value={registerDetails.Password}
							onChangeText={(text) => handleChange('Password', text)}
							secureTextEntry={!passwordVisible}
							right={
								<TextInput.Icon
									icon={passwordVisible ? "eye" : "eye-off"}
									onPress={() => setPasswordVisible(!passwordVisible)}
								/>
							}
							style={styles.input}
							mode="outlined"
						/>
						<TextInput
							label="Re-Password"
							value={registerDetails.Re_Password}
							onChangeText={(text) => handleChange('Re_Password', text)}
							secureTextEntry={!rePasswordVisible}
							right={
								<TextInput.Icon
									icon={rePasswordVisible ? "eye" : "eye-off"}
									onPress={() => setRePasswordVisible(!rePasswordVisible)}
								/>
							}
							style={styles.input}
							mode="outlined"
						/>
						<Button mode="contained" onPress={handleRegister} style={styles.button}>
							Register
						</Button>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#7781FB',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		flexDirection: 'row',
	},
	headerTitle: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		flex: 1,
	},
	backButton: {
		left: 20,
		position: 'absolute',
	},
	formContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
	title: {
		fontWeight: 'bold',
		marginBottom: 20,
		fontSize: 21,
		margin: 20,
	},
	input: {
		width: '100%',
		marginBottom: 15,
	},
	button: {
		width: '60%',
		marginTop: 20,
	},
});

export default ManagerRegister;
