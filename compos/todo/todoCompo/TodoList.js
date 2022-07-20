import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import TodoModal from "./TodoModal";

export default class TodoList extends React.Component {
  state = {
    showListVisible: false,
  };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }
  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name} Title
          </Text>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}> Remaining </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  listContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 2,
    paddingHorizontal: 1,
    borderRadius: 6,
    marginHorizontal: 1,
    alignItems: "center",
    width: 300,
  },
  listTitle: {
    flex: 1,
    margin: 10,
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 20,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
