import React,{ createContext, ReactNode, useContext, useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import { useUser } from "./UserContext"
import { ItemCart } from "../types/ItemCartType"


type CartContextType = {
    loadingItemsCart: (items: any) => void;
    cartItems: ItemCart[]
}

const CartContext = createContext<CartContextType>({} as CartContextType)

type Props = {
    children: ReactNode
}

export const CartProvider = ({children}: Props) => {

    const [cartItems, setCartItems] = useState<ItemCart[]>([])

    const { user } = useUser()

    const loadingItemsCart = async (items: any) => {
        const list: ItemCart[] = []
        for(let item of items.docs){
            list.push({...item.data() as ItemCart, ref: item.ref.id})
        }
        setCartItems(list)
    }

    useEffect(() => {
        const subscribe = firestore().
        collection('cart').
        doc(user?.uid).
        collection("items").
        onSnapshot(loadingItemsCart, () => {console.log("ERRO")})

        return () => subscribe()
    }, [])

    return (
        <CartContext.Provider value={{loadingItemsCart, cartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)