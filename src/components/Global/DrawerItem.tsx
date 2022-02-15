
import React from "react"
import { Text, TouchableOpacity } from "react-native";
import useScaleSize from "../../hooks/useScaleSize";


type Props = {
    title: string;
    iconName: string;
    IconLib: any;
    f: () => void;
    index: number;
    focusedIndex: number;
    size: number;
}

const DrawerItem = ({title, iconName, IconLib, f, index, focusedIndex, size}: Props) => {

    console.log(index,focusedIndex )
    return (
        <TouchableOpacity
        onPress={() => {
            f()
        }}
        style={{flexDirection: "row", alignItems: "center", marginBottom: 30}}>
            <IconLib name={iconName} size={useScaleSize(size+7)} color={focusedIndex === index ? "#008397" : "#888"}/>
            <Text style={{color: focusedIndex === index ? "#008397" : "#888", fontSize: useScaleSize(19), marginLeft: 20}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default DrawerItem;