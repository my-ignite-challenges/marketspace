import { Text, VStack } from "native-base";

import { ActiveAddsReport } from "../components/ActiveAdsReport";
import { AdList } from "../components/AdList";
import { HomeHeader } from "../components/HomeHeader";
import { Search } from "../components/Search";

export function Home() {
  return (
    <VStack flex={1} px={6} bgColor="gray.200">
      <HomeHeader />
      <ActiveAddsReport />
      <VStack>
        <Text color="gray.500">Compre produtos variados</Text>
        <Search />
      </VStack>
      <AdList />
    </VStack>
  );
}
