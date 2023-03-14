import { IBadgeProps, Text, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";

type Props = IViewProps & {
  title: string;
  bgColor: string;
  textColor?: string;
};

export function Badge({
  title,
  textColor = "gray.100",
  bgColor,
  ...props
}: Props) {
  return (
    <View
      p={0}
      w="50px"
      h="17px"
      bgColor={bgColor}
      rounded="xl"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Text color={textColor} fontSize="2xs" fontFamily="heading">
        {title.toUpperCase()}
      </Text>
    </View>
  );
}
