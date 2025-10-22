import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  course: string;
};

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<"view" | "add">("view");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("Main");

  const addMenuItem = () => {
    if (name.trim() && price.trim()) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: name.trim(),
        price: price.trim(),
        course: course,
      };
      setMenuItems((prev) => [...prev, newItem]);
      setName("");
      setPrice("");
      setCourse("Main");
      setActiveTab("view");
    }
  };

  return (
    <View style={styles.fullContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Restaurant Header */}
      <View style={styles.header}>
        <Text style={styles.restaurantName}>🍽️ Christoffel's Kitchen</Text>
        <Text style={styles.restaurantSubtitle}>Fine Dining Experience</Text>
      </View>

      {/* Custom Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "view" && styles.activeTab]} 
          onPress={() => setActiveTab("view")}
        >
          <Text style={[styles.tabText, activeTab === "view" && styles.activeTabText]}>
            View Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "add" && styles.activeTab]} 
          onPress={() => setActiveTab("add")}
        >
          <Text style={[styles.tabText, activeTab === "add" && styles.activeTabText]}>
            Add Item
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "view" ? (
          <>
            <Text style={styles.title}>Our Menu</Text>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>R{item.price}</Text>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No menu items added yet</Text>
                  <Text style={styles.emptySubtext}>Tap "Add Item" to create your menu</Text>
                </View>
              }
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>Add New Menu Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name (e.g., Garlic Bread, Steak, Chocolate Cake)"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter price (e.g., 45, 120, 85)"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Select Course Type:</Text>
            <View style={styles.courseButtons}>
              {["Starter", "Main", "Dessert", "Drink"].map((courseOption) => (
                <TouchableOpacity
                  key={courseOption}
                  style={[
                    styles.courseButton,
                    course === courseOption && styles.selectedCourseButton,
                  ]}
                  onPress={() => setCourse(courseOption)}
                >
                  <Text
                    style={
                      course === courseOption
                        ? styles.selectedCourseText
                        : styles.courseText
                    }
                  >
                    {courseOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
              <Text style={styles.addButtonText}>Add to Menu</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#fff7e6",
  },
  header: {
    backgroundColor: "#cc6600",
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  restaurantSubtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    fontStyle: "italic",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#cc6600",
  },
  tabText: {
    fontSize: 16,
    color: "#cc6600",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#cc6600",
  },
  itemCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
    fontWeight: "bold",
  },
  itemCourse: {
    fontSize: 14,
    color: "#cc6600",
    marginTop: 5,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  courseButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  courseButton: {
    padding: 12,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#cc6600",
    minWidth: 80,
    alignItems: "center",
    backgroundColor: "white",
  },
  selectedCourseButton: {
    backgroundColor: "#cc6600",
  },
  courseText: {
    color: "#cc6600",
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedCourseText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#cc6600",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});