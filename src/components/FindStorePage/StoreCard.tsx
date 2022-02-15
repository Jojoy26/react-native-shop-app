import React from "react"
import { Image, Text, View, TouchableOpacity, Linking } from "react-native"
import useScaleSize from "../../hooks/useScaleSize"
import { StoreItemType } from "../../types/StoreItemType"

type Props = {
    item: StoreItemType
}

const StoreCard = ({item}: Props) => {
    return(
        <View style={{elevation: 5, zIndex: 5, backgroundColor: "#fff", marginBottom: 10, borderRadius: 3, overflow: "hidden"}}>
            <Image source={{uri: item.image}} style={{width: "100%", height: useScaleSize(120)}}/>
            <View style={{padding: 5}}>
                <Text style={{fontWeight: "bold", color: "#222", fontSize: useScaleSize(19)}}>Loja Av. Paulista</Text>
                <Text style={{fontSize: useScaleSize(19)}}>Av. Paulista</Text>
                <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 7}}>
                    <TouchableOpacity style={{padding: 2}}
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`).catch((e) => console.log("errorMap"))
                    }}
                    >
                        <Text style={{color: "#0699C8", fontSize: useScaleSize(19)}}>
                            Ver no Mapa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 15, marginRight: "3%", padding: 2}}
                    onPress={() => {
                        Linking.openURL(`tel:${item.telefone}`).catch((e) => {console.log("errorTel")})
                    }}
                    >
                        <Text style={{color: "#08a5da", fontSize: useScaleSize(19)}}>
                            Ligar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default StoreCard;