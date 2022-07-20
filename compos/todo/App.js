import React from "react";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged, unsubscribe } from "firebase/auth";
import { app } from "../../config/firebase";
import { collection, doc, getDocs, onSnapshot, getFirestore, setDoc, updateDoc} from "firebase/firestore";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import TodoList from "./todoCompo/TodoList";
import AddListModal from "./todoCompo/AddListModal";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempoData";
import { get } from "react-native/Libraries/Utilities/PixelRatio";






// const addList = (list) => {
//   let ref = collection(db, "users/ALPzkArG3ZViRQ1ozJYB/lists")
//   ref.add(list)
//=======================================
const db = getFirestore(app);
//=======================================
const collectionRef = doc(db, "users/ALPzkArG3ZViRQ1ozJYB/lists/jTGmpFkYf47dA3lh8HGf");

let refe = collection(db, "users/ALPzkArG3ZViRQ1ozJYB/lists")
// console.log(refe)

const getLists = (callback) => {
  onSnapshot(refe, (data) => {
    let lists = [];
    data.docs.map((item) => {
      lists.push({ id: item.id, ...item.data() });
    });
    callback(lists);
    // console.log(lists);
  });
};





const getUser = (callback) => {
  let user  = getAuth().currentUser
}




const writeData = (callback)=>{

}


export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
  };

  componentDidMount() {

    getLists((lists) => {
      this.setState({lists}, () => {
        console.log(this.state.lists)
      });
    });


    getUser((user)=>{
      this.setState({user}, ()=>{
        console.log(this.state.user)
      })
    })
 
  
  }

  componentWillUnmount() {
    // unsubscribe();
  }
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

// addList = (list) => {
//     console.log("hello am trying to push stuff to db")
// list = {
//       name:list.name,
//       color:list.color, 
//       todos:[]
//     }
//     updateDoc(collectionRef, list)
//     console.log("done in db now ")
// };


  // updateList = (list) => {
  //   this.setState({
  //     lists: this.state.lists.map((item) => {
  //       return item.id === list.id ? list : item;
  //     }),
  //   });
  // };



  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View>
          <Text>User</Text>
          {/* <Text>{this.state.user.email}</Text> */}
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.lineDivider} />
          <Text style={styles.title}>
            {"Projekt"}
            <Text style={{ fontWeight: "300", color: colors.blue }}>
              {"listen"}
            </Text>
          </Text>
          <View style={styles.lineDivider} />
        </View>

        <View style={{ height: 500, paddingLeft: 10 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <Text style={styles.add}> Hinzufügen Projekt</Text>
            <AntDesign name="plus" size={30} color={colors.blue} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  lineDivider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.black,
    paddingHorizontal: 50,
  },
  addList: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: colors.black,
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
