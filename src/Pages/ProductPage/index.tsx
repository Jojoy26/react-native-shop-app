import React, { useState } from "react"
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, ScrollView } from "react-native"
import AppBar from "../../components/Global/AppBar"
import AntDesign from "react-native-vector-icons/AntDesign"
import AnimatedDots from "../../components/ProductPage/AnimatedDots"
import SizeCard from "../../components/ProductPage/SizeCard"
import { ProductItemType } from "../../types/ProductItemType"
import { useUser } from "../../contexts/UserContext"
import firestore from '@react-native-firebase/firestore'
import useScaleSize from "../../hooks/useScaleSize"


const Product = ({route, navigation}: any) => {

    const { user } = useUser()

    const WIDTH = Dimensions.get("window").width
    const HEIGHT = Dimensions.get("window").height

    const [currentImage, setCurrentImage] = useState(0)
    const [currentSize, setCurrentSize] = useState<number>(-1)

    const { item }:{item: ProductItemType} = route.params

    const addItemCart = async () => {
        firestore().
            collection("cart").
            doc(user?.uid).
            collection("items").
            doc().
            set({
                refIdProduct: item.ref,
                price: item.price,
                title: item.title,
                size: item.sizes[currentSize],
                quantity: 1,
                image: item.images[0],
                category: item.category
            })
        navigation.navigate("Cart")
    }

    return (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
            <AppBar 
            title={item.title} 
            color="#078599" 
            iconName="left"
            IconLib={AntDesign}
            f={() => {
                navigation.goBack()
            }}
            sizeIcon={20}
            />
            <View>
                <FlatList
                onScroll={(event) => {
                    if(event.nativeEvent.contentOffset.x%WIDTH === 0 ){
                        if(event.nativeEvent.contentOffset.x/WIDTH !== currentImage){
                            setCurrentImage(event.nativeEvent.contentOffset.x/WIDTH)
                        }
                    }
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                data={item.images}
                renderItem={(item) => {
                    return (
                        <Image key={item.index} source={{uri: item.item}} style={{height: useScaleSize(430), width: WIDTH, minHeight: 280}}/>
                    )
                }}
                /> 
                <FlatList
                style={{position: "absolute", bottom: 10, alignSelf: "center"}}
                horizontal
                contentContainerStyle={{
                    alignItems: "center"
                }}
                data={item.images}
                renderItem={(item) => {
                    return (
                        <AnimatedDots index={item.index} currentImage={currentImage}/>
                    )
                }}
                />
            </View>
            <View style={{padding: 10}}>
                <Text style={{color: "#333", fontWeight: "400", fontSize: useScaleSize(23)}}>{item.title}</Text>
                <Text style={{fontWeight: "bold", color: "#2e828f", fontSize: useScaleSize(24)}}>R$ {item.price}</Text>
                <Text style={{color: "#333", marginTop: 8, marginBottom: 6, fontSize: useScaleSize(19)}}>Tamanho</Text>
                <FlatList
                style={{marginBottom: 15}}
                data={item.sizes}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => {
                    return (
                        <SizeCard size={item.item} index={item.index} currentSize={currentSize} f={() => {setCurrentSize(item.index)}}/>
                    )
                }}
                />
                <TouchableOpacity
                onPress={() => {
                    if(user === null){
                        navigation.navigate("Login")
                    } else {
                        if(currentSize !== -1){
                            addItemCart()
                        }
                    }
                }}
                style={{
                    height: useScaleSize(60),
                    width: "100%",
                    backgroundColor: user !== null ? currentSize !== -1 ? "#2e828f" : "#aaa" : "#2e828f",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                }}>
                    <Text style={{
                        fontSize: useScaleSize(20), 
                        fontWeight: "600", 
                        color: user !== null ? currentSize !== -1 ? "#fff" : "#666": "#fff"}}>
                            {user === null ? "Entre para comprar" : "Adicionar ao carrinho"}
                        </Text>
                </TouchableOpacity>
                <Text style={{marginTop: 10, color: "#333", fontSize: useScaleSize(22), fontWeight: "600"}}>Descrição</Text>
                <Text
                style={{color: "#777", fontSize: useScaleSize(20)}}
                >{item.description}</Text>
            </View>
            
        </ScrollView>
    )
}

export default Product;