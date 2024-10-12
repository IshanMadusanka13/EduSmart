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
    <ScrollView>
      <AppView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.logo}
          />
          <AppText type="title" style={styles.title}>EduSmart</AppText>
        </View>

        <View style={styles.content}>
          <LoadHomeScreen />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.light.info }]}
            onPress={() => handleLogout()}
          >
            <Image style={styles.buttonIcon}
            />
            <AppText style={styles.buttonText}>Logout</AppText>
          </TouchableOpacity>
        </View>
      </AppView>
    </ScrollView>
  );
}

const LoadHomeScreen = () => {
  const navigation = useNavigation();
  const user = useUser();

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
          <View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.info }]}
              onPress={() => navigation.navigate('MarkAttendance')}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>Mark Attendance</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.info }]}
              onPress={() => navigation.navigate('AttendanceReport')}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>Attendance Report</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.light.success }]}
              onPress={() => navigation.navigate('AddClass')}
            >
              <Image style={styles.buttonIcon}
              />
              <AppText style={styles.buttonText}>Add Classes</AppText>
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
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
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
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});