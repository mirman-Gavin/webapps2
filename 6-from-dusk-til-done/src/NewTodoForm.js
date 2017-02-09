import $ from "jquery";
import {addTodo} from "./actions";
export default function newTodoForm() {
  return $(document.createElement("form"))
  .append(
    $(document.createElement("h2"))
    .text("Add a todo")
  )
  .append(
    $(document.createElement("input"))
    .attr("id","new-todo-text")
    .attr("type","input")
    .attr("placeholder","Get Milk")
  )
  .append(
    $(document.createElement("input"))
  .attr("type","date")
  .attr("id","new-todo-date")
  )
  .append(
    $(document.createElement("button"))
    .text("Add")
    .click((e) => {
      e.preventDefault();
      console.log("Adding a todo...");
      const newTodo = {
        text: $("#new-todo-text").val(),
        date: $("#new-todo-date").val()
      };
      addTodo([],newTodo);
    })
  );
}
