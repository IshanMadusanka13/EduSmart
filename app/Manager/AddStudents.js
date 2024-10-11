import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // Add these imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const sessionExpiryTime = 24 * 60 * 60 * 1000;

const AddStudents = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	// State to manage form data
	const [studentDetails, setStudentDetails] = useState({
		studentName: '',
		AlStream: '',
		Conatct: '',
		Email: '',
		Username: '',
		Passqwrd: '',
		Re_Password: '',

	});

	// State to handle errors
	const [errors, setErrors] = useState({});

	const handleBackPress = () => {
		navigation.goBack();
	};

	const handleImagePress = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem('userSession');
		navigation.navigate('Login');
	};

	const handleProfile = () => {
		navigation.goBack();
	};

	// Validate the session
	useEffect(() => {
		const validateSession = async () => {
			const session = await AsyncStorage.getItem('userSession');
			if (session) {
				const { timestamp } = JSON.parse(session);
				const currentTime = new Date().getTime();

				if (currentTime - timestamp <= sessionExpiryTime) {
					setIsAuthenticated(true);
				} else {
					await AsyncStorage.removeItem('userSession');
					navigation.navigate('LoginScreen');
				}
			} else {
				navigation.navigate('LoginScreen');
			}
			setLoading(false);
		};

		validateSession();
	}, []);

	const handleChange = (field, value) => {
		setStudentDetails((prevDetails) => ({
			...prevDetails,
			[field]: value,
		}));
	};

	const handleAddStudent = () => {
		// Add your form submission logic here
		console.log(studentDetails);
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#7781FB" />

			<View style={styles.header}>
				<Text style={styles.headerTitle}>Add Students</Text>
				<TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
					<AntDesign name="arrowleft" size={24} color="#fff" />
				</TouchableOpacity>
			</View>

			<View style={styles.formContainer}>
				<TextInput
					label="Student Name"
					value={studentDetails.studentName}
					onChangeText={(text) => handleChange('studentName', text)}
					style={styles.input}
					mode="outlined"
				/>
				{errors.studentName && <Text style={styles.errorText}>{errors.studentName}</Text>}

				<TextInput
					label="A/L Stream"
					value={studentDetails.studentID}
					onChangeText={(text) => handleChange('alStream', text)}
					style={styles.input}
					mode="outlined"
				/>
				{errors.studentID && <Text style={styles.errorText}>{errors.studentID}</Text>}

				<TextInput
					label="Contact"
					value={studentDetails.grade}
					onChangeText={(text) => handleChange('Contact', text)}
					style={styles.input}
					mode="outlined"
				/>
				{errors.grade && <Text style={styles.errorText}>{errors.grade}</Text>}
				<TextInput
					label="Contact"
					value={studentDetails.grade}
					onChangeText={(text) => handleChange('Contact', text)}
					style={styles.input}
					mode="outlined"
				/>
				<TextInput
					label="Contact"
					value={studentDetails.grade}
					onChangeText={(text) => handleChange('Contact', text)}
					style={styles.input}
					mode="outlined"
				/>


				<Button mode="contained" onPress={handleAddStudent} style={styles.button}>
					Add Student
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	header: {
		backgroundColor: '#7781FB',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
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
		padding: 20,
	},
	input: {
		marginBottom: 10,
		width: '100%',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
	button: {
		marginTop: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AddStudents;
