import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../Global/CustomButton";
import { useNetInfo } from "@react-native-community/netinfo";
import { ItemCartType } from "../../types/ItemCartType";
import { useUser } from "../../contexts/UserContext";
import firestore from '@react-native-firebase/firestore'
import useScaleSize from "../../hooks/useScaleSize";

type Props = {
    subtotal: number;
    descount: number;
    delivery: number;
    onErrorFinish: (text: string) => void;
    onSucessFinish: (code: string) => void;
    cartItems: ItemCartType[];
    setIsLoading: any
}

const DetailsCard = ({subtotal, descount=0, delivery=0, onErrorFinish, onSucessFinish, cartItems, setIsLoading}: Props) => {

    const netInfo = useNetInfo()
    const { user } = useUser()

    const callOrder = () => {
        if(!netInfo.isConnected) {
            onErrorFinish("Falha, verifique sua conexão com a internet")
            return;
        }
        setIsLoading(true)
        let list = []
        for(let item of cartItems){
            const obj = {
                quantity: item.quantity,
                price: item.price,
                title: item.title,
                productRef: item.refIdProduct,
                category: item.category
            }
            list.push(obj)
        }
        const order = {
            items: list,
            total: subtotal,
            descount,
            delivery,
            userUID: user?.uid,
            status: 1
        }
        const response = firestore().
            collection("orders").
            add(order).
            then((doc) => {
                
                for(let item of cartItems){
                    firestore().
                    collection("cart").
                    doc(user?.uid).
                    collection("items").
                    doc(item.ref).
                    delete()
                }
                onSucessFinish(doc.id)

            }).catch((e) => {
                onErrorFinish("Falha ao finalizar pedido")
            })
    }

    return(
        <View style={{
            marginTop: 10,
            elevation: 5, 
            zIndex: 5, 
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: 10
        }}>
            <Text style={{marginBottom: 15, color: "#555", fontWeight: "600", fontSize: useScaleSize(19)}}>Resumo do Pedido</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.title}>Subtotal</Text>
                <Text style={styles.price}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={{width: "100%", height: 0.5, backgroundColor: "#eee", marginBottom: 11}}/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.title}>Desconto</Text>
                <Text style={styles.price}>R$ {(subtotal*descount/100).toFixed(2)}</Text>
            </View>
            <View style={{width: "100%", height: 0.5, backgroundColor: "#eee", marginBottom: 11}}/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.title}>Entrega</Text>
                <Text style={styles.price}>R$ {delivery.toFixed(2)}</Text>
            </View>
            <View style={{width: "100%", height: 0.5, backgroundColor: "#eee", marginBottom: 11}}/>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 10}}>
                <Text style={{color: "#444", fontWeight: "600", fontSize:useScaleSize(19)}}>Total</Text>
                <Text style={{color: "#2e828f", fontSize: useScaleSize(20)}}>R$ {((subtotal-(subtotal*descount/100)) + delivery).toFixed(2)}</Text>
            </View>
            <CustomButton title="Finalizar Pedido" f={callOrder}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#777",
        fontSize: useScaleSize(19)
    },
    price: {
        color: "#555",
        fontSize: useScaleSize(19)
    }
})

export default DetailsCard;