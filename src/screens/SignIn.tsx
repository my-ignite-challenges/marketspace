import { VStack } from "native-base";
import { SignInFooter } from "../components/SignIn/SignInFooter";
import { SignInTopBox } from "../components/SignIn/SignInTopBox";

export function SignIn() {
  return (
    <VStack
      flex={1}
      bgColor="gray.100"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <SignInTopBox />
      <SignInFooter />
    </VStack>
  );
}
