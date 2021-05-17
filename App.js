//  APPLICATION OVERVIEW
//
//  **SEARCH GUIDE**
//  Highlight the page that you need and press
//  cmd + d
//  OR
//  control + d
//  to search for the matching page
//  **END OF SEARCH GUIDE**
//
//  Styling from line 3318 onwards
//
//  Home Screen Page
//    Welcome Page
//        Goniometer Page
//          Goniometer Form SG Page
//        Sit Stand Page
//          Sit Stand Form SG Page
//        Data Page
//          Chart Page
//          Calendar Page
//        Guide Page
//        Contact Us Page
import React, { useState, useEffect, useCallback } from "react";
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
  Platform,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  LogBox,
  Button,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DeviceMotion } from "expo-sensors";
import { WebView } from "react-native-webview";
import * as SQLite from "expo-sqlite";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import { Card } from "react-native-paper";
import { Agenda } from "react-native-calendars";
import { LineChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stopwatch } from "react-native-stopwatch-timer";
import * as Speech from "expo-speech";
LogBox.ignoreAllLogs();
//  Navigation Routing
const Goniometer_App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2B6D6A",
            height: headerHeightSize,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: headerFontSize,
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
          name="Data"
          component={Data}
          options={{ title: "DATA" }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "WELCOME" }}
        />
        <Stack.Screen
          name="Goniometer"
          component={Goniometer}
          options={{ title: "MEASURE" }}
        />
        <Stack.Screen
          name="FormSG"
          component={FormSG}
          options={{ title: "FORM SG" }}
        />
        <Stack.Screen
          name="SitStandFormSG"
          component={SitStandFormSG}
          options={{ title: "FORM SG" }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ title: "CONTACT US" }}
        />
        <Stack.Screen
          name="CalenderDataPage"
          component={CalenderDataPage}
          options={{ title: "CALENDAR" }}
        />
        <Stack.Screen
          name="GuidePage"
          component={GuidePage}
          options={{ title: "GUIDE" }}
        />
        <Stack.Screen
          name="Graph"
          component={Graph}
          options={{ title: "CHART" }}
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

//  Data Page
//  Helps to call data from the goniometer and stopwatch readings before displaying
//  it in calendar / graph format
const Data = ({ navigation, route }) => {
  //these calls is essential to load the data
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
  const directGraph = () => {
    navigation.navigate("Graph", {});
  };
  const directCalendar = () => {
    navigation.navigate("CalenderDataPage", {});
  };
  return (
    <View>
      <TouchableOpacity
        onPress={directGraph}
        style={styles.NavigateMeasurementData}
      >
        <Text style={styles.TextStyleButton}>Chart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={directCalendar}
        style={styles.NavigateMeasurementData}
      >
        <Text style={styles.TextStyleButton}>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

//  Home Screen Page
//  Application will try to retrieve user's NRIC, gender and surgery date from the phone.
//  If there is no data, the application will display the setup page.
//  Else, the application will direct the user to welcome.
//  **IMPORTANT**
//  Initialisation of the user's data is a one time initialisation. If user accidentally
//  types in the wrong info, he/she must reinstall the application.
//  User will be prompted with a confirm alert before submission to prevent this issue from
//  occuring
const HomeScreen = ({ navigation, route }) => {
  countNRICCall();
  countStCall();
  function delay() {
    setTimeout(function () {
      navigation.navigate("Welcome");
    }, 3000);
  }
  delay();
  return (
    <View
      style={styles.container}
      onTouchStart={() => navigation.navigate("Welcome")}
    >
      <Image
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        source={require("./sgh-logo2.png")}
      />
      <Text></Text>
      <Text></Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        Mo-Knee-Tor
      </Text>
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Created by {"\n"} Alif and Ismahfaris {"\n"}
      </Text>
    </View>
  );
};
//  Welcome Page
//  **IMPORTANT**
//  Initialisation of the user's data is a one time initialisation. If user accidentally
//  types in the wrong info, he/she must reinstall the application.
//  User will be prompted with a confirm alert before submission to prevent this issue from
//  occuring
//  Once data is initialised, the application will direct the user to the main page by default
const Welcome = ({ navigation, route }) => {
  setDateForList();
  weekOneExtensionCall();
  weekOneExtensionCall();
  nricAsyncCall();
  const state = {
    data: [
      {
        id: 1,
        title: "Goniometer",
        link: "Goniometer",
        image: "https://img.icons8.com/ios/50/000000/knee-joint.png",
      },
      {
        id: 2,
        title: "Sit-Stand",
        link: "SitStand",
        image: "https://img.icons8.com/ios/50/000000/waiting-room.png",
      },
      {
        id: 3,
        title: "Data",
        link: "Data",
        image: "https://img.icons8.com/dotty/80/000000/activity-history.png",
      },
      {
        id: 4,
        title: "Guide",
        link: "GuidePage",
        image: "https://img.icons8.com/ios/50/000000/city-guide.png",
      },
      {
        id: 5,
        title: "Contact Us",
        link: "Contact",
        image: "https://img.icons8.com/ios/50/000000/phone-disconnected.png",
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

  //user gender data
  React.useEffect(() => {
    userGenderDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userGenderDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  //User NRIC data
  React.useEffect(() => {
    userNRICDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists userNRICDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  //User stopwatch data
  React.useEffect(() => {
    stopWatchDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists stopWatchDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  //User date data
  React.useEffect(() => {
    dateDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists dateDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const add3 = (text) => {
    var text = text;
    if (text === null || text === "") {
      alert("Please select a gender!");
      return false;
    }

    userGenderDataBase.transaction(
      (tx) => {
        tx.executeSql(
          "insert into userGenderDataBase (done, value) values (0, ?)",
          [text]
        );
        tx.executeSql("select * from userGenderDataBase", [], (_, { rows }) =>
          console.log(
            ""
            // JSON.stringify(rows)
          )
        );
      },
      null,
      forceUpdate1
    );
  };
  const addNRIC = (text) => {
    var text = text;
    if (text === null || text === "") {
      alert("Please input NRIC!");
      return false;
    }

    userNRICDataBase.transaction(
      (tx) => {
        tx.executeSql(
          "insert into userNRICDataBase (done, value) values (0, ?)",
          [text]
        );
        tx.executeSql("select * from userNRICDataBase", [], (_, { rows }) =>
          console
            .log
            // JSON.stringify(rows)
            ()
        );
      },
      null,
      forceUpdate1
    );
  };

  const addDate = (text) => {
    var text = text;
    dateDataBase.transaction(
      (tx) => {
        tx.executeSql("insert into dateDataBase (done, value) values (0, ?)", [
          text,
        ]);
        tx.executeSql("select * from dateDataBase", [], (_, { rows }) =>
          console
            .log
            // JSON.stringify(rows)
            ()
        );
      },
      null,
      forceUpdate1
    );
  };
  var dayBefore = new Date();
  dayBefore.setDate(new Date().getDate() - 1);
  const [date, setDate] = useState(dayBefore);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    initDate[0] = currentDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var last = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    var yyyy;
    var mm;
    var dd;
    for (var i = 0; i < 84; i++) {
      var nextDay = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
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
      addDate(x);
      yyyy = null;
      mm = null;
      dd = null;
    }
  };

  const submitUserDateAlert = () => {
    if (nricCheck[0] != 1 || nameCheck[0] != 1 || initDate[0] == null) {
      Alert.alert("Please complete all fields!", "", [
        {
          text: "OK",
        },
      ]);
    } else {
      Alert.alert("Are you sure you want to submit?", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            checker[0] = 1;
            countNRICCall();
            navigation.navigate("Welcome", {
              name: "Welcome",
              flex: 1,
            });
          },
        },
      ]);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  setDateForList();
  if (
    (nricX == null || nricX == 0) &&
    (nricCheck[0] == null ||
      nameCheck[0] == null ||
      checker[0] == null ||
      initDate[0] == null)
  ) {
    // countNRICCall();
    return (
      <View style={styles.container}>
        <Text></Text>

        <View style={styles.pickerContainerGender}>
          <Text style={{ textAlign: "center", fontSize: 40 }}>NRIC</Text>
          <Text></Text>
          {/* <TextInput
          label="NRIC"
          placeholder="S0000000N"
          returnKeyType="done"
          mode="outlined"
          onSubmitEditing={(nric) => {
            nricCheck[0] = 1;
            addNRIC(nric.nativeEvent.text)
            onChangeText(nric.nativeEvent.text);
          }}
        /> */}
          <TextInput
            returnKeyType="done"
            placeholder="S0000000N"
            style={nricInputStyle.input}
            onSubmitEditing={(nric) => {
              nricCheck[0] = 1;
              addNRIC(nric.nativeEvent.text);
              onChangeText(nric.nativeEvent.text);
            }}
          />
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
          <Text></Text>
          <Text></Text>
          <View>
            {/* <Text style={{ textAlign: "center", fontSize: 40 }}>
              Surgery Date
            </Text> */}
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <Text style={{ textAlign: "center", fontSize: 40 }}>
                  Surgery Date
                </Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
            {show && (
              <View style={styles.pickerContainerDate}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={submitUserDateAlert}
            style={styles.NavigateMeasurementAdmin}
          >
            <Text style={styles.TextStyleButtonHomePageAdmin}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (checker[0] == 1 || nricX == 1) {
    return (
      // <View style={welcomePageStyle.container}>
      <FlatList
        style={welcomePageStyle.list}
        contentContainerStyle={welcomePageStyle.listContainer}
        data={state.data}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={welcomePageStyle.card}
                onPress={() => {
                  clickEventListener(item);
                }}
              >
                <Image
                  style={welcomePageStyle.cardImage}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>

              <View style={welcomePageStyle.cardHeader}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Dimensions.get("window").width <= 414 &&
                  Dimensions.get("window").height <= 736 ? (
                    <Text style={welcomePageStyle.titleIp8}>{item.title}</Text>
                  ) : (
                    <Text style={welcomePageStyle.title}>{item.title}</Text>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
      // </View>
    );
  }
};
//  Guide Page
//  Guide videos can be placed here (For future developement)
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
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 40 }}> Exercise Video</Text>
      <Text></Text>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"yL5maSn3M-g"}
        onChangeState={onStateChange}
      />
    </View>
  );
};
//  Sit Stand Page
//  Countdown voice will be activated once the user clicks on the start button.
//  Timer will only run AFTER then countdown voice
//  User will need to press the stop button to stop the stopwatch and submit the
//  readings to SitStandFormSG
//  **IMPORTANT**
//  Bug issue: If the start button is clicked twice, the stopwatch will not work
//  Pending future fix
const SitStand = ({ navigation, route }) => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [forceUpdate1, forceUpdateId1] = useForceUpdate();
  const [timeVal, setVal] = useState("AboutReact");
  var seconds = "";
  var nowTime = 0;
  const doStuff = () => {
    setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);
    var b = nowTime.split(":");
    seconds = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
    seconds = seconds + "." + b[3];
    setVal(seconds);
    count = count + 1;
  };
  const speak = () => {
    var thingToSay;
    if (count == 0 || count % 2 == 0) {
      thingToSay = "3.......... 2......... 1......... Start";
    } else {
      thingToSay = "";
    }
    Speech.speak(thingToSay, {
      onDone: doStuff,
      rate: 0.7,
    });
  };
  const submitAlertStopWatch = () => {
    var a = nowTime.split(":");
    seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    seconds = seconds + "." + a[3];
    setVal(seconds);
    Alert.alert("Are you sure you want to submit?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          stopWatchDataBase.transaction(
            (tx) => {
              tx.executeSql(
                "insert into stopWatchDataBase (done, value) values (0, ?)",
                [
                  moment().utcOffset("+08:00").format("YYYY-MM-DD") +
                    " Timing:    " +
                    seconds.toString(),
                ]
              );
              tx.executeSql(
                "select * from stopWatchDataBase",
                [],
                (_, { rows }) =>
                  console
                    .log
                    // JSON.stringify(rows)
                    ()
              );
            },
            null,
            forceUpdate1
          );
          navigation.navigate("SitStandFormSG", {
            timeData: timeVal,
            name: "SitStandFormSG",
            flex: 1,
          });
          setResetStopwatch(true);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={sitStandPageStyle.container}>
      <View style={sitStandPageStyle.container}>
        <View style={sitStandPageStyle.sectionStyle}>
          <Stopwatch
            laps
            hrs={false}
            msecs={true}
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              nowTime = time;
            }}
          />

          {count % 2 == 0 ? (
            <TouchableHighlight
              style={sitStandPageStyle.buttonStartStopSitToStand}
              onPress={speak}
            >
              <Text style={sitStandPageStyle.buttonText}>
                {!isStopwatchStart ? "START" : "STOP"}
              </Text>
            </TouchableHighlight>
          ) : null}

          {count % 2 != 0 && count == 0 ? <Text></Text> : null}

          <View style={sitStandPageStyle.MainRecordContainer}>
            {count % 2 != 0 ? (
              <TouchableOpacity
                style={sitStandPageStyle.SubmitButtonStyleStopWatch}
                onPress={submitAlertStopWatch}
              >
                <Text style={sitStandPageStyle.TextStyleButton}>
                  Submit FormSG
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={sitStandPageStyle.MainRecordContainer}>
            {count % 2 != 0 ? (
              <TouchableOpacity
                style={sitStandPageStyle.buttonStartStopSitToStandReset}
                onPress={() => {
                  setIsStopwatchStart(false);
                  setResetStopwatch(true);
                  count = 0;
                }}
              >
                <Text style={sitStandPageStyle.TextStyleButton}>Reset</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
//  Calendar Page
//  Displays all the days where the user have recorded their extension, flexion and
//  stopwatch readings. Pull down calendar will show a blue dot if recording is done
//  for the day
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
          kneeFlexionDataBase.transaction((tx) => {
            tx.executeSql(
              `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ? ORDER BY id DESC LIMIT 1`,
              [strTime + "%"],
              (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                  var ans = results.rows.item(0).value;
                  var g = ans.substr(-3);

                  kneeExtensionDataBase.transaction((tx1) => {
                    tx1.executeSql(
                      `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ? ORDER BY id DESC LIMIT 1`,
                      [strTime + "%"],
                      (tx1, results1) => {
                        var len1 = results1.rows.length;
                        if (len1 > 0) {
                          var ans1 = results1.rows.item(0).value;
                          var h = ans1.substr(-3);
                          var k = "Not Recorded";
                          if (stCheck == null || stCheck == 0) {
                            items[strTime].push({
                              dat: strTime + " ",
                              name: g + "°",
                              name1: +h + "°",
                              name2: k,
                              height: Math.max(
                                50,
                                Math.floor(Math.random() * 150)
                              ),
                            });
                            b(results.rows.item(0));
                            y(results1.rows.item(0));
                          } else {
                            stopWatchDataBase.transaction((tx2) => {
                              tx2.executeSql(
                                `SELECT * FROM stopWatchDataBase WHERE value LIKE ? ORDER BY id DESC LIMIT 1`,
                                [strTime + "%"],
                                (tx2, results1) => {
                                  var len1 = results1.rows.length;
                                  if (len1 > 0) {
                                    var ans2 = results1.rows.item(0).value;
                                    k = ans2.substr(-6);
                                    items[strTime].push({
                                      dat: strTime + " ",
                                      name: g + "°",
                                      name1: +h + "°",
                                      name2: k + " seconds",
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
                Extension: {x.name1} {"\n"}
                {"\n"}
                Time: {x.name2}
              </Text>
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
//  Chart Page
//  Application will display the AVERAGE weekly degree readings for knee flexion and extension
//  **IMPORTANT**
//  Data is retrieved each time the user clicks on record extension or flexion
//  Data can be retrieved only when the user submits to formSG but will require code amendments
const Graph = ({ navigation, route }) => {
  var [selectedLanguage, setSelectedLanguage] = useState("flexion");
  var [selectedFontColor, setSelectedFontColor] = useState("black");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [checked, setChecked] = React.useState(false);

  const horizontalButtons = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      flex: 1,
    },
  });

  return (
    <ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View style={horizontalButtons.container}>
          <View style={horizontalButtons.buttonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedLanguage === "flexion"
                    ? "#2b2e6d"
                    : "rgba(232, 232, 232, 1)",
                padding: 15,
                borderRadius: 20,
              }}
              onPress={() => {
                setSelectedLanguage("flexion");
                setSelectedFontColor("white");
              }}
            >
              <Text
                style={{
                  color: selectedLanguage === "flexion" ? "white" : "black",
                  fontSize: 35,
                  textAlign: "center",
                }}
              >
                Flexion
              </Text>
            </TouchableOpacity>
          </View>
          <View style={horizontalButtons.buttonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedLanguage === "extension"
                    ? "#2b2e6d"
                    : "rgba(232, 232, 232, 1)",
                padding: 15,
                borderRadius: 20,
              }}
              onPress={() => {
                setSelectedLanguage("extension");
                setSelectedFontColor("white");
              }}
            >
              <Text
                style={{
                  color: selectedLanguage === "extension" ? "white" : "black",
                  fontSize: 35,
                  textAlign: "center",
                }}
              >
                Extension
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {selectedLanguage == "extension"
          ? kneeExtensionGraph()
          : kneeFlexionGraph()}
      </View>
    </ScrollView>
  );
};
//  Contact Us Page
//  SGH contact details
const Contact = ({ navigation, route }) => {
  weekOneExtensionCall();
  return (
    <View style={styles.container}>
      <Image
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        source={require("./sgh-logo2.png")}
      />
      <Text></Text>
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        General Enquiries: {"\n"}+65 6222 3322
      </Text>
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Address: {"\n"}Outram Road Singapore 169608
      </Text>
    </View>
  );
};
//  Sit Stand Form SG Page
//  Data is automatically retrieved from local database
//  **IMPORTANT**
//  Form input values cannot be changed by the user
const SitStandFormSG = ({ navigation, route }) => {
  countStCall();
  nricAsyncCall();
  const { timeData } = route.params;
  const x = route.params.paramKey;
  const timeValStr = "Timing: " + x;
  const nricSubmitData = String(nricUser[0]);
  const timingSubmitData = timeData;
  const runFirst = `setTimeout(function() {
    document.getElementById("603c3ccc399059001247a1ee").readOnly = true;
    document.getElementById("6098d0a38a5d310012f967d3").readOnly = true;
    document.getElementById("603c3ccc399059001247a1ee").className = "";
    document.getElementById("6098d0a38a5d310012f967d3").className = "";
    document.getElementById('603c3ccc399059001247a1ee').value = '${nricSubmitData}';
    document.getElementById('603c3ccc399059001247a1ee').dispatchEvent(new Event("input"));
    document.getElementById('6098d0a38a5d310012f967d3').value = '${timingSubmitData}';
    document.getElementById('6098d0a38a5d310012f967d3').dispatchEvent(new Event("input"));
  }, 1000)`;
  return (
    <WebView
      javaScriptEnabled={true}
      source={{ uri: "https://form.gov.sg/#!/6092586dbee1190011689234" }}
      onMessage={(event) => {}}
      injectedJavaScript={runFirst}
      style={{ flex: 1 }}
      javaScriptEnabled
    />
  );
};
//  Goniometer Form SG Page
//  Data is automatically retrieved from local database
//  **IMPORTANT**
//  Form input values cannot be changed by the user
const FormSG = ({ navigation, route }) => {
  nricAsyncCall();
  const { flexData } = route.params;
  const { extenData } = route.params;
  const x = route.params.paramKey;
  const flexStr = "Flexion: " + x;
  const extenStr = "Extension: " + x;
  const nricSubmitData = String(nricUser[0]);
  const flexionSubmitData = parseInt(flexData);
  const extensionSubmitData = parseInt(extenData);
  const runFirst = `setTimeout(function() {
    document.getElementById("603c3ccc399059001247a1ee").readOnly = true;
    document.getElementById("603c3d41526b9e00127a488f").readOnly = true;
    document.getElementById("603c3d5a7d837800126d12f7").readOnly = true;
    document.getElementById("603c3ccc399059001247a1ee").className = "";
    document.getElementById("603c3d41526b9e00127a488f").className = "";
    document.getElementById("603c3d5a7d837800126d12f7").className = "";
    document.getElementById('603c3ccc399059001247a1ee').value = '${nricSubmitData}';
    document.getElementById('603c3ccc399059001247a1ee').dispatchEvent(new Event("input"));
    document.getElementById('603c3d41526b9e00127a488f').value = '${flexionSubmitData}';
    document.getElementById('603c3d41526b9e00127a488f').dispatchEvent(new Event("input"));
    document.getElementById('603c3d5a7d837800126d12f7').value = '${extensionSubmitData}';
    document.getElementById('603c3d5a7d837800126d12f7').dispatchEvent(new Event("input"));
  }, 1000)`;
  return (
    <WebView
      javaScriptEnabled={true}
      source={{ uri: "https://form.gov.sg/#!/603c3ca2b3f2b10012a03bc4" }}
      onMessage={(event) => {}}
      injectedJavaScript={runFirst}
      style={{ flex: 1 }}
      javaScriptEnabled
    />
  );
};
//  Goniometer Page
//  Function for knee degree measurements
const Goniometer = ({ navigation, route }) => {
  nricAsyncCall();
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
    kneeFlexionDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists kneeFlexionDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  React.useEffect(() => {
    kneeExtensionDataBase.transaction((tx) => {
      tx.executeSql(
        "create table if not exists kneeExtensionDataBase (id integer primary key not null, done int, value text);"
      );
    });
  }, []);
  const add = (text) => {
    var text = parseInt(text);
    if (text === null || text === "") {
      alert("Invalid Input!");
      return false;
    }
    kneeFlexionDataBase.transaction(
      (tx) => {
        tx.executeSql(
          "insert into kneeFlexionDataBase (done, value) values (0, ?)",
          [
            moment().utcOffset("+08:00").format("YYYY-MM-DD") +
              " Flexion:    " +
              text,
          ]
        );
        tx.executeSql("SELECT * FROM kneeFlexionDataBase", [], (_, { rows }) =>
          console
            .log
            // JSON.stringify(rows)
            ()
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

    kneeExtensionDataBase.transaction(
      (tx) => {
        tx.executeSql(
          "insert into kneeExtensionDataBase (done, value) values (0, ?)",
          [
            moment().utcOffset("+08:00").format("YYYY-MM-DD") +
              " Extension:    " +
              text,
          ]
        );
        tx.executeSql(
          "SELECT * FROM kneeExtensionDataBase",
          [],
          (_, { rows }) =>
            console
              .log
              // JSON.stringify(rows)
              ()
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
        (n >= 115 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n >= 117 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n >= 120 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n >= 121 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n >= 123 && (dayDiff > 70) & (dayDiff <= 84))
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n >= 105 && dayDiff <= 14) ||
        (n >= 110 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n >= 115 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n >= 117 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n >= 118 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n >= 120 && (dayDiff > 70) & (dayDiff <= 84))
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
        (n < 115 && n >= 106 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n < 117 && n >= 110 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n < 120 && n >= 113 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n < 121 && n >= 115 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n < 123 && n >= 117 && (dayDiff > 70) & (dayDiff <= 84))
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n < 105 && n >= 95 && dayDiff <= 14) ||
        (n < 110 && n >= 102 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n < 115 && n >= 106 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n < 117 && n >= 109 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n < 118 && n >= 110 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n < 120 && n >= 110 && (dayDiff > 70) & (dayDiff <= 84))
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
        (n > 96 && n < 106 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n > 102 && n < 110 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n > 105 && n < 113 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n > 106 && n < 115 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n > 107 && n < 117 && (dayDiff > 70) & (dayDiff <= 84))
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n > 88 && n < 95 && dayDiff <= 14) ||
        (n > 93 && n < 102 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n > 96 && n < 106 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n > 99 && n < 109 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n > 101 && n < 110 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n > 103 && n < 110 && (dayDiff > 70) & (dayDiff <= 84))
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
        (n <= 96 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n <= 102 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n <= 105 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n <= 106 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n <= 107 && (dayDiff > 70) & (dayDiff <= 84))
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n <= 88 && dayDiff <= 14) ||
        (n <= 93 && (dayDiff > 14) & (dayDiff <= 28)) ||
        (n <= 96 && (dayDiff > 28) & (dayDiff <= 42)) ||
        (n <= 99 && (dayDiff > 42) & (dayDiff <= 56)) ||
        (n <= 101 && (dayDiff > 56) & (dayDiff <= 70)) ||
        (n <= 103 && (dayDiff > 70) & (dayDiff <= 84))
      ) {
        return true;
      }
    }
    return false;
  }
  const [shouldShow, setShouldShow] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedGenderValue, setSelectedGenderValue] = useState(null);
  const [extensionDegree, setExtensionDegree] = useState("0");
  const [flexionDegree, setFlexionDegree] = useState("0");
  const [items, setItems] = useState({});
  const [extensionDegreeControl, setExtensionDegreeControl] =
    useState("Pending");
  const [flexionDegreeControl, setFlexionDegreeControl] = useState("Pending");

  function displayAngle() {
    userGenderDataBase.transaction((tx) => {
      tx.executeSql(
        `select * from userGenderDataBase ORDER BY id DESC LIMIT ?`,
        [1],
        (tx, result) => {
          var len = result.rows.length;
          if (len > 0) {
            //convert string
            var gender = result.rows.item(0).value.toString();
            setSelectedGenderValue(gender);
          }
        }
      );
    });
  }
  const [val, setVal] = useState("AboutReact");
  const [vals, setVals] = useState("AboutReacts");

  const submitAlert = () => {
    Alert.alert("Are you sure you want to submit?", "", [
      {
        text: "Cancel",
        onPress: () => console.log(),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () =>
          navigation.navigate("FormSG", {
            flexData: val,
            extenData: vals,
            name: "FormSG",
            flex: 1,
          }),
      },
    ]);
  };

  const state = {
    data: [
      {
        id: 1,
        title: "Record Extension",
        link: "ke",
        image: "./ke.png",
      },
      {
        id: 2,
        title: "Record Flexion",
        link: "kf",
        image: "./kf.png",
      },
    ],
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  //iphone 8: width: 414, height: 736
  var kneeRangeSize;
  var prevSize;
  if (windowWidth <= 414 && windowHeight <= 844) {
    kneeRangeSize = 22.5;
    prevSize = 20;
  } else {
    kneeRangeSize = 45;
    prevSize = 30;
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setShouldShow(!shouldShow)}
          style={styles.ShowHideButtonStyle}
        >
          <Text style={styles.ShowHideTextButtonStyle}>
            {shouldShow ? "Hide Display" : "Show Display"}
          </Text>
        </TouchableOpacity>
        {/*Here we will return the view when state is true 
          and will return false if state is false*/}
      </View>

      {shouldShow ? (
        <View>
          {windowWidth <= 414 && windowHeight <= 736 ? (
            <Text></Text>
          ) : (
            <Text style={{ textAlign: "center", fontSize: kneeRangeSize }}>
              Knee Range{" "}
            </Text>
          )}

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
      ) : null}

      <View>
        {useEffect(() => {
          displayAngle();
        }, [])}
      </View>

      {shouldShow ? (
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: prevSize,
              fontStyle: "italic",
            }}
          >
            Previous Extension: {extensionDegree}°
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: prevSize,
              fontStyle: "italic",
            }}
          >
            Previous Flexion: {flexionDegree}°
          </Text>
        </View>
      ) : null}
      {!shouldShow ? (
        <View>
          <Text></Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: prevSize,
              fontStyle: "italic",
            }}
          >
            Extension: {extensionDegreeControl}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: prevSize,
              fontStyle: "italic",
            }}
          >
            Flexion: {flexionDegreeControl}
          </Text>
        </View>
      ) : null}
      <ScrollView>
        {/* Start Stop Function */}
        {/* <View style={styles.MainRecordStartStopContainer}>
          <TouchableOpacity
            onPress={subscription ? _unsubscribe : _subscribe}
            style={styles.SubmitButtonStyle}
          >
            <Text style={styles.TextStyleButton}>
              {subscription ? "STOP" : "START"}
            </Text>
          </TouchableOpacity>
        </View> */}
        {Dimensions.get("window").width <= 414 &&
        Dimensions.get("window").height <= 736 ? (
          <FlatList
            data={state.data}
            horizontal={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={goniometerPageStyle.cardIp8}
                    onPress={() => {
                      if (item.link == "kf") {
                        var degr = getDegrees(round(beta));
                        add(degr);
                        setFlexionDegree(getDegrees(round(beta)));
                        setFlexionDegreeControl("Done");
                        setVal(degr);
                      } else {
                        var a = getDegrees(round(beta));
                        add1(a);
                        setExtensionDegree(getDegrees(round(beta)));
                        setExtensionDegreeControl("Done");
                        setVals(a);
                      }
                    }}
                  >
                    <Text></Text>
                    <Text></Text>
                    {Dimensions.get("window").width <= 414 &&
                    Dimensions.get("window").height <= 736 ? (
                      item.link == "kf" ? (
                        <Image
                          style={goniometerPageStyle.cardImageIphone8}
                          source={require("./kf.png")}
                        />
                      ) : (
                        <Image
                          style={goniometerPageStyle.cardImageIphone8}
                          source={require("./ke.png")}
                        />
                      )
                    ) : item.link == "kf" ? (
                      <Image
                        style={goniometerPageStyle.cardImage}
                        source={require("./kf.png")}
                      />
                    ) : (
                      <Image
                        style={goniometerPageStyle.cardImage}
                        source={require("./ke.png")}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={state.data}
            horizontal={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={goniometerPageStyle.card}
                    onPress={() => {
                      if (item.link == "kf") {
                        var degr = getDegrees(round(beta));
                        add(degr);
                        setFlexionDegree(getDegrees(round(beta)));
                        setFlexionDegreeControl("Done");
                        setVal(degr);
                      } else {
                        var a = getDegrees(round(beta));
                        add1(a);
                        setExtensionDegree(getDegrees(round(beta)));
                        setExtensionDegreeControl("Done");
                        setVals(a);
                      }
                    }}
                  >
                    <Text></Text>
                    <Text></Text>
                    {Dimensions.get("window").width <= 414 &&
                    Dimensions.get("window").height <= 736 ? (
                      item.link == "kf" ? (
                        <Image
                          style={goniometerPageStyle.cardImageIphone8}
                          source={require("./kf.png")}
                        />
                      ) : (
                        <Image
                          style={goniometerPageStyle.cardImageIphone8}
                          source={require("./ke.png")}
                        />
                      )
                    ) : item.link == "kf" ? (
                      <Image
                        style={goniometerPageStyle.cardImage}
                        source={require("./kf.png")}
                      />
                    ) : (
                      <Image
                        style={goniometerPageStyle.cardImage}
                        source={require("./ke.png")}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
        <View style={styles.MainRecordContainer}>
          {!(flexionDegree != 0 && extensionDegree != 0) ? <Text></Text> : null}
          {flexionDegree != 0 && extensionDegree != 0 ? (
            <TouchableOpacity
              style={styles.SubmitButtonFormStyle}
              onPress={submitAlert}
            >
              <Text style={styles.TextStyleButton}>Submit FormSG</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
//  Saves all the dates for the 12 week recovery process in the dateDataBase database
//  Will be needed for the graph page to load the correct values
async function setDateForList() {
  var g = 1;
  var h = 1;
  var k;
  dateDataBase.transaction((tx) => {
    tx.executeSql(`select * from dateDataBase LIMIT ?`, [1], (tx, result) => {
      if (result.rows.length > 0) {
        weeks[0] = result.rows.item(0).value;
      }
    });
  });
  for (var x = 1; x < 84; x++) {
    dateDataBase.transaction((tx) => {
      tx.executeSql(
        `select * from dateDataBase ORDER BY id ASC LIMIT ${h},${g}`,
        [],
        (tx, result) => {
          if (result.rows.length > 0) {
            var len = result.rows.length;
            weeks[h] = result.rows.item(0).value;
            h++;
            var data = [];
            data.push(result.rows.item(0).value);
            return data;
          } else {
            return 0;
          }
        }
      );
    });
  }
}
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly extension readings
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
    kneeExtensionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeExtensionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}

//  Async call for the average weekly extension readings
async function weekOneExtensionCall() {
  weekOneExtension().then((val) => (weekOneExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekTwoExtensionCall() {
  weekTwoExtension().then((val) => (weekTwoExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekThreeExtensionCall() {
  weekThreeExtension().then((val) => (weekThreeExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekFourExtensionCall() {
  weekFourExtension().then((val) => (weekFourExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekFiveExtensionCall() {
  weekFiveExtension().then((val) => (weekFiveExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekSixExtensionCall() {
  weekSixExtension().then((val) => (weekSixExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekSevenExtensionCall() {
  weekSevenExtension().then((val) => (weekSevenExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekEightExtensionCall() {
  weekEightExtension().then((val) => (weekEightExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekNineExtensionCall() {
  weekNineExtension().then((val) => (weekNineExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekTenExtensionCall() {
  weekTenExtension().then((val) => (weekTenExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekElevenExtensionCall() {
  weekElevenExtension().then((val) => (weekElevenExtensionList = val));
}
//  Async call for the average weekly extension readings
async function weekTwelveExtensionCall() {
  weekTwelveExtension().then((val) => (weekTwelveExtensionList = val));
}
//  Retrieve the NRIC value for the formSG submission
async function nricAsync() {
  var total = "";
  return new Promise((resolve, reject) => {
    userNRICDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM userNRICDataBase ORDER BY id DESC LIMIT ?`,
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
        }
      );
    });
  });
}
//  Async call for nricAsync()
async function nricAsyncCall() {
  nricAsync().then((val) => (nricUser = val));
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          //this console log not printing
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Calculations for the average weekly flexion readings
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
    kneeFlexionDataBase.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM kneeFlexionDataBase WHERE value LIKE ` +
          tmr1 +
          ` or value LIKE ` +
          tmr2 +
          ` or value LIKE ` +
          tmr3 +
          ` or value LIKE ` +
          tmr4 +
          ` or value LIKE ` +
          tmr5 +
          ` or value LIKE ` +
          today +
          ` or value LIKE ` +
          tmr6,
        [],
        (tx1, results1) => {
          var len1 = results1.rows.length;
          if (len1 > 0) {
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
        }
      );
    });
  });
}
//  Async call for the average weekly flexion readings
async function weekOneCall() {
  weekOne().then((val) => (weekOneList = val));
}
//  Async call for the average weekly flexion readings
async function weekTwoCall() {
  weekTwo().then((val) => (weekTwoList = val));
}
//  Async call for the average weekly flexion readings
async function weekThreeCall() {
  weekThree().then((val) => (weekThreeList = val));
}
//  Async call for the average weekly flexion readings
async function weekFourCall() {
  weekFour().then((val) => (weekFourList = val));
}
//  Async call for the average weekly flexion readings
async function weekFiveCall() {
  weekFive().then((val) => (weekFiveList = val));
}
//  Async call for the average weekly flexion readings
async function weekSixCall() {
  weekSix().then((val) => (weekSixList = val));
}
//  Async call for the average weekly flexion readings
async function weekSevenCall() {
  weekSeven().then((val) => (weekSevenList = val));
}
//  Async call for the average weekly flexion readings
async function weekEightCall() {
  weekEight().then((val) => (weekEightList = val));
}
//  Async call for the average weekly flexion readings
async function weekNineCall() {
  weekNine().then((val) => (weekNineList = val));
}
//  Async call for the average weekly flexion readings
async function weekTenCall() {
  weekTen().then((val) => (weekTenList = val));
}
//  Async call for the average weekly flexion readings
async function weekElevenCall() {
  weekEleven().then((val) => (weekElevenList = val));
}
//  Async call for the average weekly flexion readings
async function weekTwelveCall() {
  weekTwelve().then((val) => (weekTwelveList = val));
}
//  Function to load the knee extension graph
function kneeExtensionGraph() {
  return (
    <View style={{ backgroundColor: "white" }}>
      {/* <Text
        style={{ backgroundColor: "white", textAlign: "center", fontSize: 40 }}
      >
        Knee Extension
      </Text> */}
      <Text></Text>
      <LineChart
        data={{
          labels: [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8",
            "w9",
            "w10",
            "w11",
            "w12",
          ],
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
                weekTwelveExtensionList[0] ? weekTwelveExtensionList[0] : 0,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 5} // from react-native
        height={Dimensions.get("window").height - 85}
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
            stroke: "#9cd9d7",
          },
        }}
      />
    </View>
  );
}
//  Function to load the knee flexion graph
function kneeFlexionGraph() {
  return (
    <View style={{ backgroundColor: "white" }}>
      {/* <Text
        style={{ backgroundColor: "white", textAlign: "center", fontSize: 40 }}
      >
        Knee Flexion
      </Text> */}
      <Text></Text>
      <LineChart
        data={{
          labels: [
            "w1",
            "w2",
            "w3",
            "w4",
            "w5",
            "w6",
            "w7",
            "w8",
            "w9",
            "w10",
            "w11",
            "w12",
          ],
          datasets: [
            {
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
                weekTwelveList[0] ? weekTwelveList[0] : 0,
              ],
              strokeWidth: 4,
            },
          ],
        }}
        width={Dimensions.get("window").width - 5} // from react-native
        height={Dimensions.get("window").height - 85}
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
            stroke: "#9cd9d7",
          },
        }}
      />
    </View>
  );
}
//  Function to determine if there is a NRIC record in the database for conditional rendering
async function countNRIC() {
  return new Promise((resolve, reject) => {
    userNRICDataBase.transaction((tx1) => {
      tx1.executeSql("SELECT * FROM userNRICDataBase", [], (tx1, results1) => {
        if (results1.rows.length == null) {
        } else {
        }
        nricX = results1.rows.length;
        return results1.rows.length;
      });
    });
  });
}
//  Async call for countNRIC()
async function countNRICCall() {
  countNRIC().then((val) => console.log());
}
//  Function to retrieve the number of sit-stand record in the database
async function countSt() {
  return new Promise((resolve, reject) => {
    stopWatchDataBase.transaction((tx1) => {
      tx1.executeSql("SELECT * FROM stopWatchDataBase", [], (tx1, results1) => {
        if (results1.rows.length == null) {
        } else {
        }
        stCheck = results1.rows.length;
        return results1.rows.length;
      });
    });
  });
}
//  Async call for countSt()
async function countStCall() {
  countSt().then((val) => console.log());
}

//To handle all the pages
const Stack = createStackNavigator();
//Database for knee flexion
const kneeFlexionDataBase = SQLite.openDatabase("kneeFlexionDataBase.db");
//Database for knee extension
const kneeExtensionDataBase = SQLite.openDatabase("kneeExtensionDataBase.db");
//Database for user gender (Percentile)
const userGenderDataBase = SQLite.openDatabase("userGenderDataBase.db");
//Database for NRIC
const userNRICDataBase = SQLite.openDatabase("userNRICDataBase.db");
//Database for stopwatch
const stopWatchDataBase = SQLite.openDatabase("stopWatchDataBase.db");
//Database for date
const dateDataBase = SQLite.openDatabase("dateDataBase.db");

//To reset all data
function resetData() {
  userNRICDataBase.transaction((tx) => {
    tx.executeSql(`DROP TABLE userNRICDataBase`);
  });
  kneeFlexionDataBase.transaction((tx) => {
    tx.executeSql(`DROP TABLE kneeFlexionDataBase`);
  });
  userGenderDataBase.transaction((tx1) => {
    tx1.executeSql(`DROP TABLE userGenderDataBase`);
  });
  stopWatchDataBase.transaction((tx1) => {
    tx1.executeSql(`DROP TABLE stopWatchDataBase`);
  });
  dateDataBase.transaction((tx1) => {
    tx1.executeSql(`DROP TABLE dateDataBase`);
  });
}
//  UNCOMMENT THE LINE 3262 TO RESET THE APPLICATION
//  OR
//  REINSTALL EXPO OR APK TO RESET THE APPLICATION
resetData();

//  Initialisation of var / const / functions on application load
var weeks = [];
let initDate = [];
let nricCheck = [];
let nameCheck = [];
let checker = [];
var nricUser = [];
nricAsyncCall();
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
var nricX;
var stCheck;
countNRIC();
countNRICCall();
var count = 0;
const windowWidth1 = Dimensions.get("window").width;
const windowHeight1 = Dimensions.get("window").height;
var headerHeightSize = 90;
var headerFontSize = 25;
//Settings for iphone 8 and iphone 12 pro max
// console.log(windowWidth1 + " " + windowHeight1);
if (windowWidth1 <= 414 && windowHeight1 <= 736) {
  headerHeightSize = 50;
  headerFontSize = 20;
} else {
  headerHeightSize = 90;
  headerFontSize = 25;
}

//  Stylesheet
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "35%",
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
    paddingTop: 2,
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
  },
  MainRecordContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingTop: 2,
  },
  MainRecordHistoryContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
    paddingTop: 8,
  },
  SubmitButtonStyle: {
    backgroundColor: "#2b2e6d",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 120,
    justifyContent: "center",
  },
  NavigateMeasurement: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#2b2e6d",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 100,
    justifyContent: "center",
  },
  NavigateMeasurementAdmin: {
    marginTop: 40,
    backgroundColor: "#2b2e6d",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    height: 100,
    justifyContent: "center",
  },
  NavigateMeasurementData: {
    marginTop: 20,
    backgroundColor: "#2b2e6d",
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
  imgStyle: {
    paddingLeft: 50,
    justifyContent: "center",
  },
  SubmitButtonHistoryStyle: {
    backgroundColor: "#2b2e6d",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  SubmitButtonHistoryStyleDisabled: {
    backgroundColor: "#2b2e6d",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
    opacity: 0.3,
  },
  SubmitButtonFormStyle: {
    backgroundColor: "#2b2e6d",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    justifyContent: "center",
  },
  SubmitButtonFormStyleDisabled: {
    backgroundColor: "#2b2e6d",
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
  TextStyleButtonS: {
    color: "#fff",
    textAlign: "center",
    fontSize: 110,
  },
  TextStyleButtonHomePage: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
    fontStyle: "italic",
  },
  TextStyleButtonHomePageAdmin: {
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 60,
  },
  ShowHideTextButtonStyle: {
    fontSize: 18,
    // fontSize: 25,
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
  },
  ShowHideButtonStyle: {
    marginTop: 10,
    backgroundColor: "#2b2e6d",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    height: 25,
    //height: 50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
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
  activebutton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 20,
    borderWidth: 3,
    borderColor: "#000000",
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
const stylePicker = StyleSheet.create({
  inputIOS: {
    marginTop: 6,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#2b2e6d",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2b2e6d",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },

  inputAndroid: {
    marginTop: 6,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#2b2e6d",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2b2e6d",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },
});
const stylePercentile = StyleSheet.create({
  textPercentileBlack: {
    color: "black",
    textAlign: "center",
    fontSize: 90,
    paddingLeft: 20,
  },
  textPercentileGreen: {
    color: "green",
    textAlign: "center",
    fontSize: 90,
    paddingLeft: 20,
  },
  textPercentileOrange: {
    textAlign: "center",
    color: "#FFA537",
    fontSize: 90,
    paddingLeft: 20,
  },
  textPercentileRed: {
    color: "#FF8C00",
    textAlign: "center",
    fontSize: 90,
    paddingLeft: 20,
  },
});
const nricInputStyle = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    marginTop: 6,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#2b2e6d",
    borderRadius: 8,
    fontWeight: "bold",
    color: "#2b2e6d",
    paddingRight: 30, // to ensure the text is never behind the icon
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});
const welcomePageStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#000000",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#f6f6f6",
  },
  listContainer: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
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
  titleIp8: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "center",
    color: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "center",
    color: "black",
  },
});
const goniometerPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  cardIp8: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    backgroundColor: "rgba(161,221,239,0.4)",
    // height: 125, ip8
    height: 125,
    // height: 160,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
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
    backgroundColor: "rgba(161,221,239,0.4)",
    height: 200,
    borderRadius: 30,
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
    // backgroundColor:"#fff",
    resizeMode: "stretch",
    height: "130%",
    width: 260,
    alignSelf: "center",
  },
  cardImageIphone8: {
    // backgroundColor:"#fff",
    resizeMode: "stretch",
    height: "140%",
    width: 220,
    alignSelf: "center",
  },
  title: {
    backgroundColor: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000000",
  },
});
const sitStandPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  MainRecordContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingTop: 8,
    marginTop: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 60,
    marginTop: 10,
    alignItems: "center",
    textAlign: "center",
    color: "#FFF",
  },
  buttonStartStopSitToStand: {
    marginTop: 25,
    backgroundColor: "#2b2e6d",
    borderRadius: 250,
    borderWidth: 1,
    borderColor: "#fff",
    height: 300,
    width: 300,
    justifyContent: "center",
  },
  buttonStartStopSitToStandReset: {
    backgroundColor: "#786B4A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    width: 320,
    justifyContent: "center",
  },
  SubmitButtonStyleStopWatch: {
    marginTop: 10,
    backgroundColor: "#786B4A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    height: 80,
    width: 320,
    justifyContent: "center",
  },
  TextStyleButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
  },
});
const options = {
  container: {
    backgroundColor: "#2b2e6d",
    padding: 5,
    borderRadius: 5,
    width: 350,
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    color: "#FFF",
    marginLeft: 7,
  },
};
export default Goniometer_App;
