import { HStack, Icon, Pressable, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

type Props = IHStackProps & {
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
  ...props
}: Props) {
  return (
    <HStack
      bgColor={bgColor}
      w="76px"
      rounded="2xl"
      alignItems="center"
      justifyContent="center"
      p="6px"
      space={1}
      {...props}
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
