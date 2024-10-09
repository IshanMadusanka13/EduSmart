import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addDoc, collection } from 'firebase/firestore';
import { DB } from '../../utils/DBConnect';
import { AppView } from '../../components/AppView';
import { AppText } from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';

export default function StudentAttend() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
  
    // Split the QR code data (classValue, teacherValue, timestamp, startTime, endTime)
    const [classValue, teacherValue, timestamp, startTime, endTime] = data.split('@');
  
    // Validate that the timestamps are valid ISO date strings
    const isValidISODate = (dateString) => !isNaN(new Date(dateString).getTime());
  
    if (isValidISODate(startTime) && isValidISODate(endTime) && isValidISODate(timestamp)) {
      const studentId = "0003";  // Replace with actual student ID retrieval method
  
      addDoc(collection(DB, "StudentAttendance"), {
        studentId: studentId,
        class: classValue,
        teacher: teacherValue,
        timestamp: timestamp,  // Use the parsed timestamp from QR code
        startTime: startTime,  // Use the parsed startTime from QR code
        endTime: endTime,      // Use the parsed endTime from QR code
        scannedAt: new Date().toISOString()  // Save the time the student scanned
      })
      .then(() => {
        Alert.alert(
          "Success",
          "Attendance marked successfully! Parent notified.",
          [{ text: "OK", onPress: () => navigation.navigate('Home') }]
        );
      })
      .catch((error) => {
        console.error('Error marking attendance:', error);
        Alert.alert("Error", "Failed to mark attendance. Please try again.");
      });
    } else {
      // If any of the parsed data is not valid ISO format, show an error message
      Alert.alert("Invalid QR Code", "The QR code data is not valid.");
    }
  };
  
  if (hasPermission === null) {
    return <AppText>Requesting for camera permission</AppText>;
  }
  if (hasPermission === false) {
    return <AppText>No access to camera</AppText>;
  }

  return (
    <AppView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button mode="contained" onPress={() => setScanned(false)} style={styles.button}>
          Tap to Scan Again
        </Button>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
  },
});