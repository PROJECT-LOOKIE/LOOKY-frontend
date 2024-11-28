type Brand = string;
type Category = string;
type Price = number;
type ImageUrl = string;

export type requestNewClothDTO = {
  brand: Brand;
  category: Category;
  price: Price;
  imageUrl: ImageUrl | null;
};

export type responseClothInfoDTO = {
  id: number;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
};

export type requestRembgDTO = {
  file: string;
};
