import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number;
};

export function Avatar({ size, ...props }: Props) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth="3px"
      borderColor="blue.500"
      alt="Imagem do usuário"
      {...props}
    />
  );
}
