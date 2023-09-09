import { Text, View } from "react-native";

function MealItem({meal}) {
    return <View>
        <Text>{meal.title}</Text>
    </View>; 
}

export default MealItem;