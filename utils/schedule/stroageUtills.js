import * as SecureStore from "expo-secure-store";

// 데이터 저장
export const saveDataSecurely = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} 저장 성공`);
  } catch (error) {
    console.error("SecureStore 저장 실패:", error);
  }
};

// 데이터 불러오기
export const getDataSecurely = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("SecureStore 불러오기 실패:", error);
    return null;
  }
};

// 데이터 삭제
export const deleteDataSecurely = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} 삭제 성공`);
  } catch (error) {
    console.error("SecureStore 삭제 실패:", error);
  }
};