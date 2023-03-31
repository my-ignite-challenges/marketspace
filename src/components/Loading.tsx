import { Spinner, Center } from "native-base";

type Props = {
  bgColor?: string;
};

export function Loading({ bgColor }: Props) {
  return (
    <Center flex={1} bgColor={bgColor}>
      <Spinner color="blue.700" size="sm" />
    </Center>
  );
}
