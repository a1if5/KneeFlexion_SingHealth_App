import React, { useState, useEffect, Component } from "react";
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

import {
  Calendar,
  CalendarList,
  Agenda,
  calendarTheme,
} from "react-native-calendars";
import { render } from "react-dom";

const Stack = createStackNavigator();

const db = SQLite.openDatabase("db.db");

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

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Goniometer" component={Goniometer} />
        <Stack.Screen name="FormSG" component={FormSG} />
        <Stack.Screen name="UserData" component={UserData} />
        {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
        <Stack.Screen name="CalenderDataPage" component={CalenderDataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CalenderDataPage = ({ navigation, route }) => {
  const [a, b] = useState({});
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
                  console.log(len);
                  console.log(results.rows.item(0));
                  console.log(results.rows.item(0).value);
                  var ans = results.rows.item(0).value;
                  var g = ans.substr(-3);
                  console.log(g);
                  items[strTime].push({
                    name: strTime + " Flexion" + g + "°",
                    height: Math.max(50, Math.floor(Math.random() * 150)),
                  });
                  b(results.rows.item(0));
                } else {
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
              <Text>{item.name} </Text>
              {/* Data will still show without anything inside <Items></Items> */}
              {/* <Items
                key={`forceupdate-todo-${forceUpdateId}`}
                done={false}
                onPressItem={(id) =>
                  db.transaction(
                    (tx) => {
                      tx.executeSql(`delete from items where id = ?;`, [id]);
                    },
                    null,
                    forceUpdate
                  )
                }
              /> */}

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
      {/* <Items
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
      /> */}
    </ScrollView>
  );
};

//This is the home page
// const HomeScreen = ({ navigation }) => {
//   return (
//     <View>
//       <Particular />
//       <Button
//         title="Proceed to Measurement"
//         onPress={() =>
//           navigation.navigate("Goniometer", { name: "Goniometer" })
//         }
//       />
//       <Button
//         title="View Data"
//         onPress={() => navigation.navigate("UserData", { name: "UserData" })}
//       />
//       <Button
//         title="Test"
//         onPress={() => navigation.navigate("HomePage", { name: "HomePage" })}
//       />
//       <Button
//         title="Test"
//         onPress={() => navigation.navigate("r", { name: "r" })}
//       />
//     </View>
//   );
// };

const HomeScreen = ({ navigation, route }) => {
  const state = {
    data: [
      {
        id: 1,
        title: "Record Measurement",
        link: "Goniometer",
        image: "https://img.icons8.com/wired/64/000000/measurement-tool.png",
      },
      {
        id: 1,
        title: "View History",
        link: "CalenderDataPage",
        image: "https://img.icons8.com/dotty/80/000000/activity-history.png",
      },
      {
        id: 2,
        title: "Submit Record",
        link: "FormSG",
        image:
          "https://img.icons8.com/pastel-glyph/64/000000/submit-document--v2.png",
      },
      {
        id: 3,
        title: "Guide",
        link: "",
        image: "https://img.icons8.com/ios/50/000000/city-guide.png",
      },
      {
        id: 4,
        title: "Contact Us",
        link: "",
        image: "https://img.icons8.com/ios/50/000000/phone-disconnected.png",
      },
      {
        id: 5,
        title: "Admin",
        link: "UserData",
        image: "https://img.icons8.com/windows/64/000000/microsoft-admin.png",
      },
    ],
  };

  const clickEventListener = (item) => {
    navigation.navigate(item.link, { name: item.link });
  };

  return (
    <View style={pp.container}>
      <FlatList
        style={pp.list}
        contentContainerStyle={pp.listContainer}
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

const FormSG = ({ navigation, route }) => {
  return (
    <WebView
      source={{ uri: "https://form.gov.sg/#!/603c3ca2b3f2b10012a03bc4" }}
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
            "Flexion:    " +
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
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedGenderValue, setSelectedGenderValue] = useState("");

  ////////////////////////////////////////////////////////////////////////////
  //Below portion is for the Rendering of Week & Gender for Picker Button/////
  ////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Select Check-Up Week", value: null }}
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
      <View style={styles.pickerContainerGender}>
        <RNPickerSelect
          onValueChange={(itemValue) => setSelectedGenderValue(itemValue)}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "Select Gender", value: null }}
          items={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          style={stylePicker}
        />
      </View>

      <View>
        <Text style={{ textAlign: "center", fontSize: 30 }}>
          Knee Flexion Range:
        </Text>
        <Text style={{ textAlign: "center", fontSize: 80, paddingLeft: 20 }}>
          {getDegrees(round(beta))}°
        </Text>
      </View>

      <View>
        {green(getDegrees(round(beta))) ? (
          <Text style={stylePercentile.textPercentileGreen}>
            > 75th Percentile{" "}
          </Text>
        ) : null}
        {blue(getDegrees(round(beta))) ? (
          <Text style={stylePercentile.textPercentileOrange}>
            {" "}
            Between 75th & 50th Percentile{" "}
          </Text>
        ) : null}
        {red(getDegrees(round(beta))) ? (
          <Text style={stylePercentile.textPercentileOrange}>
            {" "}
            Between 50th & 25th Percentile{" "}
          </Text>
        ) : null}
        {belowRed(getDegrees(round(beta))) ? (
          <Text style={stylePercentile.textPercentileRed}>
            {" "}
            25th Percentile & Below{" "}
          </Text>
        ) : null}
      </View>

      <View style={styles.MainRecordContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.SubmitButtonStyle}
        >
          <Text style={styles.TextStyleButton}>
            {subscription ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MainRecordContainer}>
        <TouchableOpacity
          onPress={() => {
            add(getDegrees(round(beta)));
          }}
          style={styles.SubmitButtonStyle}
        >
          <Text style={styles.TextStyleButton}>Record</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MainRecordContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CalenderDataPage", {
              name: "CalenderDataPage",
            })
          }
          style={styles.SubmitButtonStyle}
        >
          <Text style={styles.TextStyleButton}>View Results</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MainRecordContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FormSG", { name: "FormSG" })}
          style={styles.SubmitButtonStyle}
        >
          <Text style={styles.TextStyleButton}>Submit FormSG</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "center",
    height: 1,
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center",
  },
  pickerContainerGender: {
    flex: 1,
    justifyContent: "center",
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

  MainRecordContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  SubmitButtonStyle: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#2B6D6A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
  },
  SubmitButtonRecordStyle: {
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#786B4A",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
  },
  TextStyleButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 26,
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
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const stylePercentile = StyleSheet.create({
  textPercentileGreen: {
    textAlign: "center",
    fontSize: 17,
    color: "green",
  },
  textPercentileOrange: {
    textAlign: "center",
    fontSize: 17,
    color: "#FF8C00",
  },
  textPercentileRed: {
    textAlign: "center",
    fontSize: 17,
    color: "red",
  },
});

const pp = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 17,
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
