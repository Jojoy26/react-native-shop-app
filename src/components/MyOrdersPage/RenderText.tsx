import React from "react";
import { Text } from "react-native";
import useScaleSize from "../../hooks/useScaleSize";
import { SubOrderItemType } from "../../types/OrderItemType";

type Props = {
    item: SubOrderItemType
}

const RenderText = ({item}: Props) => {
    return (
        <Text style={{fontSize: useScaleSize(19)}}>{item.quantity} x {item.title} (R$ {item.price})</Text>
    )
}

export default RenderText;