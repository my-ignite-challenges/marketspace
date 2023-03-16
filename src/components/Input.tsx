import { IInputProps, Input as NativeBaseInput } from "native-base";

type Props = IInputProps & {};

export function Input({ ...props }: Props) {
  return (
    <NativeBaseInput
      bgColor="gray.100"
      px={4}
      fontSize="md"
      w="full"
      h="45px"
      placeholderTextColor="gray.400"
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
