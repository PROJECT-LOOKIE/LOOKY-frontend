import { CodiInfo } from "@/model/look/requestCodi";
import { getToken } from "./getToken";
import { REACT_NATIVE_API } from "@env";

// 코디 정보 업로드
export const postLook = async (codiData: CodiInfo) => {
  const accessToken = await getToken();

  await fetch(`${REACT_NATIVE_API}/api/v1/closet/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      codiData,
    }),
  });
};
