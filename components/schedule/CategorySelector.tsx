import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ paddingVertical: 0 }}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonSelected,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextSelected,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    marginBottom: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#121212",
    backgroundColor: "#fff",
    alignItems: "center",
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#C6FF6B",
    borderColor: "#121212",
  },
  categoryText: {
    fontSize: 18,
    color: "#121212",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    fontWeight: "bold",
    color: "#121212",
  },
});
