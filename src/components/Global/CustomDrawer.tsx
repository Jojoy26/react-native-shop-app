import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import React, { useContext, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DrawerItem from "./DrawerItem";
import PagesList from "../../utils/PagesList";
import useScaleSize from "../../hooks/useScaleSize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContext } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";


const CustomDrawer = (props: DrawerContentComponentProps) => {

    const navigation = useContext(NavigationContext)

    const { user, singOut } = useUser()

    useEffect(() => {
        console.log()
    })

    return(
        <LinearGradient colors={["#D0F3F9", "#FBFBFB"]} style={{flex: 1}}>
            <DrawerContentScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={{fontSize: useScaleSize(38), fontWeight: "bold",color: "#222"}}>
                            React {`\n`}Clothing
                        </Text>
                        <Text style={{color: "#222", fontWeight: "bold", marginTop: 10, fontSize: useScaleSize(21)}}>
                            Olá, {user?.name}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            if(user === null){
                                navigation?.navigate("Login")
                            } else {
                                singOut()
                            }
                        }}>
                            <Text style={{color: "#008397", 
                            fontWeight: "bold", 
                            fontSize: useScaleSize(18)}}>
                                {user === null ? 'Entre ou cadastre-se >' : "Sair"}
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                        height: 0.3,
                        width: "100%",
                        backgroundColor: "#ddd",
                        marginTop: 15
                        }}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        {PagesList.map((item, index) => {
                            return (
                                <DrawerItem
                                    key={index}
                                    title={item.title}
                                    iconName={item.iconName}
                                    IconLib={item.iconLib}
                                    f={() => {
                                        props.navigation.navigate(item.pageNavigation)
                                    }}
                                    index={item.index}
                                    focusedIndex={props.state.index}
                                    size={item.size}
                                />
                            )
                        })}
                    
                    </View>
                </View>
            </DrawerContentScrollView>
        </LinearGradient>
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
    },
})

export default CustomDrawer;