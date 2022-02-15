import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import firestore from '@react-native-firebase/firestore'
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    onSucessCoupon: (text: string, descount: number) => void;
    onErrorCoupon: (text: string) => void;
}

const CouponCard = ({onSucessCoupon, onErrorCoupon}: Props) => {

    const height = useSharedValue(0)

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
    
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState("")
    const inputRef = useRef() as MutableRefObject<TextInput>

    const getCoupon = async () => {
        if(inputText !== ""){
            try{
                const response = await firestore().
                collection("coupon").
                get()
                for(let coupon of response.docs){
                    if(coupon.data().couponCode === inputText){
                        onSucessCoupon(`Cupon ${coupon.data().couponCode} aplicado com sucesso`, coupon.data().descount)
                        return;
                    }
                }
                onErrorCoupon("Cupon inválido")
            } catch(e){
                onErrorCoupon("Erro ao aplicar cupon")
            }
        }
    }

    return (
        <TouchableOpacity
        onPress={() => {
            console.log()
            if(height.value === 0){
                height.value = withTiming(50)
                inputRef.current.focus()
            } else {
                inputRef.current.blur()
                height.value = withTiming(0)
                console.log("Execunting")
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
                <AntDesign name="gift" size={useScaleSize(26)}/>
                <Text style={{marginLeft: 20, fontWeight: "600", fontSize: useScaleSize(19)}}>Cupon de Desconto</Text>
                <Ionicons name="add-outline" size={useScaleSize(32)} style={{position: "absolute", right: 0}}/>
            </View>
            <Animated.View style={[{height: 50,overflow: "hidden", marginTop: 10}, styled]}>
                <TextInput
                ref={inputRef}
                onChangeText={(text: string) => {
                    setInputText(text)
                }}
                onEndEditing={() => {
                    getCoupon()
                }}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}  
                    placeholder="Digite seu cupom"
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

export default CouponCard;