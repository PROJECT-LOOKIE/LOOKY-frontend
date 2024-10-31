import React from "react";
import { Tabs } from "expo-router";
import { ImageSourcePropType, Pressable } from "react-native";

import { Image } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
    closet: {
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
    { name: "closet", title: "옷장" },
    { name: "look", title: "룩" },
    { name: "mypage", title: "마이" },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          borderTopWidth: 2,
          backgroundColor: "white",
          borderTopColor: "black",
          height: "10%",
        },
        tabBarItemStyle: {
          backgroundColor: Colors.background,
        },
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
