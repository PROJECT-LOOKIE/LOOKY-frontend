import React from "react";
import { Tabs, useSegments } from "expo-router";
import { ImageSourcePropType, Pressable } from "react-native";

import { Image } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segment = useSegments();

  type TabIconType = {
    [key: string]: {
      default: ImageSourcePropType;
      active: ImageSourcePropType;
    };
  };

  const TabIcons: TabIconType = {
    home: {
      default: require("../../assets/images/homeTabDefault.png"),
      active: require("../../assets/images/homeTabActive.png"),
    },
    "closet/index": {
      default: require("../../assets/images/closetTabDefault.png"),
      active: require("../../assets/images/closetTabActive.png"),
    },
    look: {
      default: require("../../assets/images/lookTabDefault.png"),
      active: require("../../assets/images/lookTabActive.png"),
    },
    mypage: {
      default: require("../../assets/images/mypageTabDefault.png"),
      active: require("../../assets/images/mypageTabActive.png"),
    },
  };

  const TabLists = [
    { name: "home", title: "홈" },
    { name: "closet/index", title: "옷장" },
    { name: "look", title: "룩" },
    { name: "mypage", title: "마이" },
  ];

  // 일단... 페이지 경로가 3개 이상일 때 gnb 사라지게 해둠
  const GNBshown = segment.length >= 3 ? 0 : 1;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: GNBshown
          ? {
              borderTopWidth: 2,
              backgroundColor: "white",
              borderTopColor: "black",
              height: "10%",
            }
          : { display: "none" },
      }}
    >
      {TabLists.map((tab, i) => (
        <Tabs.Screen
          key={i}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? TabIcons[tab.name].active
                    : TabIcons[tab.name].default
                }
                style={{ width: 32, height: 32, marginBottom: -8 }}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
