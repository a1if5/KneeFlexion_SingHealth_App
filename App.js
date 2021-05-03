import React, { useState, useEffect, Component, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Alert,
  // Button,
  Platform,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { Button, ThemeProvider } from 'react-native-elements';
import { Dimensions, Switch } from 'react-native';
const screenWidth = Dimensions.get("window").width;
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DeviceMotion } from "expo-sensors";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import moment from "moment";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Card, Avatar } from "react-native-paper";
import {
  Calendar,
  CalendarList,
  Agenda,
  calendarTheme,
} from "react-native-calendars";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { withOrientation } from "react-navigation";
import { Picker } from '@react-native-picker/picker';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import DateTimePicker from '@react-native-community/datetimepicker';
//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';




//To handle all the pages
const Stack = createStackNavigator();
//Database for knee flexion
const db = SQLite.openDatabase("db.db");
//Database for knee extension
const db1 = SQLite.openDatabase("db1.db");
//Database for week of recovery (Percentile)
const userInfo = SQLite.openDatabase("userInfo.db");
//Database for user gender (Percentile)
const userGender = SQLite.openDatabase("userGender.db");
//Database for NRIC
const userNRIC = SQLite.openDatabase("userNRIC.db");

var week1;
var week2;
var week3;
var week4;
var week5;
var week6;
var week7;
var week8;
var week9;
var week10;
var week11;
var week12;

let weeks = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12];

let initDate = [];

let nricCheck = [];
let nameCheck = [];
let checker = [];

// function restNRIC() {
//   userNRIC.transaction((tx) => {
//     tx.executeSql(`DROP TABLE userNRIC`)
//   });
// };
// restNRIC();
// function rest() {
//   db.transaction((tx) => {
//     tx.executeSql(`DROP TABLE items`)
//   });
// };

// function rest1() {
//   db1.transaction((tx1) => {
//     tx1.executeSql(`DROP TABLE iitems`)
//   });
// };

// rest();
// rest1();

//To store user NRIC
var nricUser = [];
nricAsyncCall();
async function nricAsync() {
  var total = "";
  return new Promise((resolve, reject) => {
    userNRIC.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM userNRIC ORDER BY id DESC LIMIT ?`,
        ["1"],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
            total = results1.rows.item(0).value;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function nricAsyncCall() {
  nricAsync().then((val) => nricUser = val);
}
// var xx = [];
// var xxx = [];
// var xxxx = [];

var weekOneList = [];
var weekTwoList = [];
var weekThreeList = [];
var weekFourList = [];
var weekFiveList = [];
var weekSixList = [];
var weekSevenList = [];
var weekEightList = [];
var weekNineList = [];
var weekTenList = [];
var weekTwelveList = [];
var weekElevenList = [];
weekOneCall();
weekTwoCall();
weekThreeCall();
weekFourCall();
weekFiveCall();
weekSixCall();
weekSevenCall();
weekEightCall();
weekNineCall();
weekTenCall();
weekElevenCall();
weekTwelveCall();

var weekOneExtensionList = [];
var weekTwoExtensionList = [];
var weekThreeExtensionList = [];
var weekFourExtensionList = [];
var weekFiveExtensionList = [];
var weekSixExtensionList = [];
var weekSevenExtensionList = [];
var weekEightExtensionList = [];
var weekNineExtensionList = [];
var weekTenExtensionList = [];
var weekTwelveExtensionList = [];
var weekElevenExtensionList = [];
weekOneExtensionCall();
weekTwoExtensionCall();
weekThreeExtensionCall();
weekFourExtensionCall();
weekFiveExtensionCall();
weekSixExtensionCall();
weekSevenExtensionCall();
weekEightExtensionCall();
weekNineExtensionCall();
weekTenExtensionCall();
weekElevenExtensionCall();
weekTwelveExtensionCall();


//////////////////////////////////////////////////////////
////////////MAIN CONTROLLER & NAVIGATION//////////////////
//////////////////////////////////////////////////////////
const Goniometer_App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2B6D6A",
            height: 90,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 25,
            textAlign: "center",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "HOME" }}
        />
        <Stack.Screen
          name="Goniometer"
          component={Goniometer}
          options={{ title: "MEASUREMENT" }}
        />
        <Stack.Screen
          name="FormSG"
          component={FormSG}
          options={{ title: "FORMSG" }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ title: "Contact Us" }}
        />
        <Stack.Screen
          name="CalenderDataPage"
          component={CalenderDataPage}
          options={{ title: "HISTORY" }}
        />
        <Stack.Screen
          name="GuidePage"
          component={GuidePage}
          options={{ title: "GUIDE" }}
        />
        <Stack.Screen
          name="Graph"
          component={Graph}
          options={{ title: "HISTORY CHART" }}
        />
        <Stack.Screen
          name="SitStand"
          component={SitStand}
          options={{ title: "SIT TO STAND" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//////////////////////////////////////////////////////////
/////////////////////GUIDE PAGE///////////////////////////
//////////////////////////////////////////////////////////

const GuidePage = ({ navigation, route }) => {

  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View>
      <Text>
      </Text>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        {" "}
          Exercise Video
      </Text>

      <Text>
      </Text>

      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"yL5maSn3M-g"}
        onChangeState={onStateChange} />
    </View>
  );
};

//////////////////////////////////////////////////////////
/////////////////////STOP WATCH PAGE//////////////////////
//////////////////////////////////////////////////////////

const SitStand = ({ navigation, route }) => {

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  return (
    <SafeAreaView style={stylesSitStand.container}>
      <View style={stylesSitStand.container}>

        <View style={stylesSitStand.sectionStyle}>
          <Stopwatch
            laps
            hrs={false}
            msecs={false}
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              //console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <Text style={stylesSitStand.buttonText}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={stylesSitStand.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>

      </View>
    </SafeAreaView>
  );
};

//////////////////////////////////////////////////////////
////////////////////HISTORY PAGE//////////////////////////
//////////////////////////////////////////////////////////

const CalenderDataPage = ({ navigation, route }) => {
  const [a, b] = useState({});
  const [x, y] = useState({});
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          db.transaction((tx) => {
            tx.executeSql(
              // `select * from userInfo ORDER BY id DESC LIMIT ?`,
              `SELECT * FROM items WHERE value LIKE ? ORDER BY id DESC LIMIT 1`,
              [strTime + "%"],
              (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                  console.log(results.rows.item(0).value);
                  var ans = results.rows.item(0).value;
                  var g = ans.substr(-3);
                  db1.transaction((tx1) => {
                    tx1.executeSql(
                      `SELECT * FROM iitems WHERE value LIKE ? ORDER BY id DESC LIMIT 1`,
                      [strTime + "%"],
                      (tx1, results1) => {
                        var len1 = results1.rows.length;
                        if (len1 > 0) {
                          console.log(results1.rows.item(0).value);
                          var ans1 = results1.rows.item(0).value;
                          var h = ans1.substr(-3);
                          items[strTime].push({
                            dat: strTime + " ",
                            name: g + "°",
                            name1: + h + "°",
                            height: Math.max(
                              50,
                              Math.floor(Math.random() * 150)
                            ),
                          });
                          b(results.rows.item(0));
                          y(results1.rows.item(0));
                        }
                      }
                    );
                  });
                }
              }
            );
          });
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const renderItem = (x) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                Date: {x.dat}
                {"\n"}
                {"\n"}
                Flexion: {x.name} {"\n"}
                {"\n"}
                Extension: {x.name1}
              </Text>
              {/* <Avatar.Text label="DONE" /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().utcOffset("+08:00").format("YYYY-MM-DD")}
        renderItem={renderItem}
      />
    </View>
  );
};

//////////////////////////////////////////////////////////
//////////////////MAIN NAVIGATION PAGE////////////////////
//////////////////////////////////////////////////////////
const HomeScreen = ({ navigation, route }) => {
  const state = {
    data: [
      {
        id: 1,
        title: "History",
        link: "CalenderDataPage",
        image: "https://img.icons8.com/dotty/80/000000/activity-history.png",
      },

      {
        id: 2,
        title: "Guide",
        link: "GuidePage",
        image: "https://img.icons8.com/ios/50/000000/city-guide.png",
      },
      {
        id: 3,
        title: "Contact Us",
        link: "Contact",
        image: "https://img.icons8.com/ios/50/000000/phone-disconnected.png",
      },
      // {
      //   id: 4,
      //   title: "Admin",
      //   link: "UserData",
      //   image: "https://img.icons8.com/windows/64/000000/microsoft-admin.png",
      // },
      {
        id: 5,
        title: "Graph",
        link: "Graph",
        image: "https://img.icons8.com/material-rounded/64/000000/graph.png",
      },
      {
        id: 6,
        title: "Sit-Stand",
        link: "SitStand",
        image: "https://img.icons8.com/ios/50/000000/waiting-room.png",
      },
    ],
  };


  const clickEventListener = (item) => {
    navigation.navigate(item.link, { name: item.link });
  };
  const clickEventListenerMeasurement = (item) => {
    navigation.navigate(item, { name: item });
  };
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [forceUpdate1, forceUpdateId1] = useForceUpdate();

  const [selectedValue, setSelectedValue] = useState("2");
  const [selectedGenderValue, setSelectedGenderValue] = useState("Male");
  const [text, onChangeText] = React.useState(null);
  //user week data
  React.useEffect(() => {
    userInfo.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userInfo (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  //user gender data
  React.useEffect(() => {
    userGender.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userGender (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  //User NRIC data
  React.useEffect(() => {
    userNRIC.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userNRIC (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const add2 = (text) => {
    var text = parseInt(text);
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }

    userInfo.transaction(
      (tx) => {
        tx.executeSql("insert into userInfo (done, value) values (0, ?)", [
          text,
        ]);
        tx.executeSql("select * from userInfo", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };
  const add3 = (text) => {
    var text = text;
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }

    userGender.transaction(
      (tx) => {
        tx.executeSql("insert into userGender (done, value) values (0, ?)", [
          text,
        ]);
        tx.executeSql("select * from userGender", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate1
    );
  };
  const addNRIC = (text) => {
    var text = text;
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }

    userNRIC.transaction(
      (tx) => {
        tx.executeSql("insert into userNRIC (done, value) values (0, ?)", [
          text,
        ]);
        tx.executeSql("select * from userNRIC", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate1
    );
  };
  var dayBefore = new Date();
  dayBefore.setDate(new Date().getDate() - 1);
  const [date, setDate] = useState(dayBefore);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    initDate[0] = currentDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var last = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    // console.log(last);
    var yyyy;
    var mm;
    var dd;
    for (var i = 0; i < 84; i++) {
      var nextDay = new Date(currentDate.getTime() + ((i) * 24 * 60 * 60 * 1000));
      if (nextDay.getMonth().toString().length == 1) {
        var amend = nextDay.getMonth() + 1;
        mm = "0" + amend;
      } else {
        mm = amend;
      }
      if (nextDay.getDate().toString().length == 1) {
        dd = "0" + nextDay.getDate();
      } else {
        dd = nextDay.getDate();
      }
      yyyy = "20" + nextDay.getYear().toString().substring(1, 3);
      var x = yyyy + "-" + mm + "-" + dd;
      weeks[i] = x;
      console.log(weeks[i]);
      yyyy = null;
      mm = null;
      dd = null;
    }
  };

  const submitUserDateAlert = () => {
    if (nricCheck[0] != 1 || nameCheck[0] != 1 || initDate[0] == null) {
      Alert.alert(
        "Please complete all fields!",
        "",
        [
          {
            text: "OK",
            onPress: () => console.log("OK"),
          },
        ]
      );
    } else {
      Alert.alert(
        "Are you sure you want to submit?",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Yes", onPress: () => {
              checker[0] = 1;

              navigation.navigate("Home", {
                name: "Home",
                flex: 1,
              })
            }
          }
        ]
      );
    }
  }


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  if (nricCheck[0] == null || nameCheck[0] == null || checker[0] == null || initDate[0] == null) {
    return (
      <View style={styles.container}>

        <Text></Text>
        {/* <Text style={{ textAlign: "center", fontSize: 40 }}>Admin Setup</Text> */}
        <Text></Text>
        <View style={styles.pickerContainerGender}>
          <Text style={{ textAlign: "center", fontSize: 40 }}>NRIC</Text>
          <Text></Text>
          <TextInput
            placeholder="S0000000N"
            style={inpttext.input}
            onSubmitEditing={(nric) => {
              nricCheck[0] = 1;
              addNRIC(nric.nativeEvent.text);
              onChangeText(nric.nativeEvent.text);
            }}
          />
          <Text></Text>
          <Text></Text>
          <View>
            <Text style={{ textAlign: "center", fontSize: 40 }}>Start Date</Text>
            <Text></Text>
            <View style={styles.pickerContainerDate}>
              <DateTimePicker
                style={{ marginRight: 40 }}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </View>
          </View>
          <Text></Text>
          <Text></Text>
          <Text style={{ textAlign: "center", fontSize: 40 }}>Gender</Text>
        <Text></Text>
        <View>
          <RNPickerSelect
            onValueChange={(itemvalu) => {
              nameCheck[0] = 1;
              add3(itemvalu);
              setSelectedGenderValue(itemvalu);
              console.log(itemvalu);
            }}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select Gender", value: null }}
            items={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            style={stylePicker}
          />
        </View>
        <TouchableOpacity
          onPress={submitUserDateAlert}
          style={styles.NavigateMeasurementAdmin}
        >
          <Text style={styles.TextStyleButtonHomePage}>Confirm</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  } else if (checker[0] == 1) {
    console.log(nricCheck[0] + " " + nameCheck[0]);
    return (
      <View style={pp.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              clickEventListenerMeasurement("Goniometer");
            }}
            style={styles.NavigateMeasurement}
          >
            <Text style={styles.TextStyleButtonHomePage}>MEASUREMENT</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={pp.list}
          contentContainerStyle={pp.listContainer}
          data={state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            // console.log(item.id);
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  style={pp.card}
                  onPress={() => {
                    clickEventListener(item);
                  }}
                >
                  <Image style={pp.cardImage} source={{ uri: item.image }} />
                </TouchableOpacity>

                <View style={pp.cardHeader}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={pp.title}>{item.title}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
};

//////////////////////////////////////////////////////////
//////////////////////GRAPH PAGE//////////////////////////
//////////////////////////////////////////////////////////

//Extension Measurement
async function weekOneExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[0] + "%'";
  var tmr1 = "'" + weeks[1] + "%'";
  var tmr2 = "'" + weeks[2] + "%'";
  var tmr3 = "'" + weeks[3] + "%'";
  var tmr4 = "'" + weeks[4] + "%'";
  var tmr5 = "'" + weeks[5] + "%'";
  var tmr6 = "'" + weeks[6] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          console.log(len1 + "successful retrival of extension");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTwoExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[7] + "%'";
  var tmr1 = "'" + weeks[8] + "%'";
  var tmr2 = "'" + weeks[9] + "%'";
  var tmr3 = "'" + weeks[10] + "%'";
  var tmr4 = "'" + weeks[11] + "%'";
  var tmr5 = "'" + weeks[12] + "%'";
  var tmr6 = "'" + weeks[13] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekThreeExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[14] + "%'";
  var tmr1 = "'" + weeks[15] + "%'";
  var tmr2 = "'" + weeks[16] + "%'";
  var tmr3 = "'" + weeks[17] + "%'";
  var tmr4 = "'" + weeks[18] + "%'";
  var tmr5 = "'" + weeks[19] + "%'";
  var tmr6 = "'" + weeks[20] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekFourExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[21] + "%'";
  var tmr1 = "'" + weeks[22] + "%'";
  var tmr2 = "'" + weeks[23] + "%'";
  var tmr3 = "'" + weeks[24] + "%'";
  var tmr4 = "'" + weeks[25] + "%'";
  var tmr5 = "'" + weeks[26] + "%'";
  var tmr6 = "'" + weeks[27] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekFiveExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[28] + "%'";
  var tmr1 = "'" + weeks[29] + "%'";
  var tmr2 = "'" + weeks[30] + "%'";
  var tmr3 = "'" + weeks[31] + "%'";
  var tmr4 = "'" + weeks[32] + "%'";
  var tmr5 = "'" + weeks[33] + "%'";
  var tmr6 = "'" + weeks[34] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekSixExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[35] + "%'";
  var tmr1 = "'" + weeks[36] + "%'";
  var tmr2 = "'" + weeks[37] + "%'";
  var tmr3 = "'" + weeks[38] + "%'";
  var tmr4 = "'" + weeks[39] + "%'";
  var tmr5 = "'" + weeks[40] + "%'";
  var tmr6 = "'" + weeks[41] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekSevenExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[42] + "%'";
  var tmr1 = "'" + weeks[43] + "%'";
  var tmr2 = "'" + weeks[44] + "%'";
  var tmr3 = "'" + weeks[45] + "%'";
  var tmr4 = "'" + weeks[46] + "%'";
  var tmr5 = "'" + weeks[47] + "%'";
  var tmr6 = "'" + weeks[48] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekEightExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[49] + "%'";
  var tmr1 = "'" + weeks[50] + "%'";
  var tmr2 = "'" + weeks[51] + "%'";
  var tmr3 = "'" + weeks[52] + "%'";
  var tmr4 = "'" + weeks[53] + "%'";
  var tmr5 = "'" + weeks[54] + "%'";
  var tmr6 = "'" + weeks[55] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekNineExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[56] + "%'";
  var tmr1 = "'" + weeks[57] + "%'";
  var tmr2 = "'" + weeks[58] + "%'";
  var tmr3 = "'" + weeks[59] + "%'";
  var tmr4 = "'" + weeks[60] + "%'";
  var tmr5 = "'" + weeks[61] + "%'";
  var tmr6 = "'" + weeks[62] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTenExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[63] + "%'";
  var tmr1 = "'" + weeks[64] + "%'";
  var tmr2 = "'" + weeks[65] + "%'";
  var tmr3 = "'" + weeks[66] + "%'";
  var tmr4 = "'" + weeks[67] + "%'";
  var tmr5 = "'" + weeks[68] + "%'";
  var tmr6 = "'" + weeks[69] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekElevenExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[70] + "%'";
  var tmr1 = "'" + weeks[71] + "%'";
  var tmr2 = "'" + weeks[72] + "%'";
  var tmr3 = "'" + weeks[73] + "%'";
  var tmr4 = "'" + weeks[74] + "%'";
  var tmr5 = "'" + weeks[75] + "%'";
  var tmr6 = "'" + weeks[76] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTwelveExtension() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[77] + "%'";
  var tmr1 = "'" + weeks[78] + "%'";
  var tmr2 = "'" + weeks[79] + "%'";
  var tmr3 = "'" + weeks[80] + "%'";
  var tmr4 = "'" + weeks[81] + "%'";
  var tmr5 = "'" + weeks[82] + "%'";
  var tmr6 = "'" + weeks[83] + "%'";
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekOneExtensionCall() {
  weekOneExtension().then((val) => weekOneExtensionList = val);
}
async function weekTwoExtensionCall() {
  weekTwoExtension().then((val) => weekTwoExtensionList = val);
}
async function weekThreeExtensionCall() {
  weekThreeExtension().then((val) => weekThreeExtensionList = val);
}
async function weekFourExtensionCall() {
  weekFourExtension().then((val) => weekFourExtensionList = val);
}
async function weekFiveExtensionCall() {
  weekFiveExtension().then((val) => weekFiveExtensionList = val);
}
async function weekSixExtensionCall() {
  weekSixExtension().then((val) => weekSixExtensionList = val);
}
async function weekSevenExtensionCall() {
  weekSevenExtension().then((val) => weekSevenExtensionList = val);
}
async function weekEightExtensionCall() {
  weekEightExtension().then((val) => weekEightExtensionList = val);
}
async function weekNineExtensionCall() {
  weekNineExtension().then((val) => weekNineExtensionList = val);
}
async function weekTenExtensionCall() {
  weekTenExtension().then((val) => weekTenExtensionList = val);
}
async function weekElevenExtensionCall() {
  weekElevenExtension().then((val) => weekElevenExtensionList = val);
}
async function weekTwelveExtensionCall() {
  weekTwelveExtension().then((val) => weekTwelveExtensionList = val);
}
//Flexion Measurement
async function weekOne() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[0] + "%'";
  var tmr1 = "'" + weeks[1] + "%'";
  var tmr2 = "'" + weeks[2] + "%'";
  var tmr3 = "'" + weeks[3] + "%'";
  var tmr4 = "'" + weeks[4] + "%'";
  var tmr5 = "'" + weeks[5] + "%'";
  var tmr6 = "'" + weeks[6] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTwo() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[7] + "%'";
  var tmr1 = "'" + weeks[8] + "%'";
  var tmr2 = "'" + weeks[9] + "%'";
  var tmr3 = "'" + weeks[10] + "%'";
  var tmr4 = "'" + weeks[11] + "%'";
  var tmr5 = "'" + weeks[12] + "%'";
  var tmr6 = "'" + weeks[13] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekThree() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[14] + "%'";
  var tmr1 = "'" + weeks[15] + "%'";
  var tmr2 = "'" + weeks[16] + "%'";
  var tmr3 = "'" + weeks[17] + "%'";
  var tmr4 = "'" + weeks[18] + "%'";
  var tmr5 = "'" + weeks[19] + "%'";
  var tmr6 = "'" + weeks[20] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekFour() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[21] + "%'";
  var tmr1 = "'" + weeks[22] + "%'";
  var tmr2 = "'" + weeks[23] + "%'";
  var tmr3 = "'" + weeks[24] + "%'";
  var tmr4 = "'" + weeks[25] + "%'";
  var tmr5 = "'" + weeks[26] + "%'";
  var tmr6 = "'" + weeks[27] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekFive() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[28] + "%'";
  var tmr1 = "'" + weeks[29] + "%'";
  var tmr2 = "'" + weeks[30] + "%'";
  var tmr3 = "'" + weeks[31] + "%'";
  var tmr4 = "'" + weeks[32] + "%'";
  var tmr5 = "'" + weeks[33] + "%'";
  var tmr6 = "'" + weeks[34] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekSix() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[35] + "%'";
  var tmr1 = "'" + weeks[36] + "%'";
  var tmr2 = "'" + weeks[37] + "%'";
  var tmr3 = "'" + weeks[38] + "%'";
  var tmr4 = "'" + weeks[39] + "%'";
  var tmr5 = "'" + weeks[40] + "%'";
  var tmr6 = "'" + weeks[41] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekSeven() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[42] + "%'";
  var tmr1 = "'" + weeks[43] + "%'";
  var tmr2 = "'" + weeks[44] + "%'";
  var tmr3 = "'" + weeks[45] + "%'";
  var tmr4 = "'" + weeks[46] + "%'";
  var tmr5 = "'" + weeks[47] + "%'";
  var tmr6 = "'" + weeks[48] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekEight() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[49] + "%'";
  var tmr1 = "'" + weeks[50] + "%'";
  var tmr2 = "'" + weeks[51] + "%'";
  var tmr3 = "'" + weeks[52] + "%'";
  var tmr4 = "'" + weeks[53] + "%'";
  var tmr5 = "'" + weeks[54] + "%'";
  var tmr6 = "'" + weeks[55] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekNine() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[56] + "%'";
  var tmr1 = "'" + weeks[57] + "%'";
  var tmr2 = "'" + weeks[58] + "%'";
  var tmr3 = "'" + weeks[59] + "%'";
  var tmr4 = "'" + weeks[60] + "%'";
  var tmr5 = "'" + weeks[61] + "%'";
  var tmr6 = "'" + weeks[62] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTen() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[63] + "%'";
  var tmr1 = "'" + weeks[64] + "%'";
  var tmr2 = "'" + weeks[65] + "%'";
  var tmr3 = "'" + weeks[66] + "%'";
  var tmr4 = "'" + weeks[67] + "%'";
  var tmr5 = "'" + weeks[68] + "%'";
  var tmr6 = "'" + weeks[69] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekEleven() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[70] + "%'";
  var tmr1 = "'" + weeks[71] + "%'";
  var tmr2 = "'" + weeks[72] + "%'";
  var tmr3 = "'" + weeks[73] + "%'";
  var tmr4 = "'" + weeks[74] + "%'";
  var tmr5 = "'" + weeks[75] + "%'";
  var tmr6 = "'" + weeks[76] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekTwelve() {
  var total = 0;
  var finals = 0;
  var today = "'" + weeks[77] + "%'";
  var tmr1 = "'" + weeks[78] + "%'";
  var tmr2 = "'" + weeks[79] + "%'";
  var tmr3 = "'" + weeks[80] + "%'";
  var tmr4 = "'" + weeks[81] + "%'";
  var tmr5 = "'" + weeks[82] + "%'";
  var tmr6 = "'" + weeks[83] + "%'";
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ` + tmr1 + ` or value LIKE ` + tmr2 + ` or value LIKE ` + tmr3 + ` or value LIKE ` + tmr4 + ` or value LIKE ` + tmr5 + ` or value LIKE ` + today + ` or value LIKE ` + tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          // console.log(len1 + "successful");
          if (len1 > 0) {
            // total1 = total1 + parseInt((results1.rows.item(0).value).substr(-3));
            // count1 = count1 + 1;
            // avr1 = total1/count1;
            // console.log(avr1);
            // console.log(total1);
            for (var x = 0; x < len1; x++) {
              var ans1 = results1.rows.item(x).value;
              var h = ans1.substr(-3);
              var num = parseInt(h);
              total = total + num;
            }
            finals = total / len1;
            total = finals;
            var data = [];
            data.push(total);
            resolve(data);
            return data;
          }
        });
    });
  });
}
async function weekOneCall() {
  weekOne().then((val) => weekOneList = val);
}
async function weekTwoCall() {
  weekTwo().then((val) => weekTwoList = val);
}
async function weekThreeCall() {
  weekThree().then((val) => weekThreeList = val);
}
async function weekFourCall() {
  weekFour().then((val) => weekFourList = val);
}
async function weekFiveCall() {
  weekFive().then((val) => weekFiveList = val);
}
async function weekSixCall() {
  weekSix().then((val) => weekSixList = val);
}
async function weekSevenCall() {
  weekSeven().then((val) => weekSevenList = val);
}
async function weekEightCall() {
  weekEight().then((val) => weekEightList = val);
}
async function weekNineCall() {
  weekNine().then((val) => weekNineList = val);
}
async function weekTenCall() {
  weekTen().then((val) => weekTenList = val);
}
async function weekElevenCall() {
  weekEleven().then((val) => weekElevenList = val);
}
async function weekTwelveCall() {
  weekTwelve().then((val) => weekTwelveList = val);
}




function rr() {
  console.log(weeks[0]);
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text></Text>
      <Text style={{ backgroundColor: "white", textAlign: "center", fontSize: 40 }}>Knee Extension</Text>
      <Text>

      </Text>
      <LineChart
        data={{
          labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11", "w12"],
          datasets: [
            {
              data: [
                weekOneExtensionList[0] ? weekOneExtensionList[0] : 0,
                weekTwoExtensionList[0] ? weekTwoExtensionList[0] : 0,
                weekThreeExtensionList[0] ? weekThreeExtensionList[0] : 0,
                weekFourExtensionList[0] ? weekFourExtensionList[0] : 0,
                weekFiveExtensionList[0] ? weekFiveExtensionList[0] : 0,
                weekSixExtensionList[0] ? weekSixExtensionList[0] : 0,
                weekSevenExtensionList[0] ? weekSevenExtensionList[0] : 0,
                weekEightExtensionList[0] ? weekEightExtensionList[0] : 0,
                weekNineExtensionList[0] ? weekNineExtensionList[0] : 0,
                weekTenExtensionList[0] ? weekTenExtensionList[0] : 0,
                weekElevenExtensionList[0] ? weekElevenExtensionList[0] : 0,
                weekTwelveExtensionList[0] ? weekTwelveExtensionList[0] : 0],
            }
          ],
          // legend: ["Knee Extension"]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={850}
        yAxisLabel=""
        yAxisSuffix="°"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: () => `rgba(62, 107, 106)`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 2,
          },
          propsForDots: {
            r: "8",
            strokeWidth: "2",
            stroke: "#9cd9d7"
          }
        }}
      // bezier
      // style={{
      //   marginVertical: 8,
      //   borderRadius: 16
      // }}
      />
    </View>
  )
}

function rrr() {
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text style={{ backgroundColor: "white", textAlign: "center", fontSize: 40 }}>Knee Flexion</Text>
      <Text>
      </Text>
      <LineChart
        data={{
          labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11", "w12"],
          datasets: [
            {
              // data: [60, xx[0],0,0,0,0,0,0,0,0,0],
              data: [
                weekOneList[0] ? weekOneList[0] : 0,
                weekTwoList[0] ? weekTwoList[0] : 0,
                weekThreeList[0] ? weekThreeList[0] : 0,
                weekFourList[0] ? weekFourList[0] : 0,
                weekFiveList[0] ? weekFiveList[0] : 0,
                weekSixList[0] ? weekSixList[0] : 0,
                weekSevenList[0] ? weekSevenList[0] : 0,
                weekEightList[0] ? weekEightList[0] : 0,
                weekNineList[0] ? weekNineList[0] : 0,
                weekTenList[0] ? weekTenList[0] : 0,
                weekElevenList[0] ? weekElevenList[0] : 0,
                weekTwelveList[0] ? weekTwelveList[0] : 0],
              strokeWidth: 4,

            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={850}
        yAxisLabel=""
        yAxisSuffix="°"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: () => `rgba(62, 107, 106)`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 2,
          },
          propsForDots: {
            r: "8",
            strokeWidth: "2",
            stroke: "#9cd9d7"
          }
        }}
      // bezier
      // style={{
      //   marginVertical: 0,
      //   borderRadius: 16
      // }}
      />
    </View>
  )
}

const Graph = ({ navigation, route }) => {
  // console.log(xx);
  const [selectedLanguage, setSelectedLanguage] = useState();

  // console.log(yy);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <ScrollView>
      {/* {selectedLanguage="extension"} */}

      <View style={{ backgroundColor: "white" }}>
        <Text>

        </Text>

        {/*<TouchableOpacity 
      style={styles.SubmitButtonStyle} 
      onPress={()=>setSelectedLanguage("flexion")}> 
      <Text style={styles.TextStyleButton}>Flexion</Text>
      </TouchableOpacity>
      
      <Text>
      </Text>

      <TouchableOpacity 
      style={styles.SubmitButtonStyle} 
      onPress={()=>setSelectedLanguage("extension")}> 
      <Text style={styles.TextStyleButton}>Extension</Text>
      </TouchableOpacity>*/}


        <ButtonToggleGroup
          highlightBackgroundColor={'blue'}
          highlightTextColor={'white'}
          inactiveBackgroundColor={'transparent'}
          inactiveTextColor={'grey'}
          style={{}}
          textStyle={{ fontSize: 30 }}
          values={['Flexion', 'Extension']}
          onSelect={val => setSelectedLanguage(val.toLowerCase())}
        />

      </View>
      {/* <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch,
          () =>
          setSelectedLanguage("extension")}
        value={isEnabled}
      />
    </View> */}
      {/* <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Knee Extension" value="extension" />
        <Picker.Item label="Knee Flexion" value="flexion" />
      </Picker> */}
      <View>
        {selectedLanguage == 'extension' ? rr() : rrr()}
      </View>
      {/* <Text style={{ textAlign: "center", fontSize: 40 }}>Knee Extension</Text>
      <LineChart
        data={{
          labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11"],
          datasets: [
            {
              data: [50, xx[0], 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          // legend: ["Knee Extension"]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel=""
        yAxisSuffix="°"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#9cd9d7",
          backgroundGradientTo: "#9cd9d7",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#67f5f0"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Text>

      </Text>
      <Text style={{ textAlign: "center", fontSize: 40 }}>Knee Flexion</Text>
      <LineChart
        data={{
          labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11"],
          datasets: [
            {
              // data: [60, xx[0],0,0,0,0,0,0,0,0,0],
              data: [98, 99, 100, 103, 105, 110, 113, 115, 116, 117, 117],
              strokeWidth: 4,

            },
            {
              // data: [60, xx[0],0,0,0,0,0,0,0,0,0],
              data: [100, 102, 104, 105, 105, 106, 104, 105, 105, 106, 106],
              strokeWidth: 4,
              color: (opacity = 1) => `rgba(255,0,0,${opacity})`

            }
          ],
          legend: ['yolo', 'yolo'],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel=""
        yAxisSuffix="°"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#1d807b",
          backgroundGradientTo: "#1d807b",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: () => `rgba(255, 255, 255)`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 2,
          },
          propsForDots: {
            r: "8",
            strokeWidth: "4",
            stroke: "#9cd9d7"
          }
        }}

      /> */}
    </ScrollView>
  );
};

const Contact = ({ navigation, route }) => {

  return (
    <View style={styles.container}>

      <Image source={require('./sgh-logo.png')} />
      <Text>
      </Text>
      <Text>
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>General Enquiries: {"\n"}+65 6222 3322</Text>
      <Text>
      </Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>Address: {"\n"}Outram Road Singapore 169608

</Text>
    </View>
  );
};



//FormSG Page
const FormSG = ({ navigation, route }) => {

  weekOneCall();
  weekTwoCall();
  weekThreeCall();
  weekFourCall();
  weekFiveCall();
  weekSixCall();
  weekSevenCall();
  weekEightCall();
  weekNineCall();
  weekTenCall();
  weekElevenCall();
  weekTwelveCall();
  weekOneExtensionCall();
  weekTwoExtensionCall();
  weekThreeExtensionCall();
  weekFourExtensionCall();
  weekFiveExtensionCall();
  weekSixExtensionCall();
  weekSevenExtensionCall();
  weekEightExtensionCall();
  weekNineExtensionCall();
  weekTenExtensionCall();
  weekElevenExtensionCall();
  weekTwelveExtensionCall();
  nricAsyncCall();

  const { flexData } = (route.params);
  const { extenData } = (route.params);
  // console.log(flexData);

  const x = route.params.paramKey;
  const flexStr = "Flexion: " + x;
  const extenStr = "Extension: " + x;
  const nricVal = String(nricUser[0]);
  // console.log(nricVal);
  const flexx = parseInt(flexData);
  // console.log(flexx);
  
  const exxten=parseInt(extenData); 

  // const runFirst = `setTimeout(function() {
  //   document.getElementById('603c3ccc399059001247a1ee').value = '${nricVal}';
  //   document.getElementById("603c3ccc399059001247a1ee").className = "input-custom input-large ng-not-empty ng-dirty ng-valid-parse ng-valid-required ng-touched ng-valid ng-valid-nric-validator";

  //   document.getElementById('603c3d41526b9e00127a488f').value = '${flexx}';
  //   document.getElementById("603c3d41526b9e00127a488f").className = "input-custom input-large ng-valid-pattern ng-valid-minlength ng-valid-maxlength ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required ng-touched";

  //   document.getElementById('603c3d5a7d837800126d12f7').value = '${exxten}';
  //   document.getElementById("603c3d5a7d837800126d12f7").className = "input-custom input-large ng-valid-pattern ng-valid-minlength ng-valid-maxlength ng-touched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required";

  // }, 200)`;

  const runFirst = `setTimeout(function() {
    document.getElementById("603c3ccc399059001247a1ee").className = "";
    document.getElementById("603c3d41526b9e00127a488f").className = "";
    document.getElementById("603c3d5a7d837800126d12f7").className = "";

    document.getElementById('603c3ccc399059001247a1ee').value = '${nricVal}';
    document.getElementById('603c3ccc399059001247a1ee').dispatchEvent(new Event("input"));
    

    document.getElementById('603c3d41526b9e00127a488f').value = '${flexx}';
    document.getElementById('603c3d41526b9e00127a488f').dispatchEvent(new Event("input"));

    

    document.getElementById('603c3d5a7d837800126d12f7').value = '${exxten}';
    document.getElementById('603c3d5a7d837800126d12f7').dispatchEvent(new Event("input"));


  }, 1000)`;

  // const runFirst = `setTimeout(function() {
  //   document.getElementById('603c3ccc399059001247a1ee').value = '${nricVal}';
  //   document.getElementById("603c3ccc399059001247a1ee").className = "input-custom input-large ng-not-empty ng-dirty ng-valid-parse ng-valid-required ng-touched ng-valid ng-valid-nric-validator";
  //   document.getElementById("603c3ccc399059001247a1ee").setAttribute("aria-invalid", "false");

  //   +document.getElementById('603c3d41526b9e00127a488f').value = '23';
  //   document.getElementById("603c3d41526b9e00127a488f").className = "input-custom input-large ng-valid-pattern ng-valid-minlength ng-valid-maxlength ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required ng-touched";
  //   document.getElementById("603c3d41526b9e00127a488f").setAttribute("aria-invalid", "false");

  //   +document.getElementById('603c3d5a7d837800126d12f7').value = '${exxten}';
  //   document.getElementById("603c3d5a7d837800126d12f7").className = "input-custom input-large ng-valid-pattern ng-valid-minlength ng-valid-maxlength ng-touched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required";
  //   document.getElementById("603c3d5a7d837800126d12f7").setAttribute("aria-invalid", "false");

  // }, 200)`;

  return (

    <WebView
      javaScriptEnabled={true}
      source={{ uri: "https://form.gov.sg/#!/603c3ca2b3f2b10012a03bc4" }}
      onMessage={(event) => { }}
      injectedJavaScript={runFirst}
      style={{ flex: 1 }}
      javaScriptEnabled

    />

  );
};


//////////////////////////////////////////////////////////
////////////////////MEASUREMENT PAGE//////////////////////
//////////////////////////////////////////////////////////
const Goniometer = ({ navigation, route }) => {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }

  function getDegrees(n) {
    if (!n) {
      return 0;
    }
    var pitchraw2 = Math.abs(radians_to_degrees(n));
    var pitchtrig = Math.acos(Math.sin(n) / 1.2);
    var pitch = Math.round(90 + pitchraw2 - radians_to_degrees(pitchtrig));

    return pitch;
  }

  function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
  }

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  React.useEffect(() => {
    db1.transaction((tx) => {
      tx.executeSql(
        "create table if not exists iitems (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const add = (text) => {
    var text = parseInt(text);
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [
          moment().utcOffset("+08:00").format("YYYY-MM-DD") +
          " Flexion:    " +
          text,
        ]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };
  const add1 = (text) => {
    var text = parseInt(text);
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }

    db1.transaction(
      (tx) => {
        tx.executeSql("insert into iitems (done, value) values (0, ?)", [
          moment().utcOffset("+08:00").format("YYYY-MM-DD") +
          " Extension:    " +
          text,
        ]);
        tx.executeSql("select * from iitems", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };
  const [data, setData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(({ rotation }) => {
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
  var currDate = new Date();
  var timeDiff;
  if (initDate.length != 0) {
    timeDiff = currDate.getTime() - initDate[0].getTime();
  } else {
    timeDiff = 0;
  }
  var dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  // console.log(dayDiff);
  ///////////////////////////////////////////////////////////////////////
  //Below portion is for the Conditional Rendering Based on the Angle/////
  //////////////////////////////////////////////////////////////////////
  //no week/gender function
  function noGenderWeek(n) {
    if (selectedGenderValue === "" || selectedValue === "") {
      return true;
    }
    return false;
  }
  //green function to indicate above 75th Percentile
  function green(n) {
    if (selectedGenderValue === "Male") {
      if (
        (n >= 112 && dayDiff <= 14) ||
        (n >= 115 && dayDiff > 14 & dayDiff <= 28) ||
        (n >= 117 && dayDiff > 28 & dayDiff <= 42) ||
        (n >= 120 && dayDiff > 42 & dayDiff <= 56) ||
        (n >= 121 && dayDiff > 56 & dayDiff <= 70) ||
        (n >= 123 && dayDiff > 70 & dayDiff <= 84)
        // (n >= 124 && selectedValue === "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n >= 105 && dayDiff <= 14) ||
        (n >= 110 && dayDiff > 14 & dayDiff <= 28) ||
        (n >= 115 && dayDiff > 28 & dayDiff <= 42) ||
        (n >= 117 && dayDiff > 42 & dayDiff <= 56) ||
        (n >= 118 && dayDiff > 56 & dayDiff <= 70) ||
        (n >= 120 && dayDiff > 70 & dayDiff <= 84)
        // (n >= 120 && selectedValue === "14")
      ) {
        return true;
      }
    }

    return false;
  }

  //blue function to decide if 75th to 50th percentile
  function blue(n) {
    if (selectedGenderValue === "Male") {
      if (
        (n < 112 && n >= 101 && dayDiff <= 14) ||
        (n < 115 && n >= 106 && dayDiff > 14 & dayDiff <= 28) ||
        (n < 117 && n >= 110 && dayDiff > 28 & dayDiff <= 42) ||
        (n < 120 && n >= 113 && dayDiff > 42 & dayDiff <= 56) ||
        (n < 121 && n >= 115 && dayDiff > 56 & dayDiff <= 70) ||
        (n < 123 && n >= 117 && dayDiff > 70 & dayDiff <= 84)
        // (n < 124 && n >= 118 && "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n < 105 && n >= 95 && dayDiff <= 14) ||
        (n < 110 && n >= 102 && dayDiff > 14 & dayDiff <= 28) ||
        (n < 115 && n >= 106 && dayDiff > 28 & dayDiff <= 42) ||
        (n < 117 && n >= 109 && dayDiff > 42 & dayDiff <= 56) ||
        (n < 118 && n >= 110 && dayDiff > 56 & dayDiff <= 70) ||
        (n < 120 && n >= 110 && dayDiff > 70 & dayDiff <= 84)
        // (n < 120 && n >= 110 && "14")
      ) {
        return true;
      }
    }

    return false;
  }

  //red function to decide if 50th to 25th percentile
  function red(n) {
    if (selectedGenderValue === "Male") {
      if (
        (n > 90 && n < 101 && dayDiff <= 14) ||
        (n > 96 && n < 106 && dayDiff > 14 & dayDiff <= 28) ||
        (n > 102 && n < 110 && dayDiff > 28 & dayDiff <= 42) ||
        (n > 105 && n < 113 && dayDiff > 42 & dayDiff <= 56) ||
        (n > 106 && n < 115 && dayDiff > 56 & dayDiff <= 70) ||
        (n > 107 && n < 117 && dayDiff > 70 & dayDiff <= 84)
        // (n > 108 && n < 118 && "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n > 88 && n < 95 && dayDiff <= 14) ||
        (n > 93 && n < 102 && dayDiff > 14 & dayDiff <= 28) ||
        (n > 96 && n < 106 && dayDiff > 28 & dayDiff <= 42) ||
        (n > 99 && n < 109 && dayDiff > 42 & dayDiff <= 56) ||
        (n > 101 && n < 110 && dayDiff > 56 & dayDiff <= 70) ||
        (n > 103 && n < 110 && dayDiff > 70 & dayDiff <= 84)
        // (n > 104 && n < 110 && "14")
      ) {
        return true;
      }
    }

    return false;
  }

  //red function to decide if 25th percentile and below
  function belowRed(n) {
    if (selectedGenderValue === "Male") {
      if (
        (n <= 90 && dayDiff <= 14) ||
        (n <= 96 && dayDiff > 14 & dayDiff <= 28) ||
        (n <= 102 && dayDiff > 28 & dayDiff <= 42) ||
        (n <= 105 && dayDiff > 42 & dayDiff <= 56) ||
        (n <= 106 && dayDiff > 56 & dayDiff <= 70) ||
        (n <= 107 && dayDiff > 70 & dayDiff <= 84)
        // (n <= 108 && "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n <= 88 && dayDiff <= 14) ||
        (n <= 93 && dayDiff > 14 & dayDiff <= 28) ||
        (n <= 96 && dayDiff > 28 & dayDiff <= 42) ||
        (n <= 99 && dayDiff > 42 & dayDiff <= 56) ||
        (n <= 101 && dayDiff > 56 & dayDiff <= 70) ||
        (n <= 103 && dayDiff > 70 & dayDiff <= 84)
        // (n <= 104 && "14")
      ) {
        return true;
      }
    }

    return false;
  }

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedGenderValue, setSelectedGenderValue] = useState(null);
  const [extensionDegree, setExtensionDegree] = useState("0");
  const [flexionDegree, setFlexionDegree] = useState("0");
  const [items, setItems] = useState({});

  function displayAngle() {
    userInfo.transaction((tx) => {
      tx.executeSql(
        `select * from userInfo ORDER BY id DESC LIMIT ?`,
        [1],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            userGender.transaction((tx) => {
              tx.executeSql(
                `select * from userGender ORDER BY id DESC LIMIT ?`,
                [1],
                (tx, r) => {
                  var len = r.rows.length;
                  if (len > 0) {
                    //convert string
                    var g = r.rows.item(0).value.toString();
                    console.log("gender: " + g);
                    setSelectedGenderValue(g);
                  }
                }
              );
            });
            //convert to int
            var x = parseInt(results.rows.item(0).value);
            //convert to string
            var y = x.toString();
            console.log("week: " + y);
            setSelectedValue(y);
          } else {
          }
        }
      );
    });
  }
  const [val, setVal] = useState('AboutReact');
  const [vals, setVals] = useState('AboutReacts');

  const submitAlert = () => {
    Alert.alert(
      "Are you sure you want to submit?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => navigation.navigate("FormSG", {
            flexData: val,
            extenData: vals,
            name: "FormSG",
            flex: 1,
          })
        }
      ]
    );
  }
  const revertToAdminAlert = () => {
    Alert.alert(
      "Complete Admin Setup",
      "",
      [

        {
          text: "OK", onPress: () => navigation.navigate("UserData", {
            flexData: val,
            extenData: vals,
            name: "UserData",
            flex: 1,
          })
        }
      ]
    );
  }
  if (initDate[0] == null) {
    return (
      <View>
        <Text></Text>
        <Text style={{ textAlign: "center", fontSize: 60 }}>Please complete admin registration</Text>
        <Text></Text>
        <TouchableOpacity style={styles.SubmitButtonFormStyle}>
          <Text style={styles.TextStyleButton}
            onPress={() =>
              navigation.navigate("UserData", {
              })
            }>Register</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 60 }}>Knee Range: </Text>
          {noGenderWeek(getDegrees(round(beta))) ? (
            <Text style={stylePercentile.textPercentileBlack}>
              {getDegrees(round(beta))}°
            </Text>
          ) : null}
          {green(getDegrees(round(beta))) ? (
            <Text style={stylePercentile.textPercentileGreen}>
              {getDegrees(round(beta))}°
            </Text>
          ) : null}
          {blue(getDegrees(round(beta))) ? (
            <Text style={stylePercentile.textPercentileOrange}>
              {getDegrees(round(beta))}°
            </Text>
          ) : null}
          {red(getDegrees(round(beta))) ? (
            <Text style={stylePercentile.textPercentileOrange}>
              {getDegrees(round(beta))}°
            </Text>
          ) : null}
          {belowRed(getDegrees(round(beta))) ? (
            <Text style={stylePercentile.textPercentileRed}>
              {getDegrees(round(beta))}°
            </Text>
          ) : null}
        </View>
        <View>
          {useEffect(() => {
            displayAngle();
          }, [])}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 35, fontStyle: "italic" }}
          >
            Previous Flexion: {flexionDegree}°
        </Text>

          <Text
            style={{ textAlign: "center", fontSize: 35, fontStyle: "italic" }}
          >
            Previous Extension: {extensionDegree}°
        </Text>
        </View>
        <ScrollView>
          <View style={styles.MainRecordStartStopContainer}>
            <TouchableOpacity
              onPress={subscription ? _unsubscribe : _subscribe}
              style={styles.SubmitButtonStyle}
            >
              <Text style={styles.TextStyleButton}>
                {subscription ? "STOP" : "START"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MainRecordContainer}>
            <TouchableOpacity
              onPress={() => {
                var degr = getDegrees(round(beta));
                add(degr);
                setFlexionDegree(getDegrees(round(beta)));
                // add(getDegrees(round(beta)));
                setVal(degr);
              }}
              style={styles.SubmitButtonRecordStyle}
            >
              <Text style={styles.TextStyleButton}>Record Flexion</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MainRecordContainer}>
            <TouchableOpacity
              onPress={() => {
                var a = getDegrees(round(beta));
                add1(a);
                // add1(getDegrees(round(beta)));
                setExtensionDegree(getDegrees(round(beta)));
                setVals(a);
              }}
              style={styles.SubmitButtonRecordStyle}
            >
              <Text style={styles.TextStyleButton}>Record Extension</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MainRecordContainer}>
            {!(flexionDegree != 0 && extensionDegree != 0) ? (
              <TouchableOpacity style={styles.SubmitButtonFormStyleDisabled}>
                <Text style={styles.TextStyleButton}>Submit FormSG</Text>
              </TouchableOpacity>
            ) : null}

            {flexionDegree != 0 && extensionDegree != 0 ? (
              <TouchableOpacity style={styles.SubmitButtonFormStyle}
                onPress={submitAlert}>
                <Text style={styles.TextStyleButton}>Submit FormSG</Text>

              </TouchableOpacity>
              // <Button
              //   onPress={submitAlert} />

            ) : null}
          </View>

          <View style={styles.MainRecordHistoryContainer}>
            {!(flexionDegree != 0 && extensionDegree != 0) ? (
              <TouchableOpacity style={styles.SubmitButtonHistoryStyleDisabled}>
                <Text style={styles.TextStyleButton}>History</Text>
              </TouchableOpacity>
            ) : null}

            {flexionDegree != 0 && extensionDegree != 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CalenderDataPage", {
                    name: "CalenderDataPage",
                  })
                }
                style={styles.SubmitButtonHistoryStyle}
              >
                <Text style={styles.TextStyleButton}>History</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

////////////////////////////////////////////////////////////////////////////
//////////////////////////STYLESHEET SECTION////////////////////////////////
////////////////////////////////////////////////////////////////////////////

/** Start of style sheet */
const styles = StyleSheet.create({
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  boxx: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 1,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    height: 1,
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center",
  },
  pickerContainerDt: {
    flex: 1,
    height: 1,
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center",
  },
  pickerContainerGender: {
    flex: 1,
    justifyContent: "flex-start",
    height: 1,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 0,
    textAlign: "center",
  },
  pickerContainerDate: {
    // flex: 1,
    // justifyContent: "flex-start",
    // height: 1,
    marginLeft: "33%",
    // marginRight: 40,
    // paddingTop: 0,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  MainRecordStartStopContainer: {
    paddingTop: 20,
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
  },
  MainRecordContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingTop: 8,
  },
  MainRecordHistoryContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
    paddingTop: 8,
  },
  SubmitButtonStyle: {
    // marginLeft: 20,
    // marginRight: 20,
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  NavigateMeasurement: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 100,
    justifyContent: "center",
  },
  NavigateMeasurementAdmin: {
    marginTop: 40,
    backgroundColor: "#2B6D6A",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    height: 100,
    justifyContent: "center",
  },
  SubmitButtonRecordStyle: {
    backgroundColor: "#786B4A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  SubmitButtonHistoryStyle: {
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  SubmitButtonHistoryStyleDisabled: {
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
    opacity: 0.3,
  },
  SubmitButtonFormStyle: {
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  SubmitButtonFormStyleDisabled: {
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
    opacity: 0.3,
  },

  TextStyleButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
  },
  TextStyleButtonHomePage: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
    fontStyle: "italic",
  },
  TextStyleButtonHomePageAdmin: {
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 40,
    fontStyle: "italic",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 20,
    borderWidth: 3,
    borderColor: "grey",
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  youtubeplayer: {
    marginTop: 40,
  },
  guideContent: {
    textAlign: "center",
  },
});
/** End of style sheet */

const a = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin-Bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});

const stylePicker = StyleSheet.create({
  inputIOS: {
    marginTop: 6,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#2B6D6A",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2B6D6A",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },

  inputAndroid: {
    marginTop: 6,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#2B6D6A",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2B6D6A",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },
});

const stylePercentile = StyleSheet.create({
  textPercentileBlack: {
    paddingTop: 20,
    color: "black",
    textAlign: "center",
    fontSize: 120,
    paddingLeft: 20,
  },
  textPercentileGreen: {
    color: "green",
    paddingTop: 20,
    textAlign: "center",
    fontSize: 120,
    paddingLeft: 20,
  },
  textPercentileOrange: {
    textAlign: "center",
    paddingTop: 20,
    color: "#FFA537",
    fontSize: 120,
    paddingLeft: 20,
  },
  textPercentileRed: {
    color: "#FF8C00",
    paddingTop: 20,
    textAlign: "center",
    fontSize: 120,
    paddingLeft: 20,
  },
});

const inpttext = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    marginTop: 6,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#2B6D6A",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2B6D6A",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
})

const pp = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#ABDDDC",
    //flexBasis: '42%',
    width: 150,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 60,
    width: 60,
    alignSelf: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
});
const styless = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
const duh = StyleSheet.create({
  welcome: {
    fontSize: RFValue(24, 580), // second argument is standardScreenHeight(optional),
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: RFPercentage(5),
  },
});

const stylesSitStand = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 60,
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
});

const options = {
  container: {
    backgroundColor: '#2B6D6A',
    padding: 5,
    borderRadius: 5,
    width: 350,
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default Goniometer_App;
