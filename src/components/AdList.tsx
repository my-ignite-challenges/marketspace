import { FlatList, Text, VStack } from "native-base";

import { Ad } from "./Ad";
import { AdProps } from "../@types";

type Props = {
  data: AdProps[];
};

export function AdList({ data }: Props) {
  const numberOfColumns = data.length > 1 ? 2 : 1;

  return (
    <VStack flex={1}>
      <FlatList
        key={numberOfColumns}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Ad data={item} index={index} mr={index % 2 === 0 ? 5 : 0} mb={6} />
        )}
        numColumns={numberOfColumns}
        _contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text color="gray.600" textAlign="center" fontFamily="heading">
            {data.length > 0
              ? "Nenhum anúncio até o momento."
              : "Nenhum anúncio correspondente à sua busca."}
          </Text>
        )}
      />
    </VStack>
  );
}
