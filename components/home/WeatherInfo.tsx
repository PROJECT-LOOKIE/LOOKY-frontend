import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import EyeIcon from "../../assets/images/eye.svg";

interface WeatherData {
  maxTemp: string;
  minTemp: string;
  commentary: string;
}

interface WeatherInfoProps {
  selectedDate: Date;
}

const serviceKey = "6If6KftJqxCrVs%2FIrAavelYdOpJ9f6QYJ%2BnKWsmf8hof72rINbR%2Fs5qyuLNoM2%2FSZkdy%2FgzuoyO1z3v1nBftEg%3D%3D"; // 자신의 인코딩된 서비스 키로 대체하세요

export default function WeatherInfo({ selectedDate }: WeatherInfoProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const baseDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '');

      const baseTime = getClosestBaseTime(selectedDate);

      const nx = "60"; // 예보 지점의 X 좌표값 임의 지정
      const ny = "127"; // 예보 지점의 Y 좌표값 임의 지정

      const queryParams = `?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

      const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst${queryParams}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();

        if (data.response.header.resultCode !== "00") {
          if (["03", "24"].includes(data.response.header.resultCode)) {
            // 데이터가 없을 때
            setWeatherData(null);
            return;
          } else {
            throw new Error(`API 오류: ${data.response.header.resultMsg}`);
          }
        }

        const items = data.response.body.items.item;

        const maxTempItem = items.find((item: any) => item.category === "TMX");
        const minTempItem = items.find((item: any) => item.category === "TMN");

        let maxTemp = "정보 없음";
        let minTemp = "정보 없음";

        if (maxTempItem && maxTempItem.fcstValue !== "-999") {
          maxTemp = maxTempItem.fcstValue;
        }

        if (minTempItem && minTempItem.fcstValue !== "-999") {
          minTemp = minTempItem.fcstValue;
        }

        if (maxTemp === "정보 없음" || minTemp === "정보 없음") {
          const tempItems = items.filter((item: any) => item.category === "T3H");
          const temps = tempItems.map((item: any) => parseFloat(item.fcstValue));

          if (temps.length > 0) {
            maxTemp = Math.max(...temps).toString();
            minTemp = Math.min(...temps).toString();
          } else {
            setWeatherData(null);
            return;
          }
        }

        const parsedData: WeatherData = {
          maxTemp,
          minTemp,
          commentary: generateCommentary(parseFloat(maxTemp), parseFloat(minTemp))
        };

        setWeatherData(parsedData);
      } catch (error) {
        setWeatherData(null); 
      }
    };

    fetchWeatherData();
  }, [selectedDate]);

  function getClosestBaseTime(date: Date): string {
    const hour = date.getHours();
    const minute = date.getMinutes();

    // 발표 시각 목록 (기상청 발표 시각)
    const baseTimes = ["2300", "2000", "1700", "1400", "1100", "0800", "0500", "0200"];

    for (let i = 0; i < baseTimes.length; i++) {
      const baseHour = parseInt(baseTimes[i].substring(0, 2), 10);
      if (hour >= baseHour) {
        return baseTimes[i];
      }
    }

    return "2300";
  }

  function generateCommentary(maxTemp: number, minTemp: number): string {
    const tempDifference = maxTemp - minTemp;

    // 눈 비 있을때 추가 
    if (tempDifference > 10) {
      return "일교차가 크니 겉옷을 준비하세요.";
    } else if (maxTemp >= 30) {
      return "오늘은 무더운 날씨입니다. 시원한 옷차림을 추천해요.";
    } else if (maxTemp >= 20) {
      return "활동하기 좋은 날씨입니다.";
    } else if (maxTemp >= 10) {
      return "쌀쌀한 날씨니 따뜻하게 입으세요.";
    } else {
      return "추운 날씨입니다. 외출 시 두꺼운 옷을 입으세요.";
    }
  }

  return (
    <View>
      <View style={styles.emojiContainer}>
        <EyeIcon width={40} height={25} />
      </View>

      <View style={styles.weatherContainer}>
        {weatherData ? (
          <>
            <Text style={styles.weatherText}>
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일은{" "}
              <Text style={styles.boldText}>최고온도 {weatherData.maxTemp}도</Text>,{" "}
              <Text style={styles.boldText}>최저 온도 {weatherData.minTemp}도</Text>에요.
            </Text>
            <Text style={styles.weatherText}>
              {weatherData.commentary}
            </Text>
          </>
        ) : (
          <Text style={styles.weatherText}>날씨 정보는 최근 3일 데이터만 제공합니다</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    marginTop: 16,
    marginLeft: 20,
  },
  weatherContainer: {
    backgroundColor: "#C6FF6B",
    borderColor: "#121212",
    borderWidth: 2,
    borderRadius: 8,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  weatherText: {
    fontSize: 16,
    color: "#121212",
  },
  boldText: {
    fontWeight: "bold",
    color: "#121212",
  },
});