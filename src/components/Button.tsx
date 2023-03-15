import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  textColor?: string;
};

export function Button({ textColor = "gray.100", title, ...props }: Props) {
  return (
    <NativeBaseButton
      h="42px"
      {...props}
      fontFamily="heading"
      borderRadius="6px"
    >
      <Text color={textColor} fontFamily="heading">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
