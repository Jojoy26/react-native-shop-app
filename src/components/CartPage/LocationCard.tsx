import React, { MutableRefObject, useRef, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import useScaleSize from "../../hooks/useScaleSize"

const LocationCard = () => {

    const height = useSharedValue(0)
    const rotateX = useSharedValue(0)

    const styled = useAnimatedStyle(() => {
        return {
            height: height.value,
            marginTop: interpolate(
                height.value,
                [0, 50],
                [0, 10]
            )
        }
    })

    const styledDown = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `-${rotateX.value}deg`
                }
            ]
        }
    })
    
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef() as MutableRefObject<TextInput>

    return (
        <TouchableOpacity
        onPress={() => {
            console.log()
            if(height.value === 0){
                inputRef.current.focus()
                height.value = withTiming(50)
                rotateX.value = withTiming(180)
            } else {
                height.value = withTiming(0)
                rotateX.value = withTiming(0)
            }
        }}
            style={{
            elevation: 5, 
            zIndex: 5, 
            backgroundColor: "#fff",
            borderRadius: 3,
            marginTop: 10,
            paddingTop: 15,
            paddingBottom: 15,
            paddingRight: 10,
            paddingLeft: 10,
            overflow: "hidden"
            }}>
            <View style={{
                flexDirection: "row", 
                alignItems: "center",
            }}>
                <Ionicons name="location-sharp" size={useScaleSize(26)}/>
                <Text style={{marginLeft: 20, fontWeight: "600", fontSize: useScaleSize(19)}}>Calcular frete</Text>
                <Animated.View style={[{position: "absolute", right: 3}, styledDown]}>
                    <AntDesign name="down" size={useScaleSize(23)}/>
                </Animated.View>
            </View>
            <Animated.View style={[{height: 50,overflow: "hidden", marginTop: 10}, styled]}>
                <TextInput
                keyboardType={"number-pad"}
                ref={inputRef}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}  
                    placeholder="CEP"
                    style={{
                    borderWidth: 2,
                    borderColor: isFocused ? "#2e828f" : "#888",
                    borderRadius: 2,
                    padding: 10,
                    fontSize: Math.min(useScaleSize(21), 16)
                }}/>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default LocationCard;