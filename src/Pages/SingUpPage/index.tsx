import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Text, TextInput, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppBar from "../../components/Global/AppBar";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextError from "../../components/Global/TextError";
import CustomButton from "../../components/Global/CustomButton";

import { useUser } from "../../contexts/UserContext";
import { withTiming } from "react-native-reanimated";
import useSnackBar from "../../hooks/useSnackBar";
import SnackBar from "../../components/Global/SnackBar";
import useScaleSize from "../../hooks/useScaleSize";


let schema = yup.object().shape({
    name: yup.string().required("Nome inválido").min(2, "O mínimo de caracteres é 2"),
    email: yup.string().required("Email inválido").email("Digite um email válido"),
    password: yup.string().required("Senha inválida").min(6, "O mínimo de caracteres é 6"),
    address: yup.string().required("Endereço inválido").min(5, "O mínimo de caracteres é 5")
})

const SingUp = ({navigation}: any) => {

    const { singUp } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const componentMounted = useRef(true)
    
    const { heightSucess, 
        heightError, 
        styleSnackbarSucess, 
        styleSnackbarError, 
        snackMessage, 
        setSnackMessage,
        size} = useSnackBar()

    const { register, setValue, handleSubmit, formState: { errors } } = useForm(
        {   
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = async (data: any) => {
        if(isLoading === false) return;
        if(componentMounted.current) setIsLoading(false)
        const reponse = await singUp(data.email, data.password, data.name, data.address, onError, onSucess)
        if(componentMounted.current) setIsLoading(true)
        
    }


    const onError = (text: string) => {
        if(componentMounted.current) setSnackMessage(text)
        heightError.value = withTiming(size)
        setTimeout(() => {
            heightError.value = withTiming(0)
        }, 3000);
    }

    const onSucess = (text: string) => {
        if(componentMounted.current) setSnackMessage(text)
        heightSucess.value = withTiming(size)
        
        setTimeout(() => {
            heightSucess.value = withTiming(0)
            setTimeout(() => {
                if(navigation.canGoBack()) navigation.pop()
                if(navigation.canGoBack()) navigation.pop()
            }, 1000);
        }, 2000);
    }

    const backAction = () => {
        return !isLoading;
    }

    useEffect(() => {
        register("name")
        register("email")
        register("password")
        register("address")
    }, [register])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
        return () => {
            componentMounted.current = false;
            backHandler.remove()
        };
    }, [])

    return (
        <View style={{flex: 1}}>
            <AppBar
            color="#078599"
            title="Criar Conta"
            iconName="left"
            sizeIcon={20}
            IconLib={AntDesign}
            f={() => {
                if(isLoading){
                    navigation.goBack()
                }
            }}
            />
            <View style={{padding: 10}}>
                <TextInput
                editable={isLoading}
                    placeholder="Nome"
                    onChangeText={text => {
                        setValue("name", text)
                    }}
                    style={{borderBottomWidth: 1, borderBottomColor: "#888", fontSize: useScaleSize(18)}}
                    />
                {errors.name && <TextError textError={errors.name.message}/>}
                <TextInput
                editable={isLoading}
                    placeholder="Email"
                    keyboardType={"email-address"}
                    onChangeText={text => {
                        setValue("email", text)
                    }}
                    style={{borderBottomWidth: 1, borderBottomColor: "#888", fontSize: useScaleSize(18)}}
                    />
                {errors.email && <TextError textError={errors.email.message}/>}
                <TextInput
                editable={isLoading}
                    placeholder="Senha"
                    onChangeText={text => {
                        setValue("password", text)
                    }}
                    secureTextEntry={true}
                    style={{borderBottomWidth: 1, borderBottomColor: "#888", fontSize: useScaleSize(18)}}
                    />
                {errors.password && <TextError textError={errors.password.message}/>}
                <TextInput
                editable={isLoading}
                    placeholder="Endereço"
                    onChangeText={text => {
                        setValue("address", text)
                    }}
                    style={{borderBottomWidth: 1, borderBottomColor: "#888", fontSize: useScaleSize(18)}}
                    />
                {errors.address && <TextError textError={errors.address.message}/>}
                <View style={{marginBottom: 20}}/>
                <CustomButton title="Criar Conta" f={()=>{
                    handleSubmit(onSubmit)()
                }}/>
            </View>
            <SnackBar styleSnackBar={styleSnackbarSucess} message={snackMessage}/>
            <SnackBar styleSnackBar={styleSnackbarError} message={snackMessage} error/>
        </View>
    )
}

export default SingUp;