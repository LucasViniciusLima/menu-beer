import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button, TextInput } from 'react-native';

import db from '../../config/firebase/config';


export default function DrinkDetailBox(props: any) {
    const [modalStatus, setModal] = useState(false);
    const [quantidadeItens, setQuantidadeItens] = useState(0);


    const onChangeQuantity = (quantity: string) => {
        const quantidade = parseInt(quantity.replace(/[^0-9]/g, ''));
        if (props.data?.inventory_units > quantidade) setQuantidadeItens(quantidade);
        else alert('Desculpe, mas não existem mais que ' + props.data?.inventory_units + ' produtos em estoque.');
    };

    const plusItem = () => {
        if (props.data?.inventory_units > quantidadeItens) setQuantidadeItens(quantidadeItens + 1);
        else alert('Desculpe, mas não existem mais que ' + props.data?.inventory_units + ' produtos em estoque.');
    };

    const decrementItem = () => {
        if (quantidadeItens > 0) setQuantidadeItens(quantidadeItens - 1);
    };

    const mostrarModal = () => {
        setModal(!modalStatus);
    }

    const adicionarCarrinho = () => {
        const item: any = props.data;
        item.quantidade = quantidadeItens;

        const carDoc = db.collection('carrinho');
        /*
        carDoc.doc('JtI2s8iXBjkWStfbC6Mb').update({
            [''+props.data.name] : item
        });*/
        carDoc.add(item);

        mostrarModal();
    }


    return (
        <View>
            <TouchableOpacity onPress={() => { mostrarModal() }}>
                <View style={style.boxBody}>
                    <Image style={style.imgItem} source={{ uri: props.data?.img }} />
                    <Text style={style.label}>{props.data?.name}</Text>
                </View>
                <Modal visible={modalStatus} transparent={true} animationType={'slide'}>
                    <View style={style.modalView}>
                        <View style={style.viewX}>
                            <TouchableOpacity style={style.btnQuantitiesDown}
                                onPress={() => mostrarModal()} >
                                <Text style={style.labelX}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <Image style={style.imgItemOpen} source={{ uri: props.data?.img }} />
                        <View style={style.textAreaV}>
                            <Text style={style.labelOpen}>{props.data?.name}</Text>
                            <Text style={style.labelDescricao}>{props.data?.description}</Text>
                            <Text style={style.labelDescricao}>R$ {props.data?.price.toFixed(2)} cada</Text>
                        </View>
                        <View style={style.inputArea}>
                            <TouchableOpacity style={style.btnQuantitiesDown}
                                onPress={() => decrementItem()}
                            >
                                <Text style={style.btnQuantidadeText}>-</Text>
                            </TouchableOpacity>

                            <TextInput
                                style={style.inputQuantity}
                                keyboardType="numeric"
                                onChangeText={(text) => onChangeQuantity(text)}
                                value={quantidadeItens + ''}
                            />
                            <TouchableOpacity style={style.btnQuantitiesUp}
                                onPress={() => plusItem()}
                            >
                                <Text style={style.btnQuantidadeText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={style.txtTotal} >Custo total: R$ {props.data?.price.toFixed(2) * quantidadeItens}</Text>
                        <Button
                            title='Adicionar ao Carrinho'
                            onPress={() => { adicionarCarrinho() }}
                        />
                    </View>
                </Modal>
            </TouchableOpacity>
        </View>
    );
}


const style = StyleSheet.create({
    boxBody: {
        backgroundColor: '#333',
        borderRadius: 9,
        paddingVertical: 10,
        width: 175,
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5
    },
    label: {
        color: '#DDDDDD',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5
    },
    labelDescricao: {
        color: '#DDDDDD',
        fontSize: 16,
        marginVertical: 3
    },
    labelOpen: {
        color: '#DDDDDD',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    },
    labelX: {
        color: '#DDDDDD',
        fontSize: 22,
        marginBottom: 5
    },
    imgItem: {
        width: 155,
        height: 155
    },
    imgItemOpen: {
        width: 260,
        height: 260
    },
    modalView: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '90%',
        width: 'auto',
        backgroundColor: '#333',
        marginHorizontal: 30,
        marginVertical: 10,
        padding: 20,
        borderRadius: 12
    },
    textAreaV: {
        width: 260
    },
    inputQuantity: {
        backgroundColor: '#FFF',
        width: 185,
        margin: 5,
        fontSize: 22,
        textAlign: 'center',
        height: 40,
        borderRadius: 5
    },
    btnQuantitiesUp: {
        backgroundColor: '#FF8C00',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnQuantitiesDown: {
        backgroundColor: '#FF0000',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnQuantidadeText: {
        color: '#FFF',
        fontSize: 22,
        textAlign: 'center'
    },
    inputArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    txtTotal: {
        color: '#FFF',
        fontSize: 19,
        marginBottom: 10
    },
    viewX: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: 260,
        marginBottom: 5
    }

});