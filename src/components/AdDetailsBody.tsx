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
import { Header } from "./Header";

import adImage from "../assets/bike.png";
import { ArrowLeft } from "phosphor-react-native";
import { AdImageSlider } from "./AdImageSlider/AdImageSlider";

export function AdDetailsBody() {
  const { colors } = useTheme();

  return (
    <>
      <AdImageSlider />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdDescription />
      </ScrollView>
    </>
  );
}
