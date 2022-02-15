import { NavigationContext } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CartProductItem from "../../components/CartPage/CartProductItem";
import CouponCard from "../../components/CartPage/CouponCard";
import CustomButton from "../../components/Global/CustomButton";
import LocationCard from "../../components/CartPage/LocationCard";
import DetailsCard from "../../components/CartPage/DetailsCard";
import { useUser } from "../../contexts/UserContext";
import { ItemCartType } from "../../types/ItemCartType";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import useSnackBar from "../../hooks/useSnackBar";
import SnackBar from "../../components/Global/SnackBar";
import { useIsFocused } from '@react-navigation/native';
import useScaleSize from "../../hooks/useScaleSize"
import * as Progress from 'react-native-progress'


const CartPage = () => {

    const navigation = useContext(NavigationContext)
    const { user } = useUser()
    const isFocused = useIsFocused()
    const { 
            snackMessage, 
            styleSnackbarError, 
            styleSnackbarSucess,
            callSnackBarSucess,
            callSnackBarError
        } = useSnackBar()

    const [cartItems, setCartItems] = useState<ItemCartType[]>([])
    const [subtotal, setSubtotal] = useState(0)
    const [descount, setDescount] = useState(0)
    const [haveNoItems, setHaveNoItems] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const calcSubtotal = () => {
        let soma = 0
        for(let item of cartItems){
            soma = soma + (item.price * item.quantity)
        }
        setSubtotal(soma)
    }

    const loadingItemsCart = async (items: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => {
        console.log(items.docs.length)
        if(items.docs.length === 0){
            if(haveNoItems !== false){
                setHaveNoItems(false)
            }
        } else {
            if(haveNoItems !== true){
                setHaveNoItems(true)
            }
        }
        const list: ItemCartType[] = []
        for(let item of items.docs){
            list.push({...item.data() as ItemCartType, ref: item.ref.id})
        }
        setCartItems(list)
    }

    const onSucessCoupon = (text: string, descount1: number) => {
        if(descount !== descount1){
            setDescount(descount1)
            callSnackBarSucess(text)
        }
    }

    const onErrorCoupon = (text: string) => {
        setDescount(0)
        callSnackBarError(text)
    }

    const onErrorAction = (text: string) => {
        callSnackBarError(text)
    }

    const onErrorFinish = (text: string) => {
        if(isLoading === true) setIsLoading(false)
        callSnackBarError(text)
    }

    const onSucessFinish = (code: string) => {
        if(isLoading === true) setIsLoading(false)
        navigation?.navigate("FinishOrder", {code})
    }

    useEffect(() => {
        calcSubtotal()
    }, [cartItems])

    useEffect(() => {
        const subscribe = firestore().
            collection("cart").
            doc(user?.uid).
            collection("items").
            onSnapshot(loadingItemsCart, () => {})
        return () => {
            console.log("Morreu")
            subscribe()
        }
    }, [isFocused])

    return (
        <>
            {!isLoading ? 
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <View style={
                        {
                            height: 55, 
                            backgroundColor: "#078599",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                        }>
                            <Text style={{fontWeight: "600", color: "#fff", fontSize: useScaleSize(21)}}>
                                Meu Carrinho
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    color: "#fff",
                                    fontSize: useScaleSize(19)
                                }}
                            >{cartItems.length} ITENS</Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: 18,
                                    alignSelf: "center",
                                    padding: 2,
                                }}
                                onPress={() => {
                                    navigation?.goBack()
                                }}>
                                <AntDesign 
                                name="left" 
                                color={"#fff"} 
                                size={useScaleSize(30)}
                                />
                            </TouchableOpacity>
                        </View>

                        {user === null ?
                            <View style={{flex: 1 ,justifyContent: "center", alignItems: "center", padding: 10}}>
                                <MaterialIcons name="remove-shopping-cart" size={useScaleSize(90)} color={"#008397"}/>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#333",
                                        fontWeight: "600",
                                        fontSize: useScaleSize(21),
                                        marginTop: 5,
                                        marginBottom: 7
                                    }}
                                >Faça Login para adicionar {`\n`}produtos!</Text>
                                <CustomButton title="Entrar" f={() => {
                                    navigation?.navigate("Login")
                                }}/>
                            </View> : 
                            cartItems.length === 0 ? 
                            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: useScaleSize(30), color: "#222", fontWeight: "bold", opacity: !haveNoItems ? 1 : 0}}>Nenhum produto no carrinho!</Text>
                            </View> : 
                            <View style={{padding: 10}}>
                                {cartItems.map((item, index) => {
                                    return (
                                        <CartProductItem key={item.ref} item={item} onErrorAction={onErrorAction}/>
                                    )
                                })}
                                <CouponCard onSucessCoupon={onSucessCoupon} onErrorCoupon={onErrorCoupon}/>
                                <LocationCard />
                                <DetailsCard 
                                subtotal={subtotal} 
                                descount={descount} 
                                delivery={10} 
                                onErrorFinish={onErrorFinish} 
                                cartItems={cartItems}
                                onSucessFinish={onSucessFinish}
                                setIsLoading={setIsLoading}
                                />
                            </View>
                        }
                </ScrollView>
                <SnackBar message={snackMessage} styleSnackBar={styleSnackbarError} error/>
                <SnackBar message={snackMessage} styleSnackBar={styleSnackbarSucess}/>
            </View> : 
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Progress.Circle size={50} indeterminate={true} />
            </View>
            }
        </>
    )
}

export default CartPage;