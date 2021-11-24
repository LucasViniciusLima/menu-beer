import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import DrinkDetailBox from '../../components/DrinkDetailBox';

const DrinkList = (props: any) => {
    
    const [item,setItem] = useState(props["route"]?.params?.data);

    return (
        <View style={styles.screenBody}>
            <Text style={styles.mainText}>Opções para: {item?.name}</Text>
            <View style={styles.itemsList}>
            <FlatList 
                data={item.tipos}
                horizontal={false}
                numColumns={2}
                renderItem={({item}) => <DrinkDetailBox data={item}/> }
            />
            </View>
            
        </View>
    )
}

export default DrinkList

const styles = StyleSheet.create({
    screenBody: {
        backgroundColor: '#101010',
        flex: 1
    },
    itemsList: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },mainText: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "900",
        color: "#DDD",
    },

})
