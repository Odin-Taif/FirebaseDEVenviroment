import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard, 
} from "react-native";
import React, { Component } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";

export default class TodoModal extends Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted  = index => {
    let list = this.props.list
    list.todos[index].completed  =!list.todos[index].completed
    this.props.updateList(list);
  }
  addTodo = ()=>{
    let list = this.props.list
    list.todos.push({title:this.state.newTodo, completed:false})
    this.props.updateList(list);
    this.setState({newTodo:""})
    Keyboard.dismiss()
  }

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={()=>this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.lightBlue}
            style={{ width: 40 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.lightBlue : colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };
  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={30} color={colors.black} />
          </TouchableOpacity>
          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <Text style={styles.title}>{this.state.name} </Text>
            <Text style={styles.taskCount}>
              {" "}
              {completedCount} of {taskCount} tasks{" "}
            </Text>
          </View>
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={(styles.section, styles.footer)}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
             onChangeText={text=>this.setState({newTodo:text})} value={this.state.newTodo}/>
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={()=>this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.black,
    fontWeight: "600",
  },
  footer: {
    marginVertical:20, 
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",

  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginHorizontal: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
