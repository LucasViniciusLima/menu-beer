import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

import db from '../../config/firebase/config';

const mainIcon = require('../../assets/icons/red_icon_V4.png');

export default function Cadastro(props) {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [senha2, setSenha2] = React.useState('');
    const [telefone, setTelefone] = React.useState('');

    const navigation = useNavigation();

    const cadastrar = async () => {
        if (senha != senha2) return;
        const userDoc = db.collection('users');
        var user = {
            pass: senha,
            name: nome,
            telefone: telefone
        };
        await userDoc.doc(email).set(user);
        navigation.goBack();
    }

    return (
        <View style={style.container}>
            <ScrollView>
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Image style={style.mainIcon} source={mainIcon} />
                </View>
                <View>
                    <Text style={style.labelTxt}>Nome:</Text>
                    <TextInput
                        style={style.basicInput}
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                        placeholder={'Digite seu Nome'}
                    />
                    <Text style={style.labelTxt}>Telefone:</Text>
                    <TextInput
                        style={style.basicInput}
                        onChangeText={(text) => setTelefone(text)}
                        value={telefone}
                        placeholder={'Digite seu Telefone'}
                    />
                    <Text style={style.labelTxt}>Email:</Text>
                    <TextInput
                        style={style.basicInput}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder={'Digite seu E-mail'}
                    />
                    <Text style={style.labelTxt}>Senha:</Text>
                    <TextInput
                        style={style.basicInput}
                        onChangeText={(text) => setSenha(text)}
                        value={senha}
                        placeholder={'Digite sua Senha'}
                        secureTextEntry={true}
                    />
                    <Text style={style.labelTxt}>Confirme sua senha:</Text>
                    <TextInput
                        style={style.basicInput}
                        onChangeText={(text) => setSenha2(text)}
                        value={senha2}
                        placeholder={'Digite sua Senha novamente'}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={() => { cadastrar(); }}>
                        <View style={style.btnConfirmar}>
                            <Text style={style.btnConfirmarText}>Continuar Cadastro</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202020',
    },
    btnConfirmar: {
        marginTop: 40,
        backgroundColor: '#FFA533',
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10,
        marginBottom: 20
    },
    basicInput: {
        marginTop: 5,
        backgroundColor: '#FFF',
        padding: 10,
        textAlign: 'center',
        width: 350,
        borderRadius: 10
    },
    btnConfirmarText: {
        color: '#FFF',
        fontSize: 19,
        fontWeight: '700'
    },
    labelTxt: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10
    },
    mainIcon: {
        width: 110,
        height: 52
    }
})