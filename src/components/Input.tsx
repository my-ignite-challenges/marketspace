import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...props }: Props) {
  const hasErrors = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={hasErrors} mb={4}>
      <NativeBaseInput
        bgColor="gray.100"
        px={4}
        fontSize="md"
        w="full"
        h="45px"
        placeholderTextColor="gray.400"
        isInvalid={hasErrors}
        borderColor="transparent"
        borderRadius="6px"
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          borderWidth: 1,
          borderColor: "blue.500",
        }}
        {...props}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
