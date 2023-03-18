import { ScrollView } from "native-base";

import { AdDescription } from "./AdDescription";

import { AdImageSlider } from "./AdImageSlider/AdImageSlider";

export function AdDetailsBody() {
  return (
    <>
      <AdImageSlider />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdDescription />
      </ScrollView>
    </>
  );
}
