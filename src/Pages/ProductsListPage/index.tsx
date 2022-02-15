import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Text, View, FlatList } from "react-native";
import AppBar from "../../components/Global/AppBar";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductItem from "../../components/ProductsListPage/ProductItem";
import FloatingActionButton from "../../components/Global/FloatingActionButton";
import firestore from '@react-native-firebase/firestore'
import { ProductItemType } from "../../types/ProductItemType";

const ProductsList = ({route, navigation}: any) => {

    const [productsList, setProductsList] = useState<ProductItemType[]>([])

    const xScroll = useSharedValue(0)
    const listRef = useRef() as MutableRefObject<FlatList>
    const WIDTH = Dimensions.get("window").width

    const styleTranslateX = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        xScroll.value,
                        [0, WIDTH],
                        [0, WIDTH/2]
                    )
                }
            ]
        }
    })

    const { category, title } = route.params

    const getProducts = async () => {
        const products = await firestore().collection("categories").doc(category).collection("items").get()
        const list: ProductItemType[] = []
        for(let item of products.docs){
            const productItem: ProductItemType = {
                description: item.data().description,
                images: item.data().img,
                price: item.data().price,
                sizes: item.data().sizes,
                title: item.data().title,
                ref: item.ref.id,
                category
            }
            list.push(productItem)
        }
        setProductsList(list)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <View style={{flex: 1}}>
            <AppBar 
            title={title} 
            color="#078599" 
            iconName="left"
            IconLib={AntDesign}
            f={() => {
                navigation.goBack()
            }}
            sizeIcon={20}
            />
            <View style={{backgroundColor: "#078599", flexDirection: "row", width: "100%"}}>
                <TouchableOpacity
                    onPress={() => {
                        listRef.current.scrollToIndex({animated: true, index: 0})
                    }}
                    style={{
                    width: WIDTH/2, 
                    alignItems: "center", 
                    justifyContent: "center",
                    paddingBottom: 10,
                    paddingTop: 10
                    }}>
                    <MaterialIcons name="grid-on" color={"#fff"} size={22}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        listRef.current.scrollToIndex({animated: true, index: 1})
                    }}
                    style={{
                    width: WIDTH/2, 
                    alignItems: "center", 
                    justifyContent: "center", 
                    paddingBottom: 10,
                    paddingTop: 10
                    }}>
                    <Feather name="list" color={"#fff"} size={23}/>
                </TouchableOpacity>
            </View>
            <Animated.View style={[{
                backgroundColor: "#fff", 
                width: "50%", 
                height: 2, 
                marginTop: -2, 
                borderRadius: 1},
                styleTranslateX
            ]}
            />

            <FlatList
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                xScroll.value = event.nativeEvent.contentOffset.x
            }}
            ref={listRef}
            style={{flex: 1}}
            data={[0, 1]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
            renderItem={(item) => {
                if(item.index === 0){
                    return (
                        <FlatList
                        data={productsList}
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: WIDTH,
                            flex: 1,
                            padding: 10,
                        }}
                        contentContainerStyle={{
                            paddingBottom: 10
                        }}
                        numColumns={2}
                        renderItem={(item1) => {
                            return (
                                <ProductItem 
                                item={item1.item}
                                grid={true} 
                                margin={item1.index%2 === 0} 
                                f={() => {
                                    navigation.navigate("Product", {
                                        item: item1.item
                                    })
                                }}/>
                            )
                        }}
                        />
                    )
                } else {
                    return (
                        <FlatList
                        data={productsList}
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: WIDTH,
                            flex: 1,
                            padding: 10,
                        }}
                        contentContainerStyle={{
                            paddingBottom: 10
                        }}
                        renderItem={(item2) => {
                            return (
                                <ProductItem
                                item={item2.item}
                                grid={false} f={() => {
                                    navigation.navigate("Product", {
                                        item: item2.item
                                    })
                                }}/>
                            )
                        }}
                        />
                    )
                }
            }}
            />
            <FloatingActionButton/>
        </View>
    )
}

export default ProductsList;