import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import usePost from "../hooks/usePost";
import { Alert } from "react-native";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [text, setText] = useState("text");
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null)
    const [isDressChange, setIsDressChange] = useState(false)

    /* const {data, err, loading, postData }=usePost(); */


    const login = async (values) => {
        console.log("values for login", values)
        try {

            setIsLoading(true)
            const { data } = await axios.post('http://10.0.3.2:8080/api/v1/auth/authenticate', values);
            console.log("login datası", data)
            setUserToken(data.token);
            setUserInfo(data.userInfo)
            AsyncStorage.setItem("userToken", data.token);
            AsyncStorage.setItem("userInfo", JSON.stringify(data.userInfo));

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            if (error.isAxiosError) {
                // Axios kaynaklı hata
                if (error.response) {
                    // Hata durumuyla birlikte sunucudan dönen yanıt var
                    console.log("Hata durumu:", error.response.status);
                    console.log("Hata mesajı:", error.response.data.message);
                } else {
                    // Sunucudan yanıt alınamadı
                    console.log("Sunucuyla iletişim hatası");
                }
            } else {
                // Axios dışında bir hata
                console.log("Axios dışında bir hata:", error.message);
            }
            Alert.alert("Giriş Hatası", "Hatalı Giriş");
            setIsLoading(false);
        }

    }

    const register = async (values) => {

        try {
            console.log("register çalıştı")
            setIsLoading(true)
            const data = await axios.post("http://10.0.3.2:8080/api/v1/auth/register", values);
            console.log("register işlemi", data)
            setIsLoading(false)

        } catch (error) {
            console.log("register error", error)
            setIsLoading(false)
        }
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);

        AsyncStorage.removeItem("userToken");
        AsyncStorage.removeItem("userInfo");

        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
           
            let userToken = await AsyncStorage.getItem("userToken");
            let userInfoString = await AsyncStorage.getItem("userInfo");
            
            setUserToken(userToken);
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                setUserInfo(userInfo);
            }


            setIsLoading(false);
        } catch (error) {
            console.log("is loggid in error", error)
        }

    }

    useEffect(() => {
        isLoggedIn()
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, register, userInfo,isDressChange,setIsDressChange }}  >
            {children}
        </AuthContext.Provider >
    )

}