import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Categories from "../../Pages/CategoriesPage";
import Product from "../../Pages/ProductPage";
import ProductsList from "../../Pages/ProductsListPage";

const Stack = createNativeStackNavigator()

const ProductsStack = () => {

    return (
        <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="Categories" component={Categories}/>
            <Stack.Screen name="ProductsList" component={ProductsList}/>
            <Stack.Screen name="Product" component={Product}/>
        </Stack.Navigator>
    )
}

export default ProductsStack;