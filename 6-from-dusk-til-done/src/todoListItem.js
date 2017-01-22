import $ from "jquery";
export default function todoListitem(todo) {
  return $(document.createElement("div"))
    .append(
        $(document.createElement("h3")).text(
          `${todo.date}: ${todo.text}`
        )
    )
    .append(
      $(document.createElement("input"))
      .attr("type","checkbox")
      .attr("checked", todo.completed)
    )
    .append(
      $(document.createElement("input"))
      .attr("type","text")
      .attr("placeholder","mm/dd/yyyy")
      .attr("id","dates")
    )
    .addClass("todo");

}
