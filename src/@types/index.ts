export type PaymentMethod = {
  key: string;
  name: string;
};

export type ProductImage = {
  id: string;
  path: string;
};

export type AdProps = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  is_active: boolean;
  user: {
    id: string;
    avatar: string;
    name: string;
    tel: string;
  };
};

export type AdPreviewProps = {
  product_images: {
    uri: string;
  }[];
  name: string;
  user_id: string;
  description: string;
  price: number;
  payment_methods: string[];
  is_new: string;
  user: {
    id: string;
    avatar: string;
    name: string;
  };
};
