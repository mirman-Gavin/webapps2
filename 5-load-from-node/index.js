'use strict';

const express = require("express");
const fs = require("fs");
const port = 3001;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

function loadSingleTodo(res, id) {
  return fs.readFileSync("./todos.json", (err, raw) => {
    if (err) throw err;
    const todos = JSON.parse(raw).data;
    for (const t in todos) {
      const todo = todos[t];
      console.log(todo);
    }
  });
}



function loadTodos(callback) {
 return fs.readFile("./todos.json", (err, data) => {
   if (err) throw err;
    console.log(JSON.parse(data));
   callback(JSON.parse(data));
 });
}

app.route("/todos")
.get((req,res) => {
  loadTodos((json) => {
    res.json(json.data);
  });
})
.post((req, res) => {
  let newTodo = req.body;
  newTodo.completed=false;
  console.log(newTodo);
  loadTodos((json) => {
    json.data.push(newTodo);
    json.lastId++;
    newTodo.id=json.lastId;
    fs.writeFile("./todos.json", JSON.stringify(json), (err) => {
      if (err) throw err;
      res.status(200).end();
    });
  });
});

app.route("/todos/:id")
.get((req,res) => {
  const id = parseInt(req.params.id);
  loadTodos((json) => {
    const todos = json.data;
    for (var t in todos) {
      const todo = todos[t];
      if (todo.id === id) {
        return res.json(todo);
      }
    }
    return res.send("No todo found")
  });
})
.put((req,res) => {
  res.send(`Updating todo #${id}...`);
  loadTodos((json) => {
    let newText = req.body;
    const id = req.params.id;
    const todos = json.data;
    for (const todo of todos) {
      if (todo.id == id) {
        todo.completed = newText;
        todo.text = newText;
        fs.writeFile("./todos.json", JSON.stringify(json), (err) => {
          if (err) throw err;
          res.send(`Todo #${id} successfully updated!`);
          res.status(200).end();
      });
  }
}
});

.delete((req,res) => {
  res.send(`deleting todo #${id}...`);
  const id = req.params.id;
  loadTodos((json) => {
    var filtered = json.data.filter((todo) => {
      return todo.id != id;
    });
    json.data=filtered;
    fs.writeFile("./todos.json", JSON.stringify(json), (err) => {
      if (err) throw err;
      res.status(200).end();
      res.send(`Todo #${id} successfully deleted!`);
    });
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}!`)
});
