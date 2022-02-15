import React from "react"
import { Text, TouchableOpacity } from "react-native";
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    title: string;
    f: () => void;
    color?: string;
}

const CustomButton = ({ title, f, color="#008397" }: Props) => {
    return (
        <TouchableOpacity
        onPress={f}
        style={{
            height: useScaleSize(55),
            width: "100%",
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
        }}>
            <Text style={{fontSize: useScaleSize(20), fontWeight: "600", color: "#fff"}}>{title}</Text>
        </TouchableOpacity> 
    )
}

export default CustomButton;