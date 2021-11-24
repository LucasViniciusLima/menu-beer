import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DrinkDetail = (props: any) => {

    console.log('Produto', props?.route?.params);
    const { name, image } = props?.route?.params;

    return (
        <View>
            <Text>DrinkDetail</Text>
            <Text>{name}</Text>
        </View>
    )
}

export default DrinkDetail

const styles = StyleSheet.create({})