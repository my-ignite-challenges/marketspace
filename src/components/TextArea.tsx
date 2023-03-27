import {
  FormControl,
  TextArea as NativeBaseTextarea,
  ITextAreaProps,
} from "native-base";

type Props = ITextAreaProps & {
  errorMessage?: string | null;
};

export function TextArea({ errorMessage = null, isInvalid, ...props }: Props) {
  const hasErrors = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={hasErrors} mb={4}>
      <NativeBaseTextarea
        bgColor="gray.100"
        px={4}
        fontSize="md"
        w="full"
        h={40}
        placeholder="Descrição do produto"
        placeholderTextColor="gray.400"
        borderColor="transparent"
        borderRadius="6px"
        isInvalid={hasErrors}
        autoCompleteType
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
