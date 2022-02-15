import React, { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native";
import useScaleSize from "../../hooks/useScaleSize";


type Props = {
    color: string;
    title: string;
    iconName: string;
    IconLib: any;
    f: () => void;
    sizeIcon: number;
}

const AppBar = ({color, title, iconName, IconLib, f, sizeIcon}: Props) => {
    return (
        <View style={
            {
                height: 55, 
                backgroundColor: color,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }
            }>
            <Text style={{fontWeight: "600", color: "#fff", fontSize: useScaleSize(21)}}>
                {title}
            </Text>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    left: 18,
                    alignSelf: "center",
                    padding: 2
                }}
                onPress={f}>
                <IconLib 
                name={iconName} 
                color={"#fff"} 
                size={useScaleSize(sizeIcon+10)}
                />
            </TouchableOpacity>
        </View>
    )
}

export default AppBar;