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
