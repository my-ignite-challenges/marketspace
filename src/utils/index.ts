import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

import { PaymentMethod } from "../@types";

import adImage from "../assets/bike.png";

export const ads: any[] = [
  {
    id: "1",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: false,
    isInactive: false,
  },
  {
    id: "2",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: true,
    isInactive: false,
  },
  {
    id: "3",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: false,
    isInactive: false,
  },
  {
    id: "4",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: true,
    isInactive: false,
  },
  {
    id: "5",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: true,
    isInactive: true,
  },
  {
    id: "6",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: 59,
    isNew: false,
    isInactive: true,
  },
];

export const paymentMethods = [
  {
    name: "Boleto",
    key: "boleto",
  },
  {
    name: "Pix",
    key: "pix",
  },
  {
    name: "Dinheiro",
    key: "cash",
  },
  {
    name: "Cartão de Crédito",
    key: "card",
  },
  {
    name: "Depósito Bancário",
    key: "deposit",
  },
];

export const paymentMethodsIcons = [
  {
    icon: Barcode,
    label: "boleto",
  },
  {
    icon: QrCode,
    label: "pix",
  },
  {
    icon: Money,
    label: "cash",
  },
  {
    icon: CreditCard,
    label: "card",
  },
  {
    icon: Bank,
    label: "deposit",
  },
];

export function assignIconToPaymentMethods(methods: PaymentMethod[]) {
  const paymentMethodsWithIcons = methods?.map((method) => {
    const paymentMethodIcon = paymentMethodsIcons.find(
      (methodIcon) => methodIcon.label === method.key
    );
    return { ...method, icon: paymentMethodIcon?.icon };
  });

  return paymentMethodsWithIcons;
}
