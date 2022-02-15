import React, { useEffect } from "react"
import { createContext, ReactNode, useContext, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

type UserContextType = {
    user: {
        name: string;
        uid: string;
        email: string
    } | null;
    login: (email: string, password: string, onError:(error: string) => void, onSucess: () => void) => Promise<void>;
    singUp: (email: string, password: string, name: string, address: string, onError:(error: string) => void, onSucess: () => void) => Promise<void>;
    singOut: () => void;
}

type Props = {
    children: ReactNode
}

type User = {
    email: string;
    name: string;
    address: string;
    uid: string;
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}: Props) => {

    const [user, setUser] = useState<User | null>(null)

    const login = async (email: string, password: string, onError:(text: string) => void, onSucess: (text: string) => void) => {
        try {
            const { user } = await auth().signInWithEmailAndPassword(email, password)
            const userData = await firestore().collection("users").doc(user.uid).get()
            setUser(
                {
                    email: email,
                    name: userData.data()?.name,
                    address: userData.data()?.address,
                    uid: user.uid
                }
            )
            onSucess("Usuário logado com sucesso")
        } catch(e: any){
            if(e.code === "auth/user-not-found"){
                onError("Usuário não cadastrado")
            } else if (e.code === "auth/wrong-password"){
                onError("Senha incorreta")
            } else {
                onError("")
            }
            console.log(e)
        }
    }   

    const singUp = async (email: string, password: string, 
                    name: string, address: string, 
                    onError: (text: string) => void,
                    onSucess: (text: string) => void) => {
        try{
            const { user } = await auth().createUserWithEmailAndPassword(email, password)
    
            const reponse = firestore()
            .collection("users")
            .doc(user.uid)
            .set({
                name,
                address
            })
            setUser(
                {
                    email: email,
                    name,
                    address,
                    uid: user.uid
                }
            )
            onSucess("Usuário criado com sucesso")
        } catch(e: any){
            if(e.code === "auth/email-already-in-use"){
                onError("Email já em uso")
            } else if (e.code === 'auth/invalid-email'){
                onError("Email inválido")
            } else {
                onError("Falha ao criar conta tente novamente mais tarde")
            }
        }
    }

    const singOut = () => {
        auth()
        .signOut()
        .then((v) => {
            console.log("Yes")
            setUser(null)
        })
    }

    const getInfosUser = async (user: FirebaseAuthTypes.User) => {
        const userData = await firestore().collection("users").doc(user.uid).get()
        setUser(
            {
                email: user.email || "",
                name: userData.data()?.name,
                address: userData.data()?.address,
                uid: user.uid
            }
        )
    }

    useEffect(() => {
        const subscribe = auth().onAuthStateChanged((user) => {
            if(user !== null){
                getInfosUser(user)
            } else {
                console.log("User:",user)
            }
            
        })
        return subscribe()
    }, [])

    return (
        <UserContext.Provider value={{user, login, singUp, singOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)