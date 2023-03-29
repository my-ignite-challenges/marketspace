import { FlatList, VStack } from "native-base";

import { Ad } from "./Ad";
import { AdProps } from "../@types";

type Props = {
  data: AdProps[];
};

export function AdList({ data }: Props) {
  return (
    <VStack flex={1}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Ad data={item} index={index} mr={index % 2 === 0 ? 5 : 0} mb={6} />
        )}
        numColumns={data.length > 1 ? 2 : 1}
        _contentContainerStyle={
          data.length > 1
            ? {
                alignItems: "center",
                paddingBottom: 10,
              }
            : {}
        }
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
