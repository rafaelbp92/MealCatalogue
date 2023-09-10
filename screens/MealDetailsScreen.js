import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites"

function MealDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const meal = route.params.mealDetails;
  //const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  //const mealIsFavorite = favoriteMealsContext.ids.includes(meal.id);
  const mealIsFavorite = favoriteMealIds.includes(meal.id);

  function changeFavoriteStatusPressHandler() {
    if (mealIsFavorite) {
      //favoriteMealsContext.removeFavorite(meal.id);
      dispatch(removeFavorite({id: meal.id}));
    } else {
      //favoriteMealsContext.addFavorite(meal.id);
      dispatch(addFavorite({id: meal.id}));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => {
        return <IconButton icon={mealIsFavorite ? "star" : "star-outline"} color="white" onPress={changeFavoriteStatusPressHandler} />;
      },
    });
  }, [navigation, meal, changeFavoriteStatusPressHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.detailItem}>{meal.duration}m</Text>
        <Text style={styles.detailItem}>{meal.complexity.toUpperCase()}</Text>
        <Text style={styles.detailItem}>
          {meal.affordability.toUpperCase()}
        </Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>

      {meal.ingredients.map((ingredient) => (
        <Text style={styles.textItem} key={ingredient}>
          {ingredient}
        </Text>
      ))}
      <View style={styles.subTitleContainer}>
        <Text style={styles.subtitle}>Steps</Text>
      </View>

      {meal.steps.map((step) => (
        <Text style={styles.textItem} key={step}>
          {step}
        </Text>
      ))}
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomColor: "#7ee6a1",
    borderBottomWidth: 2,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  textItem: {
    padding: 6,
    marginHorizontal: 4,
    textAlign: "center",
  },
});
