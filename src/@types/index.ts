type PaymentMethod = {
  key: string;
  value: string;
};

type ProductImage = {
  id: string;
  path: string;
};

export type AdProps = {
  id: string;
  user_id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
  is_active?: boolean;
  user: {
    id: string;
    avatar: string;
  };
};
