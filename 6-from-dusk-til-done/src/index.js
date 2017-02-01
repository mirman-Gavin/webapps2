import $ from "jquery";
import todoListItem from "./todoListItem";
import newTodoForm from "./newTodoForm";
var todos;


deleteTodo()

$(document).ready( () => {
    getTodos((data) => {
      todos = data;
      todos.forEach((todo) => {
        $("#root").append(
          todoListItem(todo)
        );
      });
      $("#root").append(
        newTodoForm()
      )
  });
})
