import $ from "jquery";
import {getTodos} from "./actions";
var todos;

$(document).ready( () => {
  getTodos([]);
})
