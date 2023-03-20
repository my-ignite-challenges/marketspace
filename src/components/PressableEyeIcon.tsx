import { Pressable, useTheme } from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

type Props = {
  contentIsVisible: boolean;
  onIconPress: () => void;
};

export function PressableEyeIcon({ contentIsVisible, onIconPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onIconPress} mr={3}>
      {contentIsVisible ? (
        <Eye size={20} color={colors.gray[500]} />
      ) : (
        <EyeSlash size={20} color={colors.gray[500]} />
      )}
    </Pressable>
  );
}
