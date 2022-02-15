import { useDrawerStatus } from "@react-navigation/drawer";
import { useEffect } from "react";
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const useScale = () => {

    const isDrawerOpen = useDrawerStatus()

    const scaleY = useSharedValue(1)
    const styledView = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scaleY: scaleY.value
                },
                {
                    scaleX: interpolate(
                        scaleY.value,
                        [1, 0.95],
                        [1, 0.95]
                    )
                },

            ],
            borderRadius: interpolate(
                scaleY.value,
                [1, 0.95],
                [0, 20]
            )
        }
    })

    useEffect(() => {
        if(isDrawerOpen === "open"){
            scaleY.value = withTiming(0.95)
        } else {
            scaleY.value = withTiming(1)
        }
        console.log("ATT")
    }, [isDrawerOpen])

    return {
        styledView
    }
    
}

export default useScale;