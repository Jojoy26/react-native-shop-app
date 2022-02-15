import React, { useEffect, useRef, useState } from "react"
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View,  TouchableOpacity, Image } from "react-native"
import items from "../../utils/items"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Ionicons from "react-native-vector-icons/Ionicons"
import useScale from "../../hooks/useScaleStyle"
import FloatingActionButton from "../../components/Global/FloatingActionButton"
import useScaleSize from "../../hooks/useScaleSize"
import firestore from '@react-native-firebase/firestore'

const WIDTH = Dimensions.get("window").width

type Items = {
    url: string;
    x: number;
    y: number;
}

type Photos = {
    type: number;
    items: Items[]
}

const Home = ({navigation}: any) => {
    
    const [photos, setPhotos] = useState<Photos[]>([])
    
    const heightHeader = useSharedValue(0)
    const xScroll = useSharedValue(0)
    const refLastNumber = useRef<number>(0)

    const { styledView } = useScale()

    const getPhotosHome = async () => {
        const photosData = await firestore().collection("photos").doc("photosHome").get()
        setPhotos(photosData.data()?.item)
    }
   

    const styledHeader = useAnimatedStyle(() => {
        return {
            height: interpolate(
                heightHeader.value,
                [0, 55],
                [55, 0],
                Extrapolate.CLAMP
            ),
            opacity: interpolate(
                heightHeader.value,
                [0, 55],
                [1, 0]
            ),
        }
    })


    useEffect(() => {
        getPhotosHome()
    }, [])

    return (
        <Animated.View style={[{
            flex: 1,
            backgroundColor: "#DE8194",
            overflow: "hidden",
        }, styledView]}>
            <Animated.View style={[{
                flexDirection: "row",
                width: "100%",
                backgroundColor: "transparent",
                height: 55,
                justifyContent: "center",
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                elevation: 1,
                zIndex: 10
                }, styledHeader]}>
                
                
                <Text style={{fontWeight: "bold", color: "#fff", fontSize: useScaleSize(21), alignSelf: "center"}}>
                    Novidades
                </Text>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 20,
                        alignSelf: "center"
                    }}
                    onPress={() => {
                    if(heightHeader.value < 25){
                        navigation.openDrawer()
                    }
                }}>
                    <Ionicons 
                    name="reorder-three-sharp" 
                    color={"#fff"} 
                    size={useScaleSize(40)}
                    
                    />
                </TouchableOpacity>
            </Animated.View>
           
            
            <ScrollView
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                refLastNumber.current = event.nativeEvent.contentOffset.y  
                if(refLastNumber.current > xScroll.value){
                    const count = refLastNumber.current - xScroll.value
                    if(heightHeader.value < 55){
                        if(heightHeader.value+count > 55){
                            heightHeader.value = 55
                            return;
                        } else {
                            heightHeader.value+=count
                        }
                    }
                } else {
                    const count = xScroll.value - refLastNumber.current
                    if(heightHeader.value > 0){
                        if(heightHeader.value-count < 0){
                            heightHeader.value = 0
                            return;
                        } else {
                            heightHeader.value-=count
                        }
                    }
                }
                xScroll.value = event.nativeEvent.contentOffset.y
            }}
            contentContainerStyle={{
                paddingTop: 55,
              }}
            >
                {photos.map((item, index) => {
                    if(item.type === 1){
                        return (
                            <Image
                                source={{uri: item.items[0].url}}
                                key={index} 
                                style={
                                {
                                height: useScaleSize(item.items[0].y * 180),
                                width: (item.items[0].x * 50) / 100 * WIDTH}
                            }/>
                        )
                    } else if(item.type === 2){
                        return (
                            <View key={index} style={{flexDirection: "row"}}>
                                <Image 
                                source={{uri: item.items[0].url}}
                                style={
                                {
                                height: useScaleSize(item.items[0].y * 170),
                                width: (item.items[0].x * 50) / 100 * WIDTH}
                                }/>
                                
                                <View style={{flexDirection: "column", width: "100%"}}>
                                    <Image 
                                    source={{uri: item.items[1].url}}
                                    style={
                                    {
                                    height: useScaleSize(item.items[1].y * 170),
                                    width: (item.items[0].x * 50) / 100 * WIDTH}
                                    }/>
                                    <Image
                                    source={{uri: item.items[2].url}}
                                    style={
                                    {
                                    height: useScaleSize(item.items[2].y * 170),
                                    width: (item.items[0].x * 50) / 100 * WIDTH}
                                    }/>
                                </View>
                            </View>
                        )
                    } else if (item.type === 3){
                        return (
                            <View key={index} style={{flexDirection: "row"}}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={
                                    {backgroundColor: "red", 
                                    height: item.items[0].y * 100,
                                    width: (item.items[0].x * 50) / 100 * WIDTH}
                                    }/>
                                    <View style={
                                    {backgroundColor: "blue", 
                                    height: item.items[1].y * 100,
                                    width: (item.items[0].x * 50) / 100 * WIDTH}
                                    }/>
                                </View>
                                <View style={
                                {backgroundColor: "purple", 
                                height: item.items[2].y * 100,
                                width: (item.items[0].x * 50) / 100 * WIDTH}
                                }/>
                                
                            </View>
                        )
                    }
                })}
                 
            </ScrollView>
            <FloatingActionButton/>
        </Animated.View>
    )
}

export default Home;