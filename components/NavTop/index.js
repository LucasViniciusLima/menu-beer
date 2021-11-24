import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import LoginUser from "../../constants/LoginUser";

const redIcon = require("../../assets/icons/red_icon_V4.png");
const user = require("../../assets/icons/user.png");


class NavTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.data?.nome,
      endereco: this.props.data?.endereco,      
    };
    this.state.endereco = "Rua Lorem Ipsum 0001";
  }
  render() {
    
    return (
      <View style={styles.navBody}>
        <View>
          <TouchableOpacity>
            <Image style={styles.logoIcon} source={redIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addArea}>
          <View>
            <Text style={[styles.whiteText, styles.txtAlignEnd]}>Endereço</Text>
            <Text style={[styles.orangeText, styles.txtAlignEnd]}>
              {this.state.endereco}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Image style={styles.icon} source={user} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBody: {
    height: 70,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 6,
    flexDirection: "row",
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  logoIcon: {
    width: 100,
    height: 45,
    marginLeft: 5,
  },
  addArea: {
    justifyContent: "flex-end",
    marginLeft: 10,
    flex: 1,
  },
  whiteText: {
    color: "#fff",
  },
  orangeText: {
    color: "#FFA533",
  },
  txtAlignEnd: {
    textAlign: "right",
  },
});

export default NavTop;
