import { Button, Icon, Input, Text } from "@ui-kitten/components";
import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import {
  BackIcon,
  SaveIcon,
  UpdateIcon,
  DeleteIcon,
  IpNameIcon,
  IpIcon,
  UserIcon,
  PasswordIcon,
} from "../components/IconComponents";
import { addItem, deleteItem, updateItem } from "../utils";
import { AppDataContext } from "../context";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

export const ActionScreen = ({ navigation, route }) => {
  const [itemEntry, setItemEntry] = React.useState({
    id: "",
    ip: "",
    ipName: "",
    username: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const { data, setData } = React.useContext(AppDataContext);

  const { action, item } = route.params;

  const isEdit = action === "edit" ? true : false;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.navigate("MainScreen")}
    />
  );

  const passwordToggle = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const updateDataAndNavigate = (entries) => {
    setData(entries);
    navigation.navigate("MainScreen");
  };

  const saveHandler = () => {
    const newData = addItem(data, itemEntry);
    updateDataAndNavigate(newData);
  };

  const updateHandler = () => {
    const newData = updateItem(data, itemEntry);
    updateDataAndNavigate(newData);
  };

  const deleteHandler = () => {
    const newData = deleteItem(data, itemEntry.id);
    updateDataAndNavigate(newData);
  };

  React.useEffect(() => {
    if (item.id) {
      setItemEntry(item);
    }
  }, [item]);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        title={(evaProps) => (
          <Text {...evaProps} style={styles.title}>
            Static IP
          </Text>
        )}
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <KeyboardAvoidingView>
        <Input
          style={styles.input}
          value={itemEntry.ip}
          placeholder="IP Address"
          accessoryLeft={IpIcon}
          keyboardType="number-pad"
          textStyle={styles.inputText}
          autoFocus={true}
          onChangeText={(value) => setItemEntry({ ...itemEntry, ip: value })}
        />
        <Input
          style={styles.input}
          value={itemEntry.ipName}
          placeholder="Static IP Name"
          autoCapitalize="words"
          textStyle={styles.inputText}
          accessoryLeft={IpNameIcon}
          onChangeText={(value) =>
            setItemEntry({ ...itemEntry, ipName: value })
          }
        />
        <Input
          style={styles.input}
          value={itemEntry.username}
          placeholder="Username"
          textStyle={styles.inputText}
          autoCapitalize="none"
          accessoryLeft={UserIcon}
          onChangeText={(value) =>
            setItemEntry({ ...itemEntry, username: value })
          }
        />
        <Input
          style={styles.input}
          value={itemEntry.password}
          secureTextEntry={secureTextEntry}
          accessoryRight={passwordToggle}
          accessoryLeft={PasswordIcon}
          autoCapitalize="none"
          textStyle={styles.inputText}
          placeholder="Password"
          onChangeText={(value) =>
            setItemEntry({ ...itemEntry, password: value })
          }
        />
        <View style={styles.buttonContainer}>
          {!isEdit && (
            <Button
              size="medium"
              status="success"
              accessoryLeft={SaveIcon}
              onPress={saveHandler}
              disabled={
                !(
                  itemEntry.ip &&
                  itemEntry.ipName &&
                  itemEntry.username &&
                  itemEntry.password
                )
              }
            >
              SAVE
            </Button>
          )}
          {isEdit && (
            <>
              <Button
                size="medium"
                status="primary"
                accessoryLeft={UpdateIcon}
                disabled={JSON.stringify(item) === JSON.stringify(itemEntry)}
                onPress={updateHandler}
              >
                UPDATE
              </Button>
              <Button
                size="medium"
                status="danger"
                accessoryLeft={DeleteIcon}
                onPress={deleteHandler}
              >
                DELETE
              </Button>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(21,22,27)",
  },
  title: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
    color: "blue",
    borderWidth: 1,
    borderColor: "white",
  },
  topNavigation: {
    marginBottom: 100,
    height: 70,
    borderBottomWidth: 2,
    backgroundColor: "rgb(38,38,48)",
  },
  buttonContainer: {
    marginTop: 50,
    marginHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputText: {
    color: "white",
  },
});
