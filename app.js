const express = require("express")
const mongoose = require("mongoose")
const db = require('./config/db')
const todoModel = require('./models/todoModel')
const bodyParser = require("body-parser")
const app = express()
const port = 3000


app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const error = (error, result) => {
    console.log(error, result);
}

const getTodo = async () => {
    return await todoModel.find({});
}


app.get('/', async (req, res) => {
    const todoList = await getTodo()
        .then((response) => {
            console.log(response);
            res.render('todo', {
                todo: response
            });
        })
        .catch((err) => console.log(err));
    console.log({
        todoList
    });
})


app.post('/', async (req, res) => {
    const addTodo = todoModel({
        name: req.body.name,
        description: req.body.description
    })
    await addTodo.save(error)
    console.log(addTodo);
    res.redirect('/')
})

app.get("/detail/:_id?", async (req, res) => {
    const todoList = await getTodo();
    let task = null;
    if (req.params._id !== undefined) {
      tasks = await todoList.find((e) => e._id == req.params._id);
      res.render("details", { task });
    } else {
      res.render("detail", { tasks: todoList });
    }
  });
  app.post("/tododetails", async (req, res) => {
    await todoModel.updateOne({_id:req.body._id},{name:req.body.name, description:req.body.description},error)
    res.redirect("/");
  });




app.get("/:id?/del", async (req, res) => {
    await todoModel.deleteOne({
        _id: req.params.id
    }, error)
    res.redirect("/");
});

app.get("/:id?/done", async (req, res) => {
    await todoModel.updateOne({
        _id: req.params.id
    }, {
        status: true
    }, error)
    res.redirect("/");
});

app.get("/:id?/undone", async (req, res) => {
    await todoModel.updateOne({
        _id: req.params.id
    }, {
        status: false
    }, error)
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})