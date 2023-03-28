import {
  Checkbox,
  FormControl,
  ICheckboxGroupProps,
  IRadioGroupProps,
  Radio,
} from "native-base";

type Props = IRadioGroupProps & {
  errorMessage?: string | null;
  isRequired?: boolean;
};

export function RadioGroup({
  errorMessage = null,
  children,
  isInvalid,
  ...props
}: Props) {
  return (
    <FormControl isInvalid={!!errorMessage || isInvalid} mb={4}>
      <Radio.Group {...props}>{children}</Radio.Group>

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
