import React, { Component,useState, useEffect  } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Accelerometer } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';

class HomeScreen extends Component {
  state = {
    links: [
      { title: 'Submit Knee Measurements', link: 'https://go.gov.sg/scj-feedback' },
	  //Having trouble bringing it to measure Angle page
    ]
  }

  handleButtonPress(item) {
    const { title, link } = item
    this.props.navigation.navigate('Browser', { title, link })
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {this.state.links.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleButtonPress(item)}
              style={styles.button}
            >
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          ))}

        </View>


      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonList: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    margin: 10,
    backgroundColor: '#356bca',
    borderRadius: 5,
    padding: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
})

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




export default HomeScreen