import React, { useEffect, useState } from "react"
import { View, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppBar from "../../components/Global/AppBar";
import firestore from '@react-native-firebase/firestore'
import { StoreItemType } from "../../types/StoreItemType";
import StoreCard from "../../components/FindStorePage/StoreCard";
import Animated from "react-native-reanimated";
import useScale from "../../hooks/useScaleStyle";

const FindStore = ({navigation}: any) => {

    const [storesList, setStoresList] = useState<StoreItemType[]>([])

    const { styledView } = useScale()

    const getStores = async () => {
        const stores = await firestore().
            collection("stores").
            get()
        
        const list:StoreItemType[]  = []
        for(let item of stores.docs){
            list.push(item.data() as StoreItemType)
        }
        setStoresList(list)
    }

    useEffect(() => {
        getStores()
    }, [])

    return (
        <Animated.View style={[{flex: 1, overflow: "hidden"}, styledView]}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <AppBar
                color="#078599"
                iconName="reorder-three-sharp"
                title="Lojas"
                IconLib={Ionicons}
                f={() => {
                    navigation.openDrawer()
                }}
                sizeIcon={30}
                />
            <View style={{padding: 10}}>
                {storesList.map((item, index) => {
                    return (
                        <StoreCard key={index} item={item}/>
                    )
                })}
            </View>
            </ScrollView>
        </Animated.View>
    )
}

export default FindStore;