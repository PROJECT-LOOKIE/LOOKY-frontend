type Brand = string;
type Category = string;
type Price = number;
type ImageUrl = string;

export type requestNewClothDTO = {
  brand: Brand;
  category: Category;
  price: Price;
  imageUrl: ImageUrl;
};

export type responseClothInfoDTO = {
  id: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
};
