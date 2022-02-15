import React from "react"
import { Text, View } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import AppBar from "../../components/Global/AppBar"
import Entypo from "react-native-vector-icons/Entypo"
import useScaleSize from "../../hooks/useScaleSize"

const FinishOrder = ({navigation, route}: any) => {

    const { code } = route.params;

    return(
        <View style={{flex: 1}}>
            <AppBar 
            title={"Pedido Finalizado"} 
            color="#078599" 
            iconName="left"
            IconLib={AntDesign}
            f={() => {
                navigation.pop()
                navigation.pop()
            }}
            sizeIcon={20}
            />
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Entypo name="check" size={useScaleSize(120)} color="#078599"/>
                <Text style={{fontWeight: "600", color: "#000", fontSize: useScaleSize(25)}}>Pedido realizado com sucesso!</Text>
                <Text style={{fontSize: useScaleSize(22), textAlign: "center"}}>Código do pedido: {code}</Text>
            </View>
        </View>
    )
}

export default FinishOrder;