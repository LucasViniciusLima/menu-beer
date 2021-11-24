import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import LoginUser from '../constants/LoginUser';

const userImg = require("./../assets/icons/user.png");
import db from '../config/firebase/config';

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [login, setLogin] = React.useState(false);
    const [editando, setEditando] = React.useState(false);
    const [nome, setNome] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [user, setUser] = React.useState({});

    const [numero, setNumero] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [rua, setRua] = React.useState('');

    const fazerLogin = async () => {
        const userDoc = db.collection('users');
        const userSnap = await userDoc.doc(email).get();
        const user = userSnap.data();
        if (senha == user?.pass) {
            setLogin(true);
            LoginUser.user = user;
            LoginUser.logado = true;
            setUser(user);
            setNumero(user?.endereco.numero);
            setRua(user?.endereco.rua);
            setCep(user?.endereco.cep);
            setBairro(user?.endereco.bairro);
            setCidade(user?.endereco.cidade);
            setNome(user?.name);
            setTelefone(user?.telefone);
        }
    }

    const salvarEdicao = async () => {
        const userDoc = db.collection('users');
        let nUser = {
            name: nome,
            telefone: telefone,
            pass: user?.pass,
            endereco: {
                rua: rua,
                bairro: bairro,
                numero: numero,
                cep: cep,
                cidade: cidade
            }
        };
        await userDoc.doc(email).set(nUser);
        setUser(nUser);
        setEditando(false);
    }

    if (!login) return (
        <View style={style.container}>
            <Image
                source={userImg}
                style={style.img}
            />
            <TextInput
                onChangeText={(text) => { setEmail(text) }}
                value={email}
                style={style.basicInput}
                placeholder={'Digite seu E-mail'}
            />
            <TextInput
                onChangeText={(text) => { setSenha(text) }}
                secureTextEntry={true}
                value={senha}
                style={style.basicInput}
                placeholder={'Digite sua Senha'}
            />
            <TouchableOpacity onPress={() => { fazerLogin(); }}>
                <View style={style.btnConfirmar}>
                    <Text style={style.btnConfirmarText}>Entrar</Text>
                </View>
            </TouchableOpacity>
            <View style={style.textRow}>
                <Text style={{ fontSize: 16, color: '#D0D0D0' }}>Ainda não possui uma conta? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Cadastro") }}>
                    <Text style={{ color: '#FFA533', fontWeight: 'bold', fontSize: 16 }}>Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    else return (
        <View style={{ flex: 1 }}>
            <View style={style.headerBlock}>
                <Image source={userImg} style={style.img2} />
                <View>
                    <Text style={style.defaultText}>Nome: {user?.name}</Text>
                    <Text style={style.defaultText}>Telefone: {user?.telefone}</Text>
                    <Text style={style.defaultText}>E-mail: {email}</Text>
                </View>
            </View>
            <View style={style.logBodyAddress}>
                <TouchableOpacity onPress={() => { setEditando(true) }}>
                    <View style={style.btnEditarPerfil}>
                        <Text style={style.btnConfirmarText}>Editar Perfil</Text>
                    </View>
                </TouchableOpacity>
                <Text style={style.defaultText}>Endereço</Text>
                <Text style={style.defaultText}>CEP: {user?.endereco?.cep}</Text>
                <Text style={style.defaultText}>Rua: {user?.endereco?.rua}</Text>
                <Text style={style.defaultText}>Número: {user?.endereco?.numero}</Text>
                <Text style={style.defaultText}>Bairro: {user?.endereco?.bairro}</Text>
                <Text style={style.defaultText}>Cidade: {user?.endereco?.cidade}</Text>
            </View>
            <Modal visible={editando} transparent={true} animationType={'slide'}>
                <ScrollView>
                    <View style={style.modalView}>
                        <View>
                            <Text style={style.editTitle}>EDITAR PERFIL</Text>
                            <Text style={style.defaultText}>Nome:</Text>
                            <TextInput
                                onChangeText={(text) => { setNome(text) }}
                                value={nome}
                                style={style.editInput}
                                placeholder={'Nome'}
                            />
                            <Text style={style.defaultText}>Telefone:</Text>
                            <TextInput
                                onChangeText={(text) => { setTelefone(text) }}
                                value={telefone}
                                style={style.editInput}
                                placeholder={'Telefone'}
                            />
                            <Text style={style.editTitle}>Endereço:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={style.defaultText}>CEP:</Text>
                                    <TextInput
                                        onChangeText={(text) => { setCep(text) }}
                                        value={cep}
                                        style={style.editInputTiny}
                                        placeholder={'CEP'}
                                    />
                                </View>
                                <View>
                                    <Text style={style.defaultText}>Numero:</Text>
                                    <TextInput
                                        onChangeText={(text) => { setNumero(text) }}
                                        value={numero}
                                        style={style.editInputTiny}
                                        placeholder={'Numero'}
                                    />
                                </View>
                            </View>
                            <Text style={style.defaultText}>Rua:</Text>
                            <TextInput
                                onChangeText={(text) => { setRua(text) }}
                                value={rua}
                                style={style.editInput}
                                placeholder={'Rua'}
                            />
                            <Text style={style.defaultText}>Bairro:</Text>
                            <TextInput
                                onChangeText={(text) => { setBairro(text) }}
                                value={bairro}
                                style={style.editInput}
                                placeholder={'Bairro'}
                            />
                            <Text style={style.defaultText}>Cidade:</Text>
                            <TextInput
                                onChangeText={(text) => { setCidade(text) }}
                                value={cidade}
                                style={style.editInput}
                                placeholder={'Cidade'}
                            /></View>
                        <TouchableOpacity onPress={() => { salvarEdicao() }}>
                            <View style={style.btnConfirmar}>
                                <Text style={style.btnConfirmarText}>Salvar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#313131'
    },
    btnConfirmar: {
        marginTop: 40,
        backgroundColor: '#FFA533',
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10
    },
    btnEditarPerfil: {
        backgroundColor: '#313131',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10,
        borderColor: '#aaa',
        borderWidth: 2,
        marginBottom: 30
    },
    btnConfirmarText: {
        color: '#FFF',
        fontSize: 19,
        fontWeight: '700'
    },
    basicInput: {
        marginTop: 15,
        backgroundColor: '#FFF',
        padding: 10,
        textAlign: 'center',
        width: 350,
        borderRadius: 10
    },
    editInput: {
        marginTop: 3,
        backgroundColor: '#FFF',
        padding: 10,
        width: 350,
        borderRadius: 10,
        marginBottom: 10
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 10,
        backgroundColor: '#333',
        borderRadius: 222
    },
    img2: {
        width: 100,
        height: 100,
        borderRadius: 222,
        marginRight: 10
    },
    textRow: {
        flexDirection: 'row',
        marginTop: 10
    },
    defaultText: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 10
    },
    headerBlock: {
        backgroundColor: '#010101',
        padding: 20,
        width: '100%',
        flexDirection: 'row'
    },
    logBodyAddress: {
        flex: 1,
        backgroundColor: '#313131',
        padding: 20
    },
    modalView: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
        backgroundColor: '#333',
        marginHorizontal: 10,
        marginVertical: 60,
        paddingVertical: 20,
        borderRadius: 12,
        borderColor: '#555',
        borderWidth: 3,
    },
    editTitle: {
        color: '#FFF',
        marginVertical: 10,
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center'
    },
    editInputTiny: {
        marginTop: 3,
        backgroundColor: '#FFF',
        padding: 10,
        width: 150,
        borderRadius: 10,
        marginBottom: 10
    }
});