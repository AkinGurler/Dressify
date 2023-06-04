import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Card from './Card'


const RenderDress = ({ data, combine }) => {
    console.log("data geldi",data)


    const handleRender = ({ item }) => (

        combine ? <Card dress={item} combine={combine} /> :
        <Card dress={item} combine={combine} />
    )

    return (
        <View>
            <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={data}
                renderItem={handleRender}
            ></FlatList>
        </View>
    )
}

export default RenderDress

const styles = StyleSheet.create({})