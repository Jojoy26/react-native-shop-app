import React, { useEffect, useState } from "react"
import { View, ScrollView, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AppBar from "../../components/Global/AppBar";
import OrderCard from "../../components/Global/OrderCard";
import { useUser } from "../../contexts/UserContext";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { OrderItemType } from "../../types/OrderItemType";
import useScaleSize from "../../hooks/useScaleSize";
import CustomButton from "../../components/Global/CustomButton";
import Animated from "react-native-reanimated";
import useScale from "../../hooks/useScaleStyle";


const MyOrders = ({navigation}: any) => {

    const [ordersList, setOrdersList] = useState<OrderItemType[]>([])
    const [haveNoOrders, setHaveNoOrders] = useState(true)
    const { user } = useUser()

    const { styledView } = useScale()

    const loadingOrders = (items: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => {
        if(items.docs.length === 0){
            if(haveNoOrders !== false){
                setHaveNoOrders(false)
            }
        } else {
            if(haveNoOrders !== true){
                setHaveNoOrders(true)
            }
        }
        const list: OrderItemType[] = []
        for(let item of items.docs){
            list.push({...item.data() as OrderItemType, ref: item.ref.id})
        }
        setOrdersList(list)
    }

    useEffect(() => {
        if(user === null && ordersList.length > 0){
            setOrdersList([])
        }
        let subscribe: () => void;
        if(user !== null){
            subscribe = firestore().
            collection("orders").
            where("userUID", "==", user?.uid).
            onSnapshot(loadingOrders, () => {console.log("Errou")})
        }
        return () => {
            if(user !== null){
                subscribe()
            }
        }
    }, [user])

    return (
        <Animated.View style={[{flex: 1, overflow: "hidden",}, styledView]}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <AppBar
                    title="Meus Pedidos"
                    color="#078599"
                    iconName="reorder-three-sharp"
                    IconLib={Ionicons}
                    f={() => {
                        navigation.openDrawer()
                    }}
                    sizeIcon={30}
                />
                {user === null ? 
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 10}}>
                    <FontAwesome name="th-list" size={useScaleSize(90)} color={"#008397"}/>
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#333",
                            fontWeight: "600",
                            fontSize: useScaleSize(21),
                            marginTop: 5,
                            marginBottom: 7
                        }}
                    >Faça Login para continuar!</Text>
                    <CustomButton title="Entrar" f={() => {
                        navigation?.navigate("Login")
                    }}/>
                </View> : 
                ordersList.length !== 0 ? 
                <View style={{padding: 10}}>
                    {ordersList.map((item, index) => {
                        return (
                            <OrderCard key={item.ref} item={item}/>
                        )
                    })}
                </View> : 
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: useScaleSize(30), color: "#222", fontWeight: "bold", opacity: !haveNoOrders ? 1 : 0}}>Nenhum pedido ainda!</Text>
                </View>
                }                 
            </ScrollView>
        </Animated.View>
    )
}

export default MyOrders;