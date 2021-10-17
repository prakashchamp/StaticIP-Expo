import React from "react";
import { WebView } from "react-native-webview";
import {
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { BackIcon } from "../components/IconComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export const WebViewScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const auth = `
    document.querySelector('#username').value = '${item.username}';
    document.querySelector('#passwd').value = '${item.password}';
    document.getElementById('ok').click();
  `;

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.navigate("MainScreen")}
    />
  );
  return (
    <SafeAreaView style={styles.flexContainer}>
      <TopNavigation
        style={styles.topNavigation}
        title={(evaProps) => (
          <Text {...evaProps} style={styles.title}>
            {`Web - ${item.ipName}`}
          </Text>
        )}
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <WebView
        source={{ uri: `http://${item.ip}/` }}
        injectedJavaScript={auth}
        pullToRefreshEnabled={true}
        renderLoading={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  topNavigation: {
    height: 70,
    backgroundColor: "rgb(38,38,48)",
  },
});
