import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CalendarIcon from '../../assets/images/calendar.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { saveDataSecurely } from "../../utils/schedule/stroageUtills"; 

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

  function isSameDate(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function getWeekDates(date: Date) {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + diff
    );

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(
        monday.getFullYear(),
        monday.getMonth(),
        monday.getDate() + i
      );
      weekDates.push(d);
    }
    return weekDates;
  }

  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    const dates = getWeekDates(selectedDate);
    setWeekDates(dates);

    const newIndex = dates.findIndex((date) =>
      isSameDate(date, selectedDate)
    );

    if (newIndex !== -1) {
      setSelectedDayIndex(newIndex);
    } else {
      setSelectedDayIndex(-1); 
    }
  }, [selectedDate]);

  const showDatePicker = () => {
    setPickerVisible(true);
  };

  const hideDatePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = async (date: Date) => {
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedDate(newSelectedDate);

    const formattedDate = `${newSelectedDate.getFullYear()}-${String(
      newSelectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(newSelectedDate.getDate()).padStart(2, "0")}`;
    await saveDataSecurely("date", formattedDate);
    console.log("Selected date saved:", formattedDate);

    setPickerVisible(false);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{`${selectedYear}년 ${selectedMonth}월`}</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <CalendarIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

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

      <View style={styles.weekContainer}>
        {weekDates.map((dateObj, index) => {
          const dayOfWeek = dateObj.getDay();
          const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
          const day = dayNames[dayOfWeek];
          const dateNum = dateObj.getDate();
          const isSelected = isSameDate(dateObj, selectedDate);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                isSelected && styles.selectedDay,
              ]}
              onPress={() => {
                const newSelectedDate = new Date(
                  dateObj.getFullYear(),
                  dateObj.getMonth(),
                  dateObj.getDate()
                );
                setSelectedDayIndex(index);
                setSelectedDate(newSelectedDate);

                const formattedDate = `${newSelectedDate.getFullYear()}-${String(
                  newSelectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(newSelectedDate.getDate()).padStart(2, "0")}`;
                saveDataSecurely("date", formattedDate);
                console.log("Selected date saved:", formattedDate);
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
