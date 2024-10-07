import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import EmojiSlider from "./EmojiSlider";

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
		position: 'absolute',
		left: 15,
	},

	userImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		position: 'absolute',
		right: 20,
		top: 15,
	},

	text: {
		textAlign: "center",
		marginTop: 70,
		fontSize: 25,
		fontWeight: "bold",
		color: "#555555",
	},

	button: {
		backgroundColor: '#7781FB',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginVertical: 20,
		marginHorizontal: 20,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

const UserFeedback = () => {
	const navigation = useNavigation();

	const handleBackPress = () => {
		navigation.goBack();
	};

	const handleSubmit = () => {
		console.log("Feedback submitted");
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar barStyle="light-content" backgroundColor="#7781FB" />
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
					<AntDesign name="arrowleft" size={24} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Review joined class</Text>
				<Image
					source={require('../../assets/images/icon.png')}
					style={styles.userImage}
				/>
			</View>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
				>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View>
				<Text
					style={{
						fontSize: 23,
						marginTop: 20,
						marginLeft: 20,
						fontWeight: 'bold',
						color: '#7781FB',
					}}
				>Review joined class</Text>
			</View>
			<View>
				<Text
					style={{
						fontSize: 20,
						marginTop: 25,
						marginLeft: 20,
						color: 'black',
					}}
				>Combined Mathematics</Text>
			</View>
			<View>
				<Text
					style={{
						fontSize: 18,
						marginTop: 5,
						marginLeft: 20,
						color: 'black',
					}}
				>Mr. Saman Gunathilaka</Text>
			</View>
			<View>
				<Text
					style={{
						fontSize: 17,
						marginTop: 5,
						marginLeft: 20,
						color: 'black',
						fontWeight: '300',
					}}
				>Delux Educational Institute - Maharagama</Text>
			</View>
			<Lottie
				source={require('../../assets/animations/first-place-badge.json')}
				autoPlay
				loop
				style={{
					width: 40,
					height: 40,
					marginTop: 25,
					alignSelf: 'center',
				}}
			/>
						<View>
							<Text
								style={{
									fontSize: 17,
									marginTop: 10,
									fontWeight: 'bold',
									color: '#7781FB',
									textAlign: 'center',
								}}
							>Current lesson</Text>
						</View>
						<View>
							<Text
								style={{
									fontSize: 20,
									marginTop: 5,
									fontWeight: 'bold',
									color: 'black',
									textAlign: 'center',
								}}
							>Geometrics</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
							<Lottie
								source={require('../../assets/animations/medal.json')}
								autoPlay
								loop
								style={{
									width: 70,
									height: 70,
								}}
							/>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									color: '#7781FB',
									textAlign: 'center',
								}}
							>
								Review class under lesson
							</Text>
						</View>
						<View style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
							<View>
								<EmojiSlider />
							</View>
						</View>
						<View>
							<TextInput
								style={{
									borderWidth: 2,
									borderColor: '#7781FB',
									borderRadius: 10,
									marginTop: 15,
									marginLeft: 20,
									marginRight: 20,
									padding: 10,
									height: 80,
								}}
								multiline={true}
								numberOfLines={3}
								placeholder="Type your feedback here..."
							/>
						</View>
						<View>
							<TouchableOpacity style={styles.button} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Submit Feedback</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>

	);
};

export default UserFeedback;
