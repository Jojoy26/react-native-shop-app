import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../components/Global/CustomButton";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import TextError from "../../components/Global/TextError";
import { useUser } from "../../contexts/UserContext";
import useSnackBar from "../../hooks/useSnackBar";
import { runOnJS, withTiming } from "react-native-reanimated";
import SnackBar from "../../components/Global/SnackBar";
import useScaleSize from "../../hooks/useScaleSize";

let schema = yup.object().shape({
    email: yup.string().required("Email inválido").email("Digite um email válido"),
    password: yup.string().required("Senha inválida").min(6, "O mínimo de caracteres é 6")
})

const Login = ({navigation}: any) => {

    const { login } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const componentMounted = useRef(true)

    const { heightSucess, 
        heightError, 
        styleSnackbarSucess, 
        styleSnackbarError, 
        snackMessage, 
        setSnackMessage,
        size } = useSnackBar()

    const { register, setValue, handleSubmit, formState: { errors } } = useForm(
        {   
            mode: "all",
            reValidateMode: "onBlur",
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = async (data: any) => {
            if(isLoading === false) return
            if(componentMounted.current) setIsLoading(false)
            const reponse = await login(data.email, data.password, onError, onSucess)
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
                if(navigation.canGoBack()){
                    navigation.pop()
                }
            }, 1000);
        }, 2000);
    }
    const backAction = () => {
        return !isLoading;
    }

    useEffect(() => {
        register("email")
        register("password")
    }, [register])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
        return () => {
            componentMounted.current = false
            backHandler.remove();
        }
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={
            {
                height: 55, 
                backgroundColor: "#078599",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }
            }>
                <Text style={{fontWeight: "600", color: "#fff", fontSize: useScaleSize(21)}}>
                    Entrar
                </Text>
                <TouchableOpacity
                onPress={() => {
                    if(isLoading){
                        navigation.navigate("SingUp")
                    }
                }}
                style={{
                    position: "absolute",
                    top: 17,
                    right: 20,
                }}>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: useScaleSize(19)
                        }}>
                        Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 18,
                        alignSelf: "center",
                        padding: 2,
                    }}
                    onPress={() => {
                        navigation?.goBack()
                    }}>
                    <AntDesign 
                    name="left" 
                    color={"#fff"} 
                    size={useScaleSize(25)}
                    />
                </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
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
                secureTextEntry={true}
                onChangeText={text => setValue("password", text)}
                style={{borderBottomWidth: 1, borderBottomColor: "#888", fontSize: useScaleSize(18)}}
                />
                {errors.password && <TextError textError={errors.password.message}/>}
                <TouchableOpacity style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    marginBottom: 10,
                }}>
                    <Text style={{color: "#333"}}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <CustomButton title="Entrar" f={()=>{
                    handleSubmit(onSubmit)()
                }}/>
            </View>
            <SnackBar styleSnackBar={styleSnackbarSucess} message={snackMessage}/>
            <SnackBar styleSnackBar={styleSnackbarError} message={snackMessage} error/>
        </View>
    )
}

export default Login;