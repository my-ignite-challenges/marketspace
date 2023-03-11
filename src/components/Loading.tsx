import { Spinner, Center } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bgColor="gray.300">
      <Spinner color="blue.700" size="sm" />
    </Center>
  );
}
