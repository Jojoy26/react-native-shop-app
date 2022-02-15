import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import CustomDrawer from "../../components/Global/CustomDrawer";
import FindStore from "../../Pages/FindStorePage";
import Home from "../../Pages/HomePage";
import MyOrders from "../../Pages/MyOrdersPage";
import ProductsStack from "../ProductsStack";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={
              {
                headerShown: false,
                drawerType: "slide",
                drawerStyle: {
                  width: "65%",
                },
                swipeEnabled: false,
                overlayColor: "transparent",
                sceneContainerStyle: {
                  backgroundColor: "#ddf2f7"
                }
              }
            }
            >

            <Drawer.Screen name='Home' component={Home}/>
            <Drawer.Screen name="ProductsStack" component={ProductsStack} options={{
              unmountOnBlur: true
            }}/>
            <Drawer.Screen name="FindStore" component={FindStore}/>
            <Drawer.Screen name="MyOrders" component={MyOrders} options={{
              unmountOnBlur: true
            }}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;