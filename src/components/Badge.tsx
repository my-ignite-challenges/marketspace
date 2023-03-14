import { Text, View } from "native-base";

type Props = {
  title: string;
  bgColor: string;
};

export function Badge({ title, bgColor }: Props) {
  return (
    <View
      p={0}
      w="50px"
      h="17px"
      bgColor={bgColor}
      rounded="xl"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top={1}
      right={1}
    >
      <Text color="gray.100" fontSize="2xs" fontFamily="heading">
        {title.toUpperCase()}
      </Text>
    </View>
  );
}
