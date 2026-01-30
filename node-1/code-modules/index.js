import fs from "fs";

fs.writeFileSync("new.text", "new file created module")

const data  = fs.readFileSync("new.txt", "utf-8")

console.log("data", data)