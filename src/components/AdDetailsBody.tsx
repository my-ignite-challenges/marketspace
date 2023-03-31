import { ScrollView } from "native-base";

import { AdDescription } from "./AdDescription";
import { AdImageSlider } from "./AdImageSlider/AdImageSlider";

import { AdProps } from "../@types";

type Props = {
  data: AdProps;
};

export function AdDetailsBody({ data }: Props) {
  return (
    <>
      <AdImageSlider data={data} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdDescription data={data} />
      </ScrollView>
    </>
  );
}
