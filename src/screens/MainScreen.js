import {
  Button,
  Divider,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { AddIcon, ItemIcon } from "../components/IconComponents";
import { AppDataContext } from "../context";

export const MainScreen = ({ navigation }) => {
  const { data } = React.useContext(AppDataContext);
  const openItemAccessory = (item) => (
    <Button
      size="small"
      status="info"
      onPress={() => navigation.navigate("WebViewScreen", { item: item })}
    >
      OPEN
    </Button>
  );

  const renderAddAction = () => (
    <TopNavigationAction
      icon={AddIcon}
      onPress={() =>
        navigation.navigate("ActionScreen", {
          action: "add",
          item: false,
        })
      }
    />
  );

  const renderItem = ({ item }) => (
    <ListItem
      style={styles.listItem}
      title={(evaProps) => (
        <Text {...evaProps} style={styles.itemTitle}>
          {item.ipName}
        </Text>
      )}
      description={(evaProps) => (
        <Text {...evaProps} style={styles.itemDesc}>
          {item.ip}
        </Text>
      )}
      accessoryLeft={ItemIcon}
      accessoryRight={() => openItemAccessory(item)}
      ItemSeparatorComponent={Divider}
      onPress={() =>
        navigation.navigate("ActionScreen", { action: "edit", item })
      }
    />
  );

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
        accessoryRight={renderAddAction}
      />
      <List data={data} renderItem={renderItem} style={styles.listContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    height: 70,
    backgroundColor: "rgb(38,38,48)",
  },
  title: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  listItem: {
    height: 85,
    borderLeftWidth: 15,
    borderLeftColor: "rgba(162,285,13,0.7)",
    paddingRight: 35,
    backgroundColor: "rgb(38,38,48)",
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  itemDesc: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 7,
    fontStyle: "italic",
    letterSpacing: 0.8,
  },
  listContainer: {
    backgroundColor: "rgb(21,22,27)",
  },
});
