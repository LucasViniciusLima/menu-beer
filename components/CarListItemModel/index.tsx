import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import db from '../../config/firebase/config';

async function deletItem(id: string) {
    const itemRef = db.collection('carrinho');
    await itemRef.doc(id).delete().then(()=>{console.log('item com id: '+id+ ' deletado')});
  }

export default function CarListItemModel(props: any) {
    const item = props.data;

    return (
        <View style={style.container}>
            <Image
                source={{ uri: item.img }}
                style={style.image}
            />
            <View style={style.textArea}>
                <Text>{item.name}, {item.quantidade} Unidades</Text>
                <View style={style.wordsLine}>
                    <Text>Valor: R$ {item.price.toFixed(2) * item.quantidade}</Text>
                    <Text style={{color: 'red'}} onPress={ ()=> {deletItem(item.id)} }>Remover</Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#A3A3A3',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#333'
    },
    wordsLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textArea: {
        flex: 1,
        paddingHorizontal: 10
    }
});
