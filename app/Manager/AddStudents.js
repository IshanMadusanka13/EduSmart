import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StatusBar, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, Image } from 'react-native';
import { TextInput, Button, Menu, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DB } from '../../utils/DBConnect';
import { collection, addDoc } from 'firebase/firestore';


const sessionExpiryTime = 24 * 60 * 60 * 1000;

const AddStudents = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [rePasswordVisible, setRePasswordVisible] = useState(false);

	// State to manage form data
	const [studentDetails, setStudentDetails] = useState({
		name: '',
		stream: '',
		Contact: '',
		Guardian: '',
		Guardian_Contact: '',
		Email: '',
		Password: '',
		Re_Password: '',

	});

	const [imageUri, setImageUri] = useState(null);
	const [menuVisible, setMenuVisible] = useState(false);
	const streams = ['Maths', 'Science', 'Art', 'Tech'];
	const [errors, setErrors] = useState({});

	const handleBackPress = () => {
		navigation.goBack();
	};

	const handleImagePress = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permissionResult.granted) {
			Alert.alert("Permission to access camera roll is required!");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);  // Set the selected image URI
		}
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

	const handleAddStudent = async () => {
		try {
			await addDoc(collection(DB, 'Student'), {
				name: studentDetails.name,
				stream: studentDetails.stream,
				Contact: studentDetails.Contact,
				Guardian: studentDetails.Guardian,
				Guardian_Contact: studentDetails.Guardian_Contact,
				Email: studentDetails.Email,
				Password: studentDetails.Password,
				imageUri: imageUri, // Optionally include the image URI
			});

			Alert.alert("Success", "Student added successfully!");
			setStudentDetails({
				name: '',
				stream: '',
				Contact: '',
				Guardian: '',
				Guardian_Contact: '',
				Email: '',
				Password: '',
				Re_Password: '',
			});
			setImageUri(null);
		} catch (error) {
			console.error("Error adding student: ", error);
			Alert.alert("Error", "Could not add student. Please try again.");
		}
	};

	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	const handleStreamSelection = (stream) => {
		handleChange('stream', stream);
		closeMenu();
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: 'white' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<Provider>
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#7781FB" />

			<View style={styles.header}>
				<Text style={styles.headerTitle}>Add Students</Text>
				<TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
					<AntDesign name="arrowleft" size={24} color="#fff" />
				</TouchableOpacity>
			</View>
						<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.formContainer}>
				<TextInput
					label="Student Name"
									value={studentDetails.name}
									onChangeText={(text) => handleChange('name', text)}
					style={styles.input}
					mode="outlined"
				/>
								{errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
								{/* Image picker button */}
								<TouchableOpacity style={styles.imageButton} onPress={handleImagePress}>
									<Text style={styles.imageButtonText}>Add Image</Text>
								</TouchableOpacity>

								{/* Display selected image */}
								{imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

								<Menu
									visible={menuVisible}
									onDismiss={closeMenu}
									anchor={
										<TouchableOpacity style={styles.dropdownButton} onPress={openMenu}>
											<Text style={styles.dropdownText}>
												{studentDetails.stream || 'Select A/L Stream'}
											</Text>
										</TouchableOpacity>
									}
								>
									{streams.map((stream) => (
										<Menu.Item key={stream} onPress={() => handleStreamSelection(stream)} title={stream} />
									))}
								</Menu>

								<TextInput
									label="Contact"
									value={studentDetails.Contact}
									onChangeText={(text) => handleChange('Contact', text)}
									style={styles.input}
									mode="outlined"
								/>
								{errors.Contact && <Text style={styles.errorText}>{errors.Contact}</Text>}
								<TextInput
									label="Guardian"
									value={studentDetails.Guardian}
									onChangeText={(text) => handleChange('Guardian', text)}
									style={styles.input}
									mode="outlined"
								/>
								<TextInput
									label="Guardian Contact"
									value={studentDetails.Guardian_Contact}
									onChangeText={(text) => handleChange('Guardian_Contact', text)}
									style={styles.input}
									mode="outlined"
								/>
								<TextInput
									label="Email"
									value={studentDetails.Email}
									onChangeText={(text) => handleChange('Email', text)}
									style={styles.input}
									mode="outlined"
								/>

								<TextInput
									label="Password"
									value={studentDetails.Password}
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
								{errors.Password && <Text style={styles.errorText}>{errors.Password}</Text>}
								<TextInput
									label="Re-Password"
									value={studentDetails.Re_Password}
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
								{errors.Re_Password && <Text style={styles.errorText}>{errors.Re_Password}</Text>}

				<Button mode="contained" onPress={handleAddStudent} style={styles.button}>
					Add Student
				</Button>
			</View>
						</ScrollView>
		</View>
				</Provider>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
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
	dropdownButton: {
		marginTop: 20,
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		height: 50,
	},
	dropdownText: {
		color: '#000',
		fontSize: 16,
	},
	button: {
		marginTop: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageButton: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#7781FB',
		alignItems: 'center',
		borderRadius: 5,
	},
	imageButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	imagePreview: {
		width: 100,
		height: 100,
		marginTop: 10,
		borderRadius: 10,
	},

});

export default AddStudents;
