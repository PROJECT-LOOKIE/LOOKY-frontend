import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CalendarIcon from '../../assets/images/calendar.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

// Props 타입 정의
interface HeaderProps {
  selectedDayIndex: number;
  setSelectedDayIndex: (index: number) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function Header({
  selectedDayIndex,
  setSelectedDayIndex,
  selectedDate,
  setSelectedDate,
}: HeaderProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;

  function getWeekDates(date: Date) {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDates.push(d);
    }
    return weekDates;
  }

  const weekDates = getWeekDates(selectedDate);

  const showDatePicker = () => {
    setPickerVisible(true);
  };

  const hideDatePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{`${selectedYear}년 ${selectedMonth}월`}</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <CalendarIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* 모달로 날짜 선택기 오버레이 */}
      <Modal
        isVisible={isPickerVisible}
        backdropOpacity={0}
        style={styles.modalStyle}
        onBackdropPress={hideDatePicker}
        useNativeDriver={true}
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              if (date) {
                handleConfirm(date);
              }
            }}
            locale="ko-KR"
            themeVariant="light"
          />
        </View>
      </Modal>

      {/* 주간 날짜 표시 */}
      <View style={styles.weekContainer}>
        {weekDates.map((dateObj, index) => {
          const dayOfWeek = dateObj.getDay();
          const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
          const day = dayNames[dayOfWeek];
          const dateNum = dateObj.getDate();
          const isSelected = index === selectedDayIndex;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                isSelected && styles.selectedDay,
              ]}
              onPress={() => {
                setSelectedDayIndex(index);
                setSelectedDate(dateObj); 
              }}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                ]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedDateText,
                ]}
              >
                {dateNum}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    paddingTop: 74,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 64,
    alignItems: 'center',
  },

  modalStyle: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  pickerContainer: {
    position: 'absolute',
    top: 110, 
    left: 20,
    right: 70,
    backgroundColor: '#fff',
    borderRadius: 20, 
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4E4E4E',
    borderRadius: 37,
    width: 40,
    height: 60,
  },
  selectedDay: {
    backgroundColor: "#C9FF65", 
    borderRadius: 37,
    shadowColor: "#C9FF65", 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.6, 
    shadowRadius: 10, 
    elevation: 10, 
  },
  dayText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  selectedDayText: {
    color: '#000',
    fontSize: 14,
  },
  dateText: {
    fontSize: 20,
    color: '#000',
  },
  selectedDateText: {
    color: '#000',
  },
});