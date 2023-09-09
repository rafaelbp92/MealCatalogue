import { StyleSheet, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";

function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.includes(categoryId);
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  function renderMealItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealDetails", {
        mealDetails: itemData.item
      });
    }

    return <MealItem meal={itemData.item} onPress={pressHandler}/>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
