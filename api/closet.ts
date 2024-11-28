import { requestNewClothDTO } from "@/model/closet/requestNewCloth";
import { getToken } from "./getToken";

// 사용자 옷 추가
export const postClothInfo = async ({
  brand,
  category,
  price,
  imageUrl,
}: requestNewClothDTO) => {
  const accessToken = await getToken();

  await fetch(`https://lookie.store/api/v1/closet/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      brand: brand,
      category: category,
      price: price,
      imageUrl: imageUrl,
    }),
  });
};

// 사용자의 모든 옷 조회
export const getClosetItems = async () => {
  const accessToken = await getToken();

  const response = await fetch(`https://lookie.store/api/v1/closet/item`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};

// 옷 상세조회
export const getClothItem = async (itemId: number) => {
  const accessToken = await getToken();

  const response = await fetch(
    `https://lookie.store/api/v1/closet/item/${itemId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.json();
};

// 상세 옷 삭제
export const deleteClothItem = async (itemId: number) => {
  const accessToken = await getToken();

  await fetch(`https://lookie.store/api/v1/closet/item/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
