import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';
export default function App() {

  const [data, setData] = useState({

    alpha: 0,
    beta: 0,
    gamma: 0,

  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };

  const _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(({rotation}) => {
        //const betaVal = orientation
        setData(rotation);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { alpha, beta, gamma } = data;

  return (


    <View style={styles.container}>

	  	<Text style={{textAlign: "center", fontSize : 20}}>
	        Knee Flexion Degrees: {getDegrees(round(beta))}
	    </Text>


      <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        y: {round(beta)}
      </Text>




      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

function getDegrees(n) {
	if(!n){
		return 0;
	}
	var pitchraw2 = (Math.abs((radians_to_degrees(n))))
	var pitchtrig = Math.acos((Math.sin(n)) / 1.2);
	var pitch = Math.round(90 + pitchraw2 - (radians_to_degrees(pitchtrig))) //Add a plus 10 correction


	return pitch;
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
