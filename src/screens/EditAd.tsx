import { useRoute } from "@react-navigation/native";

import { AdForm } from "../components/AdForm";

type RouteParams = {
  adId: string;
};

export function EditAd() {
  const { params } = useRoute();
  const { adId } = params as RouteParams;

  return <AdForm adId={adId} />;
}
