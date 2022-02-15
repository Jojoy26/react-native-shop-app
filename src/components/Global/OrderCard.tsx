import React, { useEffect, useState } from "react"
import { View, Text } from "react-native";

import { OrderItemType, SubOrderItemType } from "../../types/OrderItemType";
import Entypo from "react-native-vector-icons/Entypo"
import useScaleSize from "../../hooks/useScaleSize";
import RenderText from "../MyOrdersPage/RenderText";
import RenderStatus from "../MyOrdersPage/RenderStatus";

type Props = {
    item: OrderItemType
}

const OrderCard = ({item}: Props) => {

    return (
        <View style={{padding: 5, zIndex: 5, elevation: 5, backgroundColor: "#fff", marginBottom: 10, borderRadius: 3}}>
            <Text style={{fontWeight: "bold", color: "#222", fontSize: useScaleSize(19)}}>
                Código do pedido: {item.ref}
            </Text>
            <Text style={{fontSize: useScaleSize(19)}}>Descrição: </Text>
            {item.items.map((item, index) => {
                return (
                    <RenderText key={index} item={item}/>
                )
            })}
            <Text style={{fontSize: useScaleSize(19)}}>Total: R$ {item.total}</Text>
            <Text style={{fontWeight: "bold", color: "#222", fontSize: useScaleSize(19)}}>Status do pedido:</Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10}}>
                <RenderStatus numberStatus={1} currentStatus={item.status} textLabel={"Preparação"}/>
                <View style={{height: 1, width: 50, backgroundColor: "#ddd"}}></View>
                <RenderStatus numberStatus={2} currentStatus={item.status} textLabel={"Transporte"}/>
                <View style={{height: 1, width: 50, backgroundColor: "#ddd"}}></View>
                <RenderStatus numberStatus={3} currentStatus={item.status} textLabel={"Entrega"}/>
            </View>
        </View>
    )
}

export default OrderCard;