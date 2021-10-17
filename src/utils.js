import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const addItem = (data, item) => {
  item.id = uuid.v4();

  data = [...data, item];

  return data;
};

export const deleteItem = (data, id) => {
  return data.filter((item) => item.id !== id);
};

export const updateItem = (data, item) => {
  const deleted = deleteItem(data, item.id);
  const updated = addItem(deleted, item);

  return updated;
};

export const storeData = (value) => {
  try {
    AsyncStorage.setItem("LOCAL_IP_DATA", JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const retrieveData = () => {
  try {
    AsyncStorage.getItem("LOCAL_IP_DATA").then((value) => {
      return JSON.parse(value);
    });
  } catch (e) {
    console.log(e);
  }
};
