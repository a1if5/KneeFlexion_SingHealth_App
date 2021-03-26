import React, {
  useState,
  useEffect,
  Component,
  useCallback,
  useRef,
} from "react";
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
} from "react-native";
import { Accelerometer } from "expo-sensors";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DeviceMotion } from "expo-sensors";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Card, Avatar } from "react-native-paper";
import PushNotification from "react-native-push-notification";

import {
  Calendar,
  CalendarList,
  Agenda,
  calendarTheme,
} from "react-native-calendars";
import { render } from "react-dom";

PushNotification.localNotificationSchedule({
  repeatType: day,
  //... You can use all the options from localNotifications
  message: "My Notification Message", // (required)
  date: new Date(Date.now() + 60 * 1000), // in 60 secs
  allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
});

const Stack = createStackNavigator();

const db = SQLite.openDatabase("db.db");
const db1 = SQLite.openDatabase("db1.db");

//Flexion Display
function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Checked Data" : "Data";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{"Flexion"}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
function Iitems({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db1.transaction((tx) => {
      tx.executeSql(
        `select * from iitems where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Checked Data" : "Data";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{"Extension"}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
function useForceUpdate1() {
  const [value1, setValue1] = useState(0);
  return [() => setValue(value1 + 1), value1];
}

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
          name="UserData"
          component={UserData}
          options={{ title: "ADMIN" }}
        />
        {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Start of Guide Page
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
};
// End of Guide Page

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
              `SELECT * FROM items WHERE value LIKE ?`,
              [strTime + "%"],
              (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                  console.log(results.rows.item(0).value);
                  var ans = results.rows.item(0).value;
                  var g = ans.substr(-3);
                  db1.transaction((tx1) => {
                    tx1.executeSql(
                      `SELECT * FROM iitems WHERE value LIKE ?`,
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
                            name1: +h + "°",
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

  const renderItem = (item) => {
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
                Date: {item.dat}
                {"\n"}
                {"\n"}
                Flexion: {item.name} {"\n"}
                {"\n"}
                Extension: {item.name1}
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

const UserData = ({ navigation, route }) => {
  // const twoOptionAlertHandler = () => {
  //   //function to make two option alert
  //   Alert.alert(
  //     //title
  //     "Warning",
  //     //body
  //     "Confirm delete?",
  //     [
  //       {
  //         text: "Yes",
  //         onPress: () => console.log("Deleted"),
  //       },
  //       {
  //         text: "No",
  //         onPress: () => console.log("Not Deleted"),
  //         style: "cancel",
  //       },
  //     ],
  //     { cancelable: false }
  //     //clicking out side of alert will not cancel
  //   );
  // };
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [forceUpdate1, forceUpdateId1] = useForceUpdate();

  return (
    <ScrollView style={a.listArea}>
      {/* <Button title="Alert with Two Options" onPress={twoOptionAlertHandler} /> */}
      <Items
        key={`forceupdate-todo-${forceUpdateId}`}
        done={false}
        onPressItem={(id) =>
          db.transaction(
            (tx) => {
              tx.executeSql(`delete from items where id = ?;`, [id]);
              // tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
            },
            null,
            forceUpdate
          )
        }
      />
      <Iitems
        key={`forceupdate1-todo-${forceUpdateId1}`}
        done={false}
        onPressItem={(id) =>
          db1.transaction(
            (tx) => {
              tx.executeSql(`delete from iitems where id = ?;`, [id]);
              // tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
            },
            null,
            forceUpdate1
          )
        }
      />
    </ScrollView>

    /* <Items
        done
        key={`forceupdate-done-${forceUpdateId}`}
        onPressItem={(id) =>
          db.transaction(
            (tx) => {
              tx.executeSql(`delete from items where id = ?;`, [id]);
            },
            null,
            forceUpdate
          )
        }
      /> */
  );
};

const HomeScreen = ({ navigation, route }) => {
  const state = {
    data: [
      {
        id: 2,
        title: "History",
        link: "CalenderDataPage",
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
        link: "",
        image: "https://img.icons8.com/ios/50/000000/phone-disconnected.png",
      },
      {
        id: 6,
        title: "Admin",
        link: "UserData",
        image: "https://img.icons8.com/windows/64/000000/microsoft-admin.png",
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
          console.log(item.id);
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
//extensionDegree
//document.getElementById('603c3d5a7d837800126d12f7').value = '7';
const FormSG = ({ navigation, route }) => {
  return (
    <WebView
      source={{ uri: "https://form.gov.sg/#!/603c3ca2b3f2b10012a03bc4" }}
      injectedJavaScript={`(function(){document.getElementById('603c3d41526b9e00127a488f').value = '4';document.getElementById('603c3d5a7d837800126d12f7').value = '7';}());`}
    />
  );
};

const Goniometer = ({ navigation, route }) => {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

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

  //Check validity of inputtttt :D
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

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };

  const _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

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

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////PERSIST GENDER WEEK BELOW//////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const [selectedValue, setSelectedValue] = useState("2");
  const [selectedGenderValue, setSelectedGenderValue] = useState("Male");
  const [extensionDegree, setExtensionDegree] = useState("0");
  const [flexionDegree, setFlexionDegree] = useState("0");

  ////////////////////////////////////////////////////////////////////////////
  //Below portion is for the Rendering of Week & Gender for Picker Button/////
  ////////////////////////////////////////////////////////////////////////////
  // <View style={styles.pickerContainer}>
  //   <RNPickerSelect
  //     onValueChange={(itemValue) => setSelectedValue(itemValue)}
  //     useNativeAndroidPickerStyle={false}
  //     placeholder={{ label: "Select Week", value: null }}
  //     items={[
  //       { label: "Week 2", value: "2" },
  //       { label: "Week 4", value: "4" },
  //       { label: "Week 6", value: "6" },
  //       { label: "Week 8", value: "8" },
  //       { label: "Week 10", value: "10" },
  //       { label: "Week 12", value: "12" },
  //     ]}
  //     style={stylePicker}
  //   />
  // </View>
  // <View style={styles.pickerContainerGender}>
  //   <RNPickerSelect
  //     onValueChange={(itemValue) => setSelectedGenderValue(itemValue)}
  //     useNativeAndroidPickerStyle={false}
  //     placeholder={{ label: "Select Gender", value: null }}
  //     items={[
  //       { label: "Male", value: "Male" },
  //       { label: "Female", value: "Female" },
  //     ]}
  //     style={stylePicker}
  //   />
  // </View>

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 60 }}>Knee Range:</Text>
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

////////////////////////////////////////////////////////////////////////////
//////////////////////////STYLESHEET SECTION BELOW//////////////////////////
////////////////////////////////////////////////////////////////////////////

/** Start of style sheet */
const styles = StyleSheet.create({
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

const Particular = () => {
  return (
    <View>
      <Text>Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
      />
      <Text>Age</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
      />
    </View>
  );
};

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

export default Goniometer_App;
