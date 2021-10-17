import { Icon } from "@ui-kitten/components";
import React from "react";

export const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const AddIcon = (props) => (
  <Icon
    {...props}
    name="plus-square-outline"
    fill="#DFD444"
    style={{ width: 32, height: 32 }}
  />
);

export const IpIcon = (props) => <Icon {...props} name="pin-outline" />;

export const ItemIcon = (props) => (
  <Icon {...props} name="layers-outline" fill="#DFD444" />
);

export const SaveIcon = (props) => (
  <Icon {...props} name="checkmark-circle-2-outline" />
);

export const UpdateIcon = (props) => <Icon {...props} name="flip-2-outline" />;

export const DeleteIcon = (props) => <Icon {...props} name="trash-2-outline" />;

export const IpNameIcon = (props) => <Icon {...props} name="globe-outline" />;

export const UserIcon = (props) => <Icon {...props} name="person-outline" />;

export const PasswordIcon = (props) => (
  <Icon {...props} name="unlock-outline" />
);
