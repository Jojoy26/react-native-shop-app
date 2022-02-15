import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import AppBar from "../../components/Global/AppBar";
import CategoryItem from "../../components/CategoriesPage/CategoryItem";
import Ionicons from "react-native-vector-icons/Ionicons"
import useScale from "../../hooks/useScaleStyle";
import FloatingActionButton from "../../components/Global/FloatingActionButton";
import firestore from '@react-native-firebase/firestore'
import { CategoryItemType } from "../../types/CategoryItemType";


const Categories = ({navigation}: any) => {

    const { styledView } = useScale()
    const [categoriesList, setCategoriesList] = useState<CategoryItemType[]>([])

    const loadCategories = async () => {
        const categoriesData = await firestore().collection("categories").get()
        const list: CategoryItemType[] = []
        for(let item of categoriesData.docs){
            const categoryItem: CategoryItemType = {
                title: item.data().title,
                imgLogo: item.data().imgLogo,
                ref: item.ref.id
            }
            list.push(categoryItem)
        }
        setCategoriesList(list)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <Animated.View style={[{flex: 1, overflow: "hidden"}, styledView]}>
            <ScrollView style={{flex: 1}}>
                <AppBar
                title="Produtos"
                color="#078599"
                iconName="reorder-three-sharp"
                IconLib={Ionicons}
                f={() => {
                    navigation.openDrawer()
                }}
                sizeIcon={30}
                />
                <View>
                    {categoriesList.map((item, index) => {
                        return(
                            <CategoryItem
                            key={index}
                            img={item.imgLogo}
                            title={item.title} 
                            category={item.ref}
                            f={() => {
                                navigation.navigate("ProductsList", {
                                    category: item.ref,
                                    title: item.title
                                })
                            }}/>
                        )
                    })}
                </View>
            </ScrollView>
            <FloatingActionButton/>
        </Animated.View>
    )
}

export default Categories;