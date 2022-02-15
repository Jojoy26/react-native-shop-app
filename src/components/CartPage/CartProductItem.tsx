import React, { useEffect } from "react"
import { Image, Text, View, TouchableOpacity } from "react-native";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons"
import { ItemCartType } from "../../types/ItemCartType"
import firestore from '@react-native-firebase/firestore'
import { useUser } from "../../contexts/UserContext";
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    item: ItemCartType;
    onErrorAction: (text: string) => void;
}

const CartProductItem = ({item, onErrorAction}: Props) => {

    const height = useSharedValue(0)
    const { user } = useUser()
    const HEIGHTCARD = Math.max(useScaleSize(160), 120)

    const styleCard = useAnimatedStyle(() => {
        return {
            height: height.value,
            padding: interpolate(
                height.value,
                [0, HEIGHTCARD],
                [0, 5],
                Extrapolate.CLAMP
            ),
            opacity: interpolate(
                height.value,
                [0, HEIGHTCARD],
                [0, 1],
                Extrapolate.CLAMP
            ),
            marginBottom: interpolate(
                height.value,
                [0, HEIGHTCARD],
                [0, 15]
            )
        }
    })


    const addQuantity = () => {
        const response = firestore().
            collection("cart").
            doc(user?.uid).
            collection("items").
            doc(item.ref).
            update({
                quantity: item.quantity+1
            }).catch((e) => {
                height.value = withTiming(HEIGHTCARD)
                onErrorAction("Falha ao realizar ação")
            })
    }

    const removeQuantity = () => {
        if(item.quantity - 1 > 0){
            const response = firestore().
            collection("cart").
            doc(user?.uid).
            collection("items").
            doc(item.ref).
            update({
                quantity: item.quantity-1
            }).catch((e)=> {
                height.value = withTiming(HEIGHTCARD)
                onErrorAction("Falha ao realizar ação")
            })
        }
    }

    const removeItem = () => {
        height.value = withTiming(0, undefined, (isFinished) => {
            if(isFinished){
                runOnJS(removeHelper)()
            }
        })   
    }

    const removeHelper = () => {
        const response = firestore().
                collection("cart").
                doc(user?.uid).
                collection("items").
                doc(item.ref).
                delete().catch((e)=> {
                    height.value = withTiming(HEIGHTCARD)
                    onErrorAction("Falha ao realizar ação")
                })
    }

    useEffect(() => {
        console.log("HEIGTH", HEIGHTCARD)
        height.value = withTiming(HEIGHTCARD)
    } ,[])

    return (
        <Animated.View style={[{elevation: 5, zIndex: 5, borderRadius: 3 , backgroundColor: "#fff", flexDirection: "row", overflow: "hidden"}, styleCard]}>
            <Image style={{height: "100%", width: 140}} resizeMode="cover" source={{uri: item.image}}/>
            <View style={{marginLeft: 10}}>
                <Text style={{color: "#333", fontWeight: "600", fontSize: useScaleSize(19)}}>{item.title}</Text>
                <Text style={{fontSize: useScaleSize(18)}}>Tamanho: {item.size}</Text>
                <Text style={{color: "#2e828f", fontWeight: "bold", fontSize: useScaleSize(21)}}>R$ {item.price}</Text>
                <View style={{flexDirection: "row", alignItems: "center", position: "absolute", bottom: 0}}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "80%", marginRight: "15%"}}>
                        <TouchableOpacity onPress={addQuantity}>
                            <Ionicons name="add-outline" size={useScaleSize(28)} color={"#2e828f"}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: useScaleSize(21)}}>{item.quantity}</Text>
                        <TouchableOpacity onPress={removeQuantity}>
                            <Ionicons name="remove-outline" size={useScaleSize(28)} color={"#2e828f"}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={removeItem}>
                        <Text style={{fontSize: useScaleSize(19)}}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

export default CartProductItem;