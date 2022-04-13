var express = require("express");
var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var app = express();
const { Client } = require("cassandra-driver");
const req = require("express/lib/request");
var crypto = require("crypto");

const saltRounds = 10;

const cors = require('cors');
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.post("/register", (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, (err, encStr) => {
    client.execute("INSERT INTO vkey.auth (email, name, password) VALUES ('" + req.body.email + "','" + req.body.name + "','" + encStr + "')").then((resData) => {
      //  console.log(resData);
      res.send({ statusCode: 200 })

    });

  });
});



app.post("/login", (req, res) => {
  client.execute("SELECT email,name,password FROM vkey.auth WHERE email='" + req.body.email + "' ALLOW FILTERING").then((d) => {
    bcrypt.compare(req.body.password, d.rows[0].password, (err, flag) => {
      if (flag) {
        res.send({ statusCode: 200 })

      } else {
        res.send({ statusCode: 404 })

      }
    });
  });
});

app.post("/addData", (req, res) => {
  var uu = crypto.randomUUID();

  client.execute("INSERT INTO vkey.alldata (id, title, description,isDonate,lat,long,image) VALUES ( ? , ? , ? , ? , ? , ? , ?)", [uu, req.body.title, req.body.description, req.body.isDonate, Object.values(req.body.loc)[0], Object.values(req.body.loc)[1], req.body.file], { prepare: true }).then((resData) => {
    // console.log(resData);
    res.send({ statusCode: 200 })
  });





})


app.post("/getData", (req, res) => {

  client.execute("SELECT * FROM vkey.alldata ALLOW FILTERING").then((resData) => {
    res.send({ statusCode: 200, data: resData });
  });

});






const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-vibhaga.zip",
  },
  credentials: {
    username: "",
    password: "",
  },
});

client.connect((err) => {
  console.log("Astra connected ", err);
});




app.listen(3000, () => {
  console.log("Init")
});

