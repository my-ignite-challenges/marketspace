import { HStack, Icon, Pressable, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  bgColor: string;
  textColor?: string;
  title: string;
  isDeletable?: boolean;
};

export function Chip({
  bgColor,
  isDeletable = false,
  textColor = "#FFFFFF",
  title,
}: Props) {
  return (
    <HStack
      bgColor={bgColor}
      w="76px"
      h={7}
      rounded="2xl"
      alignItems="center"
      p="6px"
      pl={4}
      space={1}
    >
      <Text color={textColor} fontSize="xs" fontFamily="heading">
        {title.toUpperCase()}
      </Text>

      {isDeletable && (
        <Pressable>
          <Icon
            as={Ionicons}
            name="md-close-circle-sharp"
            color="gray.200"
            size={4}
          />
        </Pressable>
      )}
    </HStack>
  );
}
