import { IPressableProps, Pressable, Text } from "native-base";
import { Chip } from "./Chip";

type Props = IPressableProps & {
  isActive: boolean;
  title: string;
};

export function SelectableFilterChip({ isActive, title, ...props }: Props) {
  return (
    <Pressable {...props}>
      <Chip
        title={title}
        bgColor={isActive ? "blue.500" : "gray.300"}
        textColor={isActive ? "lightText" : "gray.500"}
      />
    </Pressable>
  );
}
