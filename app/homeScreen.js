
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppView } from '../components/AppView';
import { AppText } from '../components/AppText';
import { Colors } from '../constants/Colors';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <AppView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
        />
        <AppText type="title" style={styles.title}>EduSmart</AppText>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.light.info }]}
          onPress={() => navigation.navigate('MarkAttendance')}
        >
          <Image
            //source={require('../assets/images/attendance.png')}
            style={styles.buttonIcon}
          />
          <AppText style={styles.buttonText}>Mark Attendance</AppText>
        </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.light.info }]}
            onPress={() => navigation.navigate('AttendanceReport')}
          >
            <Image
              //source={require('../assets/images/report.png')}
              style={styles.buttonIcon}
            />
            <AppText style={styles.buttonText}>Attendance Report</AppText>
          </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.light.primary }]}
          onPress={() => navigation.navigate('StudentAttend')}
        >
          <Image
            //source={require('../assets/images/report.png')}
            style={styles.buttonIcon}
          />
          <AppText style={styles.buttonText}>Student Mark Attendance</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.light.success }]}
          onPress={() => navigation.navigate('ParentNotification', { studentId: 'STUDENT_ID' })}
        >
          <Image
            //source={require('../assets/images/icon.png')}
            style={styles.buttonIcon}
          />
          <AppText style={styles.buttonText}>Parent Notifications</AppText>
        </TouchableOpacity>
      </View>
    </AppView>
  );
}

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
