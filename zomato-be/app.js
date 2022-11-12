const express = require("express");
const app = express();
const port = 8000;
app.use(express.json())
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prachiDeep@12",
  database: "zomato",
});
// //database name to be mentioned eg : database: "assignment"
const getConnection = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
};

app.get("/getdata", (req, res) => {
  con.query("SELECT * FROM Restaurants", function (err, result, fields) {
    if (err) {
      res.status(500);
    }
    // console.log(result);
    res.send({ data: result });
  });
});
app.post("/getmenu",(req, res)=>{
  const body = req.body;
  console.log(body)
  const resid = body.resid;
  console.log(resid)
  const sql = `select * from menu where resid =${resid}`;
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
    }
    // console.log(result);
    res.send({ data: result });
  });

})


app.get("/getmenu/:resid",(req,res)=>{
  console.log(req.params.resid);
  const resid= req.params.resid;
  const sql = `select * from menu where resid =${resid}`;
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
    }
    // console.log(result);
    res.send({ data: result });
  });
})


app.post("/getuser",(req, res)=>{
  const body = req.body;
  console.log("from node ")
  console.log(body)
  const email = body.email;  
  const password = body.password;
  console.log(email)

  // const sql=`select count(*) from users where email ="${email}"`;
  const sql=`select userName from users where email ="${email}" and userpassword ="${password}"`;
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
    }
    console.log(result);
    res.send({ data: result });
  });

})


app.post("/signup",(req, res)=>{
  const body = req.body;
  console.log("from node getuser")
  console.log(body)
  const email = body.email;  
  console.log(email)

  // const sql=`select count(*) from users where email ="${email}"`;
  const sql=`select * from users where email ="${email}"`;
  con.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
    }
    console.log(result.length);
    if(result.length===0)
    {
      const password = body.password; 
      const name = body.name; 

      const sql2= `insert into Users(email,userpassword,userName)
      values("${email}","${password}","${name}")`;
      con.query(sql2, function (err, result2, fields) {
        if (err) {
          res.status(500);
        }
      
      
        res.send({ data: "Data inserted" });
        // res.send({ data: result }).status(500);
      });

    }
    else
    {res.send({ data: "enter another email id" });}
    // res.send({ data: result }).status(500);
  });

})

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
