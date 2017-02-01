import $ from "jquery";
import todoListItem from "./todoListItem";
import newTodoForm from "./newTodoForm";



export default function reducer(state, action) {
  switch(action.type) {
    case "RETRIVE_TODOS":
    return $.ajax(
      "/todos",
      {
        type: "GET"
      }
    )
    .done((data) => {
      console.log("Success!");
      updateTodos(data);
      return data;
    })
    .fail(() => {
      console.error("Something bad happened");
    });
    return state;
    case "DELETE_TODO":
    return $.ajax({
      type: "DELETE",
      url: `/todos/${action.id}`,
      contentType: "application/json",
    })
    .done((res) => {
      updateTodos(res);
      return res;
    })
    case "ADD_TODO":
    return $.ajax({
      url: "/todos"
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(action.updatedTodo)
    })
    .done((res) => {
      updateTodos(res);
      return res;
    });
    case "UPDATE_TODO":
    return $.ajax({
      url: `/todos/${action.id}`,
      type: "PUT",
      contentType: "application/json",
      data JSON.stringify(action.editedTodo)
    })
    .done((res) => {
      updateTodos(res);
      return res;
    });
    default:
    return state;
  }
}
