import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import useScaleSize from "./useScaleSize";

const useSnackBar = () => {

    const heightSucess = useSharedValue(0)
    const heightError = useSharedValue(0)

    const size = useScaleSize(46)
    console.log(size)

    const [snackMessage, setSnackMessage] = useState("")

    const styleSnackbarSucess = useAnimatedStyle(() => {
        return {
            height: heightSucess.value
        }
    })

    const styleSnackbarError = useAnimatedStyle(() => {
        return{
            height: heightError.value
        }
    })

    const callSnackBarSucess = (text: string) => {
        setSnackMessage(text)
        heightSucess.value = withTiming(size)
        setTimeout(() => {
            heightSucess.value = withTiming(0)
        }, 3000);
    }

    const callSnackBarError = (text: string) => {
        setSnackMessage(text)
        heightError.value = withTiming(size)
        setTimeout(() => {
            heightError.value = withTiming(0)
        }, 3000);
    }

    return {
        heightSucess, 
        heightError, 
        snackMessage, 
        setSnackMessage, 
        styleSnackbarError, 
        styleSnackbarSucess, 
        callSnackBarSucess, 
        callSnackBarError,
        size
    }

}

export default useSnackBar;