import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, TextInput, FlatList } from 'react-native';
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
	const [students, setStudents] = useState([]);
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

	const fetchStudents = async () => {
		try {
			const studentCollection = collection(DB, 'Student');
			const querySnapshot = await getDocs(query(studentCollection));
			const studentsArray = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				studentsArray.push({
					id: doc.id,
					name: data.name,
					email: data.email, // Assuming email is stored in Firestore
					// profileImage: data.profileImage,
				});
			});
			setStudents(studentsArray);
		} catch (error) {
			console.error('Error fetching students:', error);
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
		fetchStudents();
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

	// Filter students based on the search query
	const filteredStudents = students.filter(student => {
		const queryLower = searchQuery.toLowerCase();
		return (
			(student.name && student.name.toLowerCase().includes(queryLower)) ||
			(student.email && student.email.toLowerCase().includes(queryLower))
		);
	});

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
						source={require('../../assets/images/user.png')}
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

				{/* Displaying Students */}
				<FlatList
					data={filteredStudents} // Use filtered students for rendering
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.squareButton}>
							<Text style={styles.buttonText}>{item.name.split(' ')[0]}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={item => item.id}
					numColumns={3} // This ensures three cards per row
					columnWrapperStyle={styles.buttonRow} // This aligns items in rows
				/>
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
		flex: 1,
	},
	userImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 20,
	},
	dropdown: {
		position: 'absolute',
		top: 60,
		right: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	dropdownItem: {
		padding: 10,
	},
	dropdownText: {
		color: '#7781FB',
	},
	card: {
		margin: 20,
		padding: 10,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	searchContainer: {
		paddingHorizontal: 20,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	searchInput: {
		flex: 1,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
	},
	addButton: {
		backgroundColor: '#7781FB',
		padding: 10,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	squareButton: {
		backgroundColor: '#7781FB',
		height: 100,
		width: 100,
		padding: 20,
		margin: 10,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		elevation: 2,
	},
	buttonText: {
		color: '#333',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonRow: {
		justifyContent: 'space-between',
	},
});
