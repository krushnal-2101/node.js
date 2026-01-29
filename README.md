

🚀 Node.js HTTP Server

A simple Node.js application that creates an HTTP server and responds with a basic message.

📌 Features

Built using Node.js core http module

Listens on port 30001

Returns a plain text response in the browser

📂 Project Structure
node-1/
│
├── index.js
├── package.json
└── README.md

🛠️ Requirements

Node.js (v14 or later recommended)

npm (comes with Node.js)

⚙️ Installation

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git


Navigate into the project directory:

cd node-1


Install dependencies (if any):

npm install

▶️ Running the Server

Start the server using:

node index.js


If successful, you’ll see:

Server is listening on port 30001

🌐 Access in Browser

Open your browser and go to:

http://localhost:30001


You should see:

Hello from node-1

📄 index.js Overview

Creates an HTTP server using http.createServer

Sends a response using res.end()

Starts listening on port 30001

📌 Future Improvements (Optional)

Add routing

Use Express.js

Add environment variables

Add logging & error handling

📜 License

This project is open-source and available under the MIT License.
