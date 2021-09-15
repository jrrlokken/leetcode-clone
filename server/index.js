const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const PythonShell = require("python-shell").PythonShell;
const port = 8080;

app.use(cors());
app.use(express.json());

app.post("/python", (req, res) => {
  fs.writeFileSync("test.py", req.body.code);

  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [1, 2, 3],
  };

  PythonShell.run("test.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    res.json({ passOrFail: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
