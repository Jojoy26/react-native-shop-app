import React from "react"
import { Dimensions, Text, View, TouchableOpacity, Image } from "react-native";
import useScaleSize from "../../hooks/useScaleSize";
import { ProductItemType } from "../../types/ProductItemType";

type Props = {
    grid: boolean;
    f: () => void;
    margin?: boolean;
    item: ProductItemType
}

const ProductItem = ({grid, margin, f, item}: Props) => {

    const WIDTH = Dimensions.get("window").width
    return(
        <TouchableOpacity onPress={() => {
            f()
        }}>
            <View style={{
                backgroundColor: "#fff", 
                width: !grid ? "100%" : WIDTH/2 - 15, 
                marginBottom: 10, 
                elevation: 7, 
                zIndex: 10,
                shadowColor: "#000",
                borderRadius: 3,
                overflow: "hidden",
                flexDirection: !grid ? "row" : "column",
                marginRight: margin ? 10 : 0
                }}>
                <Image source={{uri: item.images[0]}} style={{backgroundColor: "transparent", height: 220, width: !grid ? "50%": "100%"}}/>
                <View style={{padding: 4,justifyContent: "center", marginLeft: !grid ? 5 : 0}}>
                    <Text style={{color: "#444", fontWeight: "600", fontSize: useScaleSize(21)}}>{item.title}</Text>
                    <Text style={{fontWeight: "bold", color: "#2e828f", fontSize: useScaleSize(21)}}>R$ {item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem;