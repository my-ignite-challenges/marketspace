import { Checkbox, FormControl, ICheckboxGroupProps } from "native-base";

type Props = ICheckboxGroupProps & {
  errorMessage?: string | null;
  isRequired?: boolean;
};

export function CheckboxGroup({
  errorMessage = null,
  children,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!errorMessage} mb={4}>
      <Checkbox.Group {...props}>{children}</Checkbox.Group>

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
