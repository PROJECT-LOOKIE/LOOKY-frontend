import { getToken } from "./getToken";
import { requestPresignedDTO } from "@/model/closet/requestPresignedURL";

// 1. /api/vi/file에 POST 요청 -> url, filePath 가져오기
export const postPresignedURL = async ({
  prefix,
  fileName,
}: requestPresignedDTO) => {
  const accessToken = await getToken();

  const presignedResponse = await fetch(
    `${process.env.REACT_NATIVE_API}/api/v1/file`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        prefix: prefix,
        fileName: fileName,
      }),
    }
  );

  return presignedResponse.json();
};

// 2. url -> uploadImageToS3 에 이미지 등록 (위에서 뽑아온 presignedURL, 선택한 이미지 주소)
// uploadImageToS3(presignedUrl, selectedImage);

// 3. filePath -> 이미지 업로드 하는 api에 담아서 보내기 (closet api에 정의)
