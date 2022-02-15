import React from "react"
import { Text, View } from "react-native"
import * as Progress from 'react-native-progress'
import Entypo from "react-native-vector-icons/Entypo"
import useScaleSize from "../../hooks/useScaleSize"

type Props = {
    numberStatus: number; 
    currentStatus: number; 
    textLabel: string;
}

const RenderStatus = ({numberStatus, currentStatus, textLabel}: Props) => {
    return (
        <View style={{alignItems: "center"}}>
            <View style={{
                height: useScaleSize(39), 
                width: useScaleSize(40), 
                borderRadius: useScaleSize(30), 
                backgroundColor: currentStatus > numberStatus ? "green":currentStatus >= numberStatus ? "#29ABD5" : "#999",
                justifyContent: "center",
                alignItems: "center"
                }}>
                {currentStatus === numberStatus ? <Progress.Circle size={useScaleSize(42)} indeterminate={true} style={{position: "absolute"}} borderWidth={2} color="#29ABD5"/> : null}
                {currentStatus > numberStatus ? <Entypo name="check" size={useScaleSize(30)} color="#fff"/>: <Text style={{color: "#fff"}}>{numberStatus}</Text>}
            </View>
            <Text>{textLabel}</Text>
        </View>
    )
}

export default RenderStatus;