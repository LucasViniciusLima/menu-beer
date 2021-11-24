import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from "react-native";
import ItensList from "../ItensList";
import { drinksAds } from '../../assets/images';

import db from '../../config/firebase/config';

async function getBeers() {
    let beers: any = []
    const beersDoc = db.collection('beers');
    await beersDoc.get().then((snapshot) => {
        snapshot.forEach((item) => {
            beers.push(item.data());
        });
    });
    console.log('entrou');
    return beers;
}

async function getHotDrinks() {
    let hotDrinks: any = []
    const beersDoc = db.collection('hotDrinks');
    await beersDoc.get().then((snapshot) => {
        snapshot.forEach((item) => {
            hotDrinks.push(item.data());
        });
    });
    console.log('entrou');
    return hotDrinks;
}


export default function Drinks() {

    const [beersList, setBeersList] = useState(Array);
    const [hotDrinks, setHotDrinksList] = useState(Array);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setBeersList(await getBeers());
        setHotDrinksList(await getHotDrinks());        
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.mainText}>Destaques:</Text>
                    <Image source={drinksAds} style={styles.ads} />
                </View>
                <Text style={styles.mainText}>Cervejas</Text>
                <View style={styles.list}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={beersList}
                        renderItem={({ item }) => <ItensList data={item} />}
                    />
                </View>
                <Text style={styles.mainText}>Bebidas Quentes</Text>
                <View style={styles.list}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={hotDrinks}
                        renderItem={({ item }) => <ItensList data={item} />}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ads: {
        height: 300,
        width: "100%",
    },
    mainText: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "900",
        color: "#DDD",
    },
    list: {
        flexDirection: "row",
    },
});