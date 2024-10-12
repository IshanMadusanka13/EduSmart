import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppView } from '../components/AppView';
import { AppText } from '../components/AppText';
import { Colors } from '../constants/Colors';
import { useUser } from '../hooks/UserContext';
import { UserTypes } from '../constants/UserTypes';
import { DB } from '../utils/DBConnect';
import { collection, getDocs } from 'firebase/firestore';
import { BarChart } from 'react-native-chart-kit';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setUser } = useUser();


  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.accent]}
        style={styles.header}
      >
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
        />
        <AppText type="title" style={styles.title}>EduSmart</AppText>
        <AppText style={styles.welcomeText}>Welcome, {user?.user.firstName}</AppText>
      </LinearGradient>

      <AppView style={styles.container}>
        <View style={styles.content}>
          <LoadHomeScreen />
        </View>
      </AppView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color={Colors.light.text} />
        <AppText style={styles.logoutText}>Logout</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const LoadHomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const renderButton = (icon, text, onPress, color) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color="white" />
      <AppText style={styles.cardText}>{text}</AppText>
    </TouchableOpacity>
  );

  const renderButtonRow = (buttons) => (
    <View style={styles.buttonRow}>
      {buttons.map((button, index) => (
        <React.Fragment key={index}>
          {renderButton(button.icon, button.text, button.onPress, button.color)}
        </React.Fragment>
      ))}
    </View>
  );

  if (!user) {
    navigation.navigate('Login');
  } else {
    var typeUser = user.user.user;

    switch (user.user.userType) {

      case UserTypes.student:

        const [chartData, setChartData] = useState({
          labels: [],
          datasets: [{ data: [] }],
        });

        useEffect(() => {
          // Fetch data from Firestore
          const fetchChartData = async () => {
            try {
              const feedbackCollection = collection(DB, 'new_feedback');
              const feedbackSnapshot = await getDocs(feedbackCollection);
              const labels = [];
              const data = [];

              feedbackSnapshot.forEach(doc => {
                const { totalRating, teacherId } = doc.data();
                labels.push(teacherId); // Add teacherId to labels
                data.push(totalRating); // Add totalRating to data
              });

              // Set chart data
              setChartData({
                labels,
                datasets: [{ data }],
              });
            } catch (error) {
              console.error("Error fetching chart data: ", error);
            }
          };

          fetchChartData();
        }, []);

        return (
          <View>

            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.cardTitle}>Teachers Review Status summery</Text>
              <BarChart
                data={chartData1}
                width={Dimensions.get('window').width - 40} // Full width minus padding
                height={250}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: () => '#007BFF',
                  style: {
                    borderRadius: 16,
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '',
                    strokeWidth: 1,
                    stroke: '#e4e4e4',
                  },
                }}
                verticalLabelRotation={10}
              />
            </View>



            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.primary }]}
              onPress={() => navigation.navigate('StudentAttend',{ studentId: typeUser.studentId })}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>Student Mark Attendance</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.success }]}
              onPress={() => navigation.navigate('NearbyClasses')}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>View Nearby Classes</AppText>
            </TouchableOpacity>
          </View>
        );


      case UserTypes.parent:
        const [chartData1, setChartData1] = useState({
          labels: [],
          datasets: [{ data: [] }],
        });

        useEffect(() => {
          // Fetch data from Firestore
          const fetchChartData = async () => {
            try {
              const feedbackCollection = collection(DB, 'new_feedback');
              const feedbackSnapshot = await getDocs(feedbackCollection);
              const labels = [];
              const data = [];

              feedbackSnapshot.forEach(doc => {
                const { totalRating, teacherId } = doc.data();
                labels.push(teacherId); // Add teacherId to labels
                data.push(totalRating); // Add totalRating to data
              });

              // Set chart data
              setChartData1({
                labels,
                datasets: [{ data }],
              });
            } catch (error) {
              console.error("Error fetching chart data: ", error);
            }
          };

          fetchChartData();
        }, []);

        return (
          <View>

            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.cardTitle}>Teachers Review Status summery</Text>
              <BarChart
                data={chartData1}
                width={Dimensions.get('window').width - 40} // Full width minus padding
                height={250}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: () => '#007BFF',
                  style: {
                    borderRadius: 16,
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '',
                    strokeWidth: 1,
                    stroke: '#e4e4e4',
                  },
                }}
                verticalLabelRotation={10}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.success }]}
              onPress={() => navigation.navigate('ParentNotification', { studentId: typeUser.studentId })}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>Parent Notifications</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.success }]}
              onPress={() => navigation.navigate('NearbyClasses')}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>View Nearby Classes</AppText>
            </TouchableOpacity>
          </View>
        );

          case UserTypes.teacher:
          return (
            <View></View>
          );

          case UserTypes.InstituteManager:
        return (
          <>
            {renderButtonRow([
              {
                icon: 'checkmark-circle-outline',
                text: 'Mark Attendance',
                onPress: () => navigation.navigate('MarkAttendance'),
                color: Colors.light.primary
              },
              {
                icon: 'document-text-outline',
                text: 'Attendance Report',
                onPress: () => navigation.navigate('AttendanceReport'),
                color: Colors.light.info
              }
            ])}
            {renderButtonRow([
              {
                icon: 'add-circle-outline',
                text: 'Add Classes',
                onPress: () => navigation.navigate('AddClass'),
                color: Colors.light.success
              },
              {
                icon: 'location-outline',
                text: 'Nearby Classes',
                onPress: () => navigation.navigate('NearbyClasses'),
                color: Colors.light.success
              }
            ])}
          </>
        );

      default:
        break;
    }
  }
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  decimalPlaces: 0, // Optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    padding: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  chartContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
});