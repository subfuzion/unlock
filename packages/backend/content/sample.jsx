import React from "react";
import { Text } from "ink";

export default function ({ name = "Stranger" }) {
  return (
    <Text>
      Hello, <Text color="green">{name}</Text>
    </Text>
  );
}
