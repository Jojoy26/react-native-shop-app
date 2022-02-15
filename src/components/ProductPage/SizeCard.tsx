import React from "react"
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    size: string;
    f: () => void;
    index: number;
    currentSize: number;
}

const SizeCard = ({ size, index, f, currentSize }: Props) => {

    return (
        <TouchableOpacity
            onPress={f}
            style={{
            borderWidth: 2, 
            width: useScaleSize(65), 
            alignItems: "center", 
            justifyContent: "center",
            borderRadius: 3,
            borderColor:currentSize === index ? "#2e828f" : "#666",
            marginRight: 6
            }}>
            <Text style={{fontSize: useScaleSize(19), color: currentSize === index ? "#2e828f" : "#666"}}>{size}</Text>
        </TouchableOpacity>
    )
}

export default SizeCard;