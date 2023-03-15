import { IInputProps, Input as NativeBaseInput, useTheme } from "native-base";

type Props = IInputProps & {};

export function Input({ ...props }: Props) {
  const { colors } = useTheme();
  return (
    <NativeBaseInput
      bgColor="gray.100"
      px={4}
      fontSize="md"
      w="full"
      h="45px"
      placeholderTextColor={colors.gray[400]}
      borderColor="transparent"
      borderRadius="6px"
      _focus={{
        borderWidth: 1,
        borderColor: "blue.500",
      }}
      {...props}
    />
  );
}
