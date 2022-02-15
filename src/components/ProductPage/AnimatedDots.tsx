import React, { useEffect } from "react"
import { View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    index: number;
    currentImage: number
}

const AnimatedDots = ({ index, currentImage }: Props) => {

    useEffect(() => {
        if(currentImage === index){
            height.value = withTiming(6, {
                duration: 300,
            })
        } else {
            height.value = withTiming(3, {
                duration: 100
            })
        }
    }, [currentImage])

    const height = useSharedValue(3)

    const styled = useAnimatedStyle(() => {
        return {
            height: height.value,
            borderRadius: interpolate(
                height.value,
                [6, 3],
                [3, 1.5]
            ), 
            width: interpolate(
                height.value,
                [6, 3],
                [6, 3]
            )
        }
    })

    return (
        <Animated.View style={[{
            backgroundColor: "#008397",
            marginRight: 5,
        }, styled]}/>
    )
}

export default AnimatedDots;