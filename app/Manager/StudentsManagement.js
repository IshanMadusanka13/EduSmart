import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
import { DB } from '../../utils/DBConnect';
import { collection, query, getDocs } from 'firebase/firestore';

const sessionExpiryTime = 24 * 60 * 60 * 1000;

const StudentManagement = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [malePercentage, setMalePercentage] = useState(0);
	const [femalePercentage, setFemalePercentage] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');

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

	const fetchGenderData = async () => {
		try {
			const studentCollection = collection(DB, 'Student');
			const querySnapshot = await getDocs(query(studentCollection));
			let maleCount = 0;
			let femaleCount = 0;
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				if (data.gender === 'male') {
					maleCount++;
				} else if (data.gender === 'female') {
					femaleCount++;
				}
			});

			const total = maleCount + femaleCount;
			setMalePercentage((maleCount / total) * 100);
			setFemalePercentage((femaleCount / total) * 100);
		} catch (error) {
			console.error('Error fetching gender data:', error);
		}
	};

	useEffect(() => {
		const validateSession = async () => {
			const session = await AsyncStorage.getItem('userSession');
			if (session) {
				const { timestamp } = JSON.parse(session);
				const currentTime = new Date().getTime();

				// Check if session is still valid (within 24 hours)
				if (currentTime - timestamp <= sessionExpiryTime) {
					setIsAuthenticated(true); // Session is valid
				} else {
					// Session expired, remove it and redirect to login
					await AsyncStorage.removeItem('userSession');
					navigation.navigate('LoginScreen');
				}
			} else {
				// No session found, redirect to login
				navigation.navigate('LoginScreen');
			}
			setLoading(false);
		};

		validateSession(); // Run session validation on mount
		fetchGenderData();
	}, []);

	if (loading) {
		// Show loader while session is being validated
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return (
		<View>
			<StatusBar barStyle="light-content" backgroundColor="#7781FB" />
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
					<AntDesign name="arrowleft" size={24} color="#fff" style={{ marginLeft: 20 }} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>View All Students</Text>
				<TouchableOpacity onPress={handleImagePress}>
					<Image
						source={require('../../assets/images/icon.png')}
						style={styles.userImage}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				{/* Dropdown */}
				{dropdownVisible && (
					<View style={styles.dropdown}>
						<TouchableOpacity onPress={handleProfile} style={styles.dropdownItem}>
							<Text style={styles.dropdownText}>Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
							<Text style={styles.dropdownText}>Logout</Text>
						</TouchableOpacity>
					</View>
				)}
				{/* Gender Distribution Card */}
				<Card style={styles.card}>
					<Text style={styles.cardTitle}>Students Status</Text>
					<BarChart
						data={{
							labels: ['Male', 'Female'],
							datasets: [
								{
									data: [malePercentage, femalePercentage],
									color: () => '#007BFF',
								},
							],
						}}
						width={Dimensions.get('window').width - 100}
						height={220}
						yAxisLabel="%"
						chartConfig={{
							backgroundColor: '#fff',
							backgroundGradientFrom: '#fff',
							backgroundGradientTo: '#fff',
							color: () => '#007BFF',
							style: {
								borderRadius: 16,
							},
							// This will define the color for the y-axis
							propsForBackgroundLines: {
								strokeDasharray: "", // solid background lines with no dashes
								strokeWidth: 1, // width of the background lines
								stroke: "#e4e4e4", // color of the background lines
							},
						}}
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
						// Set the y-axis limits (0-100%)
						withVerticalLabels={true}
						withHorizontalLines={true}
						verticalLabelRotation={30}
						fromZero={true}
					/>
				</Card>

				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<View style={styles.rowContainer}>
						<TextInput
							style={styles.searchInput}
							placeholder="Search Student..."
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
						{/* Add Student Button */}
						<TouchableOpacity style={styles.addButton}>
							<FontAwesome name="plus" size={24} color="#fff" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Square Card Buttons Row */}
				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 3</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 3</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.squareButton}>
						<Text style={styles.buttonText}>Button 3</Text>
					</TouchableOpacity>
				</View>


			</ScrollView>
		</View>

	);
}

export default StudentManagement;

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
		flex: 2,
	},
	backButton: {
		position: 'flex',
		left: 20,
	},
	userImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		position: 'flex',
		right: 20,
	},
	dropdown: {
		position: 'absolute',
		top: 50,
		right: 30,
		backgroundColor: '#fff',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		zIndex: 1,
		width: 100,
		display: 'flex',
		alignItems: 'center',
	},
	dropdownItem: {
		padding: 10,
	},
	dropdownText: {
		color: '#000',
		fontSize: 16,
	},
	card: {
		margin: 20,
		padding: 20,
		borderRadius: 10,
		elevation: 3,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	searchContainer: {
		margin: 20,
		paddingLeft: 10,
	},
	searchInput: {
		height: 40,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		width: '80%',

	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginVertical: 10,
	},
	squareButton: {
		flex: 1,
		height: 100, // Set a fixed height for square shape
		backgroundColor: '#7781FB',
		marginHorizontal: 5,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	addButton: {
		backgroundColor: '#7781FB',
		borderRadius: 10,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
	},
});