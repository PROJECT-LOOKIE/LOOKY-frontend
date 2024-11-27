import Colors from "@/constants/Colors";
import { GroupInfoDTO } from "@/model/cordi/groupInfo";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal"; // react-native-modal 임포트

type ModalProps = {
  isShown: boolean;
  title: string;
  grpInfo?: GroupInfoDTO;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isShown,
  title,
  grpInfo,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <View style={styles.container}>
      {/* react-native-modal을 이용한 모달 컴포넌트 */}
      <Modal
        isVisible={isShown} // 모달의 표시 여부
        animationIn="zoomIn" // 모달이 나타날 때 애니메이션 (서서히 나타남)
        animationOut="zoomOut" // 모달이 사라질 때 애니메이션 (서서히 사라짐)
        // onBackButtonPress={toggleModal} // 뒤로 가기 버튼 클릭 시 모달 닫기
        style={styles.modal} // Modal의 스타일 추가
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "center", // 모달을 화면 중앙에 배치
    alignItems: "center", // 모달을 화면 중앙에 배치
    margin: 0, // 모달의 기본 마진을 제거하여 화면의 끝까지 꽉 차게 함
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 48,
    gap: 8,
  },
  confirmBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "black",
  },
  confirmText: {
    fontSize: 20,
    color: Colors.yellowGreen,
    fontWeight: "bold",
  },
  cancelBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: Colors.gray200,
  },
  cancelText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
