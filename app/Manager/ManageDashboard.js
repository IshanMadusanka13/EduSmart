import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';


const sessionExpiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const ManageDashboard = () => {

	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);


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
	}, []);

	if (loading) {
		// Show a loader while the session is being checked
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (!isAuthenticated) {
		// If not authenticated, return null to prevent rendering the page content
		return null;
	}

	return (
		<View>
			<Text>ManageDashboard</Text>
			{/* Dashboard content goes here */}
		</View>
	);
};

export default ManageDashboard;