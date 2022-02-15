import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    message: string
    styleSnackBar: any,
    error?: boolean
}

const SnackBar = ({ message, styleSnackBar, error }: Props) => {
    return (
        <Animated.View style={[{
            zIndex: 10,
            elevation: 10,
            width: "100%",
            position: "absolute", 
            bottom: 0,
            backgroundColor: error ? "red" : "green",
            justifyContent: "center",
            paddingLeft: 10
            }, styleSnackBar]}>
            <Text style={{
                color: "#fff",
                fontSize: useScaleSize(18),
            }}>
                {message}
            </Text>
        </Animated.View>
    )
}

export default SnackBar;