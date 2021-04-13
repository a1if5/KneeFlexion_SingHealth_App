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
  Button,
  Platform,
} from "react-native";
import { Dimensions,Switch } from 'react-native';
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

var xx = [];
var xxx = [];
var xxxx = [];
flexionAprilCall();
flexionMarchCall();
flexionMayCall();
var yy = [];
var yyy = [];
var yyyy = [];
extensionAprilCall();
extensionMarchCall();
extensionMayCall();
//Main controller
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
          name="UserData"
          component={UserData}
          options={{ title: "ADMIN" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Guide Page
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
    <View style={styles.youtubeplayer}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"1cOcZcKhSJY"}
        onChangeState={onStateChange}
      />
      <Text style={styles.baseText}>
        <Text style={styles.guideContent}>
          {" "}
          Tutorial on using the measurement app
        </Text>
      </Text>
    </View>
  );

























  // async function schedulePushNotification() {
  //   x = 0;
  //   if (x == 1) {
  //     const g = await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "You've got mail! 📬",
  //         body: "Here is the notification body",
  //         data: { data: "goes here" },
  //       },
  //       trigger: { seconds: 2 },
  //     });
  //     // await Notifications.cancelScheduledNotificationAsync(g);
  //   }
  // }
  //   const [expoPushToken, setExpoPushToken] = useState("");
  //   const [notification, setNotification] = useState(false);
  //   const notificationListener = useRef();
  //   const responseListener = useRef();
  //   useEffect(() => {
  //     registerForPushNotificationsAsync().then((token) =>
  //       setExpoPushToken(token)
  //     );
  //     notificationListener.current = Notifications.addNotificationReceivedListener(
  //       (notification) => {
  //         setNotification(notification);
  //       }
  //     );
  //     responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //       (response) => {
  //         console.log(response);
  //       }
  //     );
  //     return () => {
  //       Notifications.removeNotificationSubscription(notificationListener);
  //       Notifications.removeNotificationSubscription(responseListener);
  //     };
  //   }, []);
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "space-around",
  //       }}
  //     >
  //       <Text>Your expo push token: {expoPushToken}</Text>
  //       <View style={{ alignItems: "center", justifyContent: "center" }}>
  //         <Text>
  //           Title: {notification && notification.request.content.title}{" "}
  //         </Text>
  //         <Text>Body: {notification && notification.request.content.body}</Text>
  //         <Text>
  //           Data:{" "}
  //           {notification && JSON.stringify(notification.request.content.data)}
  //         </Text>
  //       </View>
  //       <Button
  //         title="Press to schedule a notification"
  //         onPress={async () => {
  //           await schedulePushNotification();
  //         }}
  //       />
  //     </View>
  //   );
  // };
  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const {
  //       status: existingStatus,
  //     } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }
  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  //   return token;
};

//History Page
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
          // items[strTime].push({
          //   name: strTime  + results.rows.item(0).value,
          //   height: Math.max(50, Math.floor(Math.random() * 150)),
          // });
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

//Admin Page
const UserData = ({ navigation, route }) => {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [forceUpdate1, forceUpdateId1] = useForceUpdate();
  const [selectedValue, setSelectedValue] = useState("2");
  const [selectedGenderValue, setSelectedGenderValue] = useState("Male");
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

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 40 }}>Admin Setup</Text>
      <View style={styles.pickerContainer}>
        <Text style={{ textAlign: "center", fontSize: 40 }}>Week</Text>
        <Text></Text>
        <RNPickerSelect
          // onValueChange={(itemValue) => setSelectedValue(itemValue)}
          // (itemValue) => setSelectedValue(itemValue)
          onValueChange={(itemValue) => {
            add2(itemValue);
            setSelectedValue(itemValue);
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Select Week", value: null }}
          items={[
            { label: "Week 2", value: "2" },
            { label: "Week 4", value: "4" },
            { label: "Week 6", value: "6" },
            { label: "Week 8", value: "8" },
            { label: "Week 10", value: "10" },
            { label: "Week 12", value: "12" },
          ]}
          style={stylePicker}
        />
      </View>
      <Text></Text>
      <Text style={{ textAlign: "center", fontSize: 40 }}>Gender</Text>
      <Text></Text>
      <View style={styles.pickerContainerGender}>
        <RNPickerSelect
          // onValueChange={(itemValue) => setSelectedGenderValue(itemValue)}
          onValueChange={(itemvalu) => {
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
    </View>
    // <ScrollView style={a.listArea}>
    //   <Items
    //     key={`forceupdate-todo-${forceUpdateId}`}
    //     done={false}
    //     onPressItem={(id) =>
    //       db.transaction(
    //         (tx) => {
    //           tx.executeSql(`delete from items where id = ?;`, [id]);
    //           // tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
    //         },
    //         null,
    //         forceUpdate
    //       )
    //     }
    //   />
    //   <Iitems
    //     key={`forceupdate1-todo-${forceUpdateId1}`}
    //     done={false}
    //     onPressItem={(id) =>
    //       db1.transaction(
    //         (tx) => {
    //           tx.executeSql(`delete from iitems where id = ?;`, [id]);
    //           // tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
    //         },
    //         null,
    //         forceUpdate1
    //       )
    //     }
    //   />
    // </ScrollView>
  );
};

//Main Page
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
      {
        id: 4,
        title: "Admin",
        link: "UserData",
        image: "https://img.icons8.com/windows/64/000000/microsoft-admin.png",
      },
      {
        id: 5,
        title: "Graph",
        link: "Graph",
        image: "https://img.icons8.com/material-rounded/64/000000/graph.png",
      },
    ],
  };




  const clickEventListener = (item) => {
    navigation.navigate(item.link, { name: item.link });
  };
  const clickEventListenerMeasurement = (item) => {
    navigation.navigate(item, { name: item });
  };
  return (
    <View style={pp.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            clickEventListenerMeasurement(Goniometer);
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
};
async function flexionApril() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ?`,
        ["2021-04%"],
        (tx1, results1) => {
          var len1 = results1.rows.length;
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
async function flexionMarch() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ?`,
        ["2021-03%"],
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
        });
    });
  });
}
async function flexionMay() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM items WHERE value LIKE ?`,
        ["2021-05%"],
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
        });
    });
  });
}
async function flexionMarchCall() {
  flexionMarch().then((val) => xxx = val);
}
async function flexionAprilCall() {
  flexionApril().then((val) => xx = val);
}
async function flexionMayCall() {
  flexionMay().then((val) => xxxx = val);
}
async function extensionApril() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ?`,
        ["2021-04%"],
        (tx1, results1) => {
          var len1 = results1.rows.length;
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
async function extensionMarch() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ?`,
        ["2021-03%"],
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
        });
    });
  });
}
async function extensionMay() {
  var total = 0;
  var finals = 0;
  return new Promise((resolve, reject) => {
    db1.transaction((tx1) => {
      tx1.executeSql(
        `SELECT * FROM iitems WHERE value LIKE ?`,
        ["2021-05%"],
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
        });
    });
  });
}
async function extensionMarchCall() {
  extensionMarch().then((val) => yyy = val);
}
async function extensionAprilCall() {
  extensionApril().then((val) => yy = val);
}
async function extensionMayCall() {
  extensionMay().then((val) => yyyy = val);
}



function rr() {
  return (
    <View style={{backgroundColor:"white"}}>
      <Text style={{backgroundColor:"white", textAlign: "center", fontSize: 40 }}>Knee Extension</Text>
      <Text>
            
            </Text>
      <LineChart
        data={{
          labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11"],
          datasets: [
            {
              data: [10, 10, 9.5, 9, 8.8, 8.3, 7, 6.5, 6, 5.6, 5],
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
  <View style={{backgroundColor:"white"}}>
          <Text style={{ backgroundColor:"white", textAlign: "center", fontSize: 40 }}>Knee Flexion</Text>
          <Text>

          </Text>

    <LineChart
      data={{
        labels: ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11"],
        datasets: [
          {
            // data: [60, xx[0],0,0,0,0,0,0,0,0,0],
            data: [105, 106, 107, 107.5, 108, 109, 109.5, 110, 110.2, 110.3, 110.5],
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
  console.log(xx);
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log(yy);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <ScrollView>
      {/* {selectedLanguage="extension"} */}

      {/* <Button title = "Extension" onPress={()=>setSelectedLanguage("extension")}></Button>
      <Button title = "Flexion" onPress={()=>setSelectedLanguage("flexion")}></Button> */}
      <View style={{backgroundColor:"white"}}>
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
          inactiveTextColor= {'grey'}
          style={{ }}
          textStyle={{fontSize:30}}
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
      // bezier
      // style={{
      //   marginVertical: 8,
      //   borderRadius: 16
      // }}
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
  flexionAprilCall();
  flexionMarchCall();
  flexionMayCall();
  extensionAprilCall();
  extensionMarchCall();
  extensionMayCall();
  return (
    <WebView
      source={{ uri: "https://form.gov.sg/#!/603c3ca2b3f2b10012a03bc4" }}
      injectedJavaScript={`(function(){document.getElementById('603c3d41526b9e00127a488f').value = '4';document.getElementById('603c3d5a7d837800126d12f7').value = '7';}());`}
    />
  );
};

//Goniometer Page
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
    var pitch = Math.round(90 + pitchraw2 - radians_to_degrees(pitchtrig)); //Add a plus 10 correction

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
        (n >= 112 && selectedValue === "2") ||
        (n >= 115 && selectedValue === "4") ||
        (n >= 117 && selectedValue === "6") ||
        (n >= 120 && selectedValue === "8") ||
        (n >= 121 && selectedValue === "10") ||
        (n >= 123 && selectedValue === "12") ||
        (n >= 124 && selectedValue === "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n >= 105 && selectedValue === "2") ||
        (n >= 110 && selectedValue === "4") ||
        (n >= 115 && selectedValue === "6") ||
        (n >= 117 && selectedValue === "8") ||
        (n >= 118 && selectedValue === "10") ||
        (n >= 120 && selectedValue === "12") ||
        (n >= 120 && selectedValue === "14")
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
        (n < 112 && n >= 101 && selectedValue === "2") ||
        (n < 115 && n >= 106 && selectedValue === "4") ||
        (n < 117 && n >= 110 && selectedValue === "6") ||
        (n < 120 && n >= 113 && selectedValue === "8") ||
        (n < 121 && n >= 115 && selectedValue === "10") ||
        (n < 123 && n >= 117 && selectedValue === "12") ||
        (n < 124 && n >= 118 && selectedValue === "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n < 105 && n >= 95 && selectedValue === "2") ||
        (n < 110 && n >= 102 && selectedValue === "4") ||
        (n < 115 && n >= 106 && selectedValue === "6") ||
        (n < 117 && n >= 109 && selectedValue === "8") ||
        (n < 118 && n >= 110 && selectedValue === "10") ||
        (n < 120 && n >= 110 && selectedValue === "12") ||
        (n < 120 && n >= 110 && selectedValue === "14")
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
        (n > 90 && n < 101 && selectedValue === "2") ||
        (n > 96 && n < 106 && selectedValue === "4") ||
        (n > 102 && n < 110 && selectedValue === "6") ||
        (n > 105 && n < 113 && selectedValue === "8") ||
        (n > 106 && n < 115 && selectedValue === "10") ||
        (n > 107 && n < 117 && selectedValue === "12") ||
        (n > 108 && n < 118 && selectedValue === "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n > 88 && n < 95 && selectedValue === "2") ||
        (n > 93 && n < 102 && selectedValue === "4") ||
        (n > 96 && n < 106 && selectedValue === "6") ||
        (n > 99 && n < 109 && selectedValue === "8") ||
        (n > 101 && n < 110 && selectedValue === "10") ||
        (n > 103 && n < 110 && selectedValue === "12") ||
        (n > 104 && n < 110 && selectedValue === "14")
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
        (n <= 90 && selectedValue === "2") ||
        (n <= 96 && selectedValue === "4") ||
        (n <= 102 && selectedValue === "6") ||
        (n <= 105 && selectedValue === "8") ||
        (n <= 106 && selectedValue === "10") ||
        (n <= 107 && selectedValue === "12") ||
        (n <= 108 && selectedValue === "14")
      ) {
        return true;
      }
    } else if (selectedGenderValue === "Female") {
      if (
        (n <= 88 && selectedValue === "2") ||
        (n <= 93 && selectedValue === "4") ||
        (n <= 96 && selectedValue === "6") ||
        (n <= 99 && selectedValue === "8") ||
        (n <= 101 && selectedValue === "10") ||
        (n <= 103 && selectedValue === "12") ||
        (n <= 104 && selectedValue === "14")
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
              add(getDegrees(round(beta)));
              setFlexionDegree(getDegrees(round(beta)));
            }}
            style={styles.SubmitButtonRecordStyle}
          >
            <Text style={styles.TextStyleButton}>Record Flexion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.MainRecordContainer}>
          <TouchableOpacity
            onPress={() => {
              add1(getDegrees(round(beta)));
              setExtensionDegree(getDegrees(round(beta)));
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
            <TouchableOpacity
              onPress={() => navigation.navigate("FormSG", { name: "FormSG" })}
              style={styles.SubmitButtonFormStyle}
            >
              <Text style={styles.TextStyleButton}>Submit FormSG</Text>
            </TouchableOpacity>
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
  pickerContainerGender: {
    flex: 1,
    justifyContent: "flex-start",
    height: 1,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 0,
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
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
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

export default Goniometer_App;
