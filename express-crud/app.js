import express from "express";
import HttpError from "./middleware/HttpError.js";


const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json("hello from express")
});


let users = [
    {
        id: 1,
        task: "exercise",
        description: "you should exercise for at least 30 minutes every day",
    },
    {
        id: 2,
        task: "read",
        description: "read at least 20 pages of a book daily",
    },
]

app.get("/users", (req, res) => {
  if (users.length <= 0) {
    return res.status(200).json("no users found");
  }

  res
    .status(200)
    .json({ message: "users retrieved successfully", users });
});



// now getting data using specific id


app.get("/users/:id", (req, res)=> {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id)

    if(!user){
        return res.status(404).json("user not found")
    }
    res.status(200).json(user)
})

// adding task data


app.post("/users", (req, res) => {
    const { task, description } = req.body;

    const  newUsers ={
        id: users.length + 1,
        task,
        description,
    }
    users.push(newUsers);
    res.status(201).json({massage: "user created successfully",  newUsers})
})


// updating partial data of task list