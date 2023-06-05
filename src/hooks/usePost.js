import { StyleSheet, Text, View } from 'react-native'
import axios from "axios"
import React, { useState } from 'react'

const usePost = () => {
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const postData = async (url,apiData,config) => {

        try {
            setLoading(true);
            const {data:responseData} = await axios.post(url, apiData,config)
            setData(responseData)
            setLoading(false)
        } catch (error) {
            setErr(error.message)
            console.log(error)
            setLoading(false)
        }
    }
    return { data, err, loading, postData }
}

export default usePost

