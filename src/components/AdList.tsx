import { Box, FlatList, VStack } from "native-base";
import { ads } from "../utils";
import { Ad } from "./Ad";

export function AdList() {
  return (
    <VStack flex={1}>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <Ad data={item} index={index} />}
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
