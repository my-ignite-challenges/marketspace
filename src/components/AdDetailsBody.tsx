import React, { ReactNode } from "react";

import {
  Box,
  Button as NativeBaseButton,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import { AdDescription } from "./AdDescription";

import { AdImageSlider } from "./AdImageSlider/AdImageSlider";

export function AdDetailsBody() {
  return (
    <>
      <AdImageSlider />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdDescription />
      </ScrollView>
    </>
  );
}
