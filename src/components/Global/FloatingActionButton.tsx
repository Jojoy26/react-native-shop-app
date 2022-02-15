import React, { useContext } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { NavigationContext } from '@react-navigation/native';
import useScaleSize from "../../hooks/useScaleSize";

const FloatingActionButton = () => {

    const navigation = useContext(NavigationContext)


    return (
        <View style={{
            position: "absolute",
            zIndex: 10,
            elevation: 10,
            bottom: 10,
            right: 10
        }}>
            <TouchableOpacity 
                onPress={() => {
                    navigation?.navigate("Cart")
                }}
                style={{
                padding: useScaleSize(21), 
                backgroundColor: "#008397", 
                borderRadius: 50,
                elevation: 2,
                zIndex: 10
                }}>
                <FontAwesome5 name="shopping-cart" color={"#fff"} size={useScaleSize(23)}/>
            </TouchableOpacity>
        </View>
        
    )
}

export default FloatingActionButton;