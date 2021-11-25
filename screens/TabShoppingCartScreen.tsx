import * as React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from '../components/Themed';

import NavTop from '../components/NavTop';
import CarListItemModel from '../components/CarListItemModel';
import db from '../config/firebase/config';
import LoginUser from '../constants/LoginUser';

async function getCarrinho() {
  let carrinho: any = [];

  const carRef = db.collection('carrinho');
  await carRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;
      carrinho.push(item);
    })
  });

  return carrinho;
}

async function comprarItens(itens: Array<any>) {
  if (LoginUser.logado) {
    let pedido: any;
    pedido = {
      itensCarrinho: itens,
      dadosCliente: LoginUser.user,
      //total:
    };
    const pedidoRef = db.collection('pedidos');
    await pedidoRef.add(pedido);
    alert('Obrigado por comprar com a gente, agredecemos a preferencia :)');
  } else {
    alert('Faça login com sua conta para fazer o pedido');
  }

}

export default function TabShoppingCartScreen() {
  const [carrinho, setCarrinho] = React.useState(Array);

  const getData = async () => {
    setCarrinho(await getCarrinho());
  }

  const getTotal = () => {
    let total = 0;
    carrinho.forEach((item: any) => {
      total += item?.price * item?.quantidade;
    });
    return total;
  }

  useFocusEffect(() => { getData(); });

  return (
    <View style={{ flex: 1 }}>
      <NavTop />
      <View style={styles.mainView}>
        <FlatList
          data={carrinho}
          renderItem={({ item }) => <CarListItemModel data={item} />}
        />
      </View>
      <TouchableOpacity onPress={()=>{comprarItens(carrinho)}}>
        <View style={styles.btnConfirmar}>
          <Text style={styles.btnConfirmarText}>Confirmar - R${getTotal().toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    paddingVertical: 10
  },
  btnConfirmar: {
    backgroundColor: '#DA2222',
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnConfirmarText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700'
  }
});
