import express from "express";

const app = express();


app.get("/", (req, res)=> [
    res.json("hello express server")
])

app.get("/about", (req, res) => {
    res.json("about page")
} )

const port = 5000;  


app.listen(port, (err)=> {
    if(err){
        console.log(err)

    }
    console.log("server running port ", port)
})