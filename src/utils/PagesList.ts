import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"

const PagesList = [
    {
        title: "Home",
        iconName: "home",
        iconLib: Entypo,
        pageNavigation: "Home",
        index: 0,
        size: 17
    },
    {
        title: "Produtos",
        iconName: "list",
        iconLib: Feather,
        pageNavigation: "ProductsStack",
        index: 1,
        size: 17
    },
    {
        title: "Encontre uma loja",
        iconName: "location-sharp",
        iconLib: Ionicons,
        pageNavigation: "FindStore",
        index: 2,
        size: 17
    },
    {
        title: "Meus Pedidos",
        iconName: "menuunfold",
        iconLib: AntDesign,
        pageNavigation: "MyOrders",
        index: 3,
        size: 18
    },
]

export default PagesList;