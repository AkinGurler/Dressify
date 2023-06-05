import { StyleSheet, Text, View } from 'react-native'
import axios from "axios"
import React, { useState } from 'react'

const useFetch = () => {
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchData = async (url) => {
        try {
            const {data:responseData} = await axios.get(url)
            setData(responseData)
            setLoading(false)
        } catch (error) {
            setErr(error.message)
            setLoading(false)
        }
    }
    return { data, err, loading, fetchData }
}

export default useFetch

const styles = StyleSheet.create({})