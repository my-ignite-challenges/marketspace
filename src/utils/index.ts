import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

import { AdProps } from "../@types";

import adImage from "../assets/bike.png";

export const ads: AdProps[] = [
  {
    id: "1",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: false,
  },
  {
    id: "2",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: true,
  },
  {
    id: "3",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: false,
  },
  {
    id: "4",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: true,
  },
  {
    id: "5",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: true,
  },
  {
    id: "6",
    image: adImage,
    ownerAvatar: "",
    title: "Tênis Vermelho",
    price: "59.90",
    isNew: false,
  },
];

export const paymentMethods = [
  {
    id: "1",
    label: "Boleto",
    icon: Barcode,
  },
  {
    id: "2",
    label: "Pix",
    icon: QrCode,
  },
  {
    id: "3",
    label: "Dinheiro",
    icon: Money,
  },
  {
    id: "4",
    label: "Cartão de Crédito",
    icon: CreditCard,
  },
  {
    id: "5",
    label: "Depósito Bancário",
    icon: Bank,
  },
];
