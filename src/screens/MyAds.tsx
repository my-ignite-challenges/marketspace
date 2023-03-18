import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Select, Text, useTheme, VStack } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";

import { Header } from "../components/Header";
import { Ad } from "../components/Ad";
import { ads } from "../utils";
import { AppStackNavigatorRoutes } from "../routes/app.routes";

export function MyAds() {
  const [selectedAdFilter, setSelectedAdFilter] = useState("todos");

  const { navigate } = useNavigation<AppStackNavigatorRoutes>();

  const { colors } = useTheme();

  return (
    <VStack bgColor="gray.200" flex={1} px={6}>
      <Header
        title="Meus anúncios"
        rightIcon={<Plus color={colors.gray[700]} size={24} />}
        onRightIconPress={() => navigate("CreateAd")}
      />

      <HStack alignItems="center" justifyContent="space-between" mb={5}>
        <Text color="gray.600">9 anúncios</Text>
        <Select
          w={20}
          h={8}
          accessibilityLabel="Selecione uma opção"
          placeholder="Selecionar"
          _selectedItem={{
            bg: "blue.500",
            _text: {
              color: "gray.100",
            },
          }}
          dropdownIcon={<CaretDown size={16} style={{ marginRight: 4 }} />}
          selectedValue={selectedAdFilter}
          onValueChange={(itemValue: string) => {
            setSelectedAdFilter(itemValue);
          }}
          color="gray.700"
        >
          <Select.Item label="Todos" value="todos" />
          <Select.Item label="Usados" value="usado" />
          <Select.Item label="Novos" value="novo" />
        </Select>
      </HStack>

      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Ad data={item} index={index} showAvatar={false} />
        )}
        numColumns={2}
        _contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
