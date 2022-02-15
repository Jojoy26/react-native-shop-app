import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    category: string;
    img?: string;
    title: string;
    f: (category: string, title: string) => void;
}

const CategoryItem = ({ category, img, title, f }: Props) => {
    return(
        <TouchableOpacity style={{
            paddingLeft: 20, 
            paddingTop: useScaleSize(15), 
            paddingBottom: useScaleSize(15), 
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#bbb",
            borderBottomWidth: 1
            }} onPress={() => {
                f(category, title)
            }}>
            <Image source={{uri: img}} style={{height: useScaleSize(40), width: useScaleSize(40)}}/>
            <Text style={{marginLeft: 20, fontSize: useScaleSize(20)}}>{title}</Text>
            <AntDesign name="right" size={useScaleSize(24)} style={{position: "absolute", right: 20}}/>
        </TouchableOpacity>
    )
}

export default CategoryItem;