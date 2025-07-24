const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require("path");
const methodOverride = require("method-override");
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'nauman7869'
});

// // 100 random users logic \
// let q = "insert into user (id , username,email,password) values ?";
// let user = [["123b", "123_newuserb", "abcb@gmail.com", "abcb"], ["123c", "123_newuserc", "abcc@gmail.com", "abcc"]];

// let getUserData = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// }
// let data=[];
// for(let i=1;i<=100;i++){
//   data.push(getUserData());
// }


// main route
app.get("/", (req, res) => {
  let q = "select count(*) from user";
  try {
    connection.query(q, (err, result) => {
      if (err) {
        console.log("error: ", err);
      } else {
        count = result[0]["count(*)"];
        res.render("home.ejs", { count });
      }
    })
  } catch (err) {
    console.log(err);
    res.send("Something error occured");
  }
  // res.send("get request is working")
})

// user route 
app.get("/user", (req, res) => {
  let q = "select * from user ORDER BY username ASC;";
  try {
    connection.query(q, (err, result) => {
      if (err) {
        console.log("error: ", err);
      } else {
        // console.log(result);
        res.render("users.ejs", { result });
      }
    })
  } catch (err) {
    console.log(err);
    res.send("Something went wrong!!");
  }
})

app.listen("8080", () => {
  console.log("Listening to port 8080");
})

//edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    })
  } catch (err) {
    res.send("Something went wrong!!!");
  }
})
// edit patch route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: NewUsername, password: formPass } = req.body;
  // console.log({NewUsername,password},{id});
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result[0]);
      user = result[0];
      if (user.password != formPass) {
        res.send("Password incorrect");
      } else {
        let q2 = `update user set username = '${NewUsername}' where id = '${id}' `;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        })
      }
    })
  } catch (err) {
    console.log("Error :", err);
    res.send("Something went wrong!");
  }

  // res.send("Patch working");
})

// new route
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
})
app.post("/user/new", (req, res) => {
  let { NewUsername, NewEmail, NewPass } = req.body;
  console.log({ NewUsername, NewEmail, NewPass });
  let id = faker.string.uuid();
  console.log(id);
  let newUser = [id, NewUsername, NewEmail, NewPass];
  console.log(newUser);
  let q = `INSERT INTO user (id,username,email,password) VALUES (?)`;
  try {
    connection.query(q, [newUser], (err, result) => {
      if (err) {
        console.log("Error:", err);
        return res.send("Something went wrong!");
      }
      console.log(result);
      res.redirect("/user");
    })
  } catch (err) {
    console.log("Error :", err);
    res.send("Something went wrong!");
  }
  // res.send("new route working");
})

// delete route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}' `;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        console.log("errorC :", err);
        res.send("Something went wrong!");
      } else {
        user = result[0];
        // console.log(user);
        res.render("delete.ejs", { user });
      }
    })
  } catch (err) {
    console.log("Error:", err);
    res.send("Something went wrong!");
  }
})
app.delete("/user/:id/", (req, res) => {
  // res.send("Delte working");
  let { id } = req.params;
  let { password } = req.body;
  try {
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      let post = result[0];
      if (post.password != password) {
        res.send("Wrong password!!");
      } else {
        // res.send("Delete success");
        let q2 = `DELETE FROM user where id = '${id}' `;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {

            console.log("Result: ",result);
            res.redirect("/user");
          }
        })
      }
    })
  } catch (err) {
    console.log("Error :", err);
    res.send("Something went wrong!");
  }

})



// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) {
//       console.log("error:", err)
//     } else {
//       console.log(result);
//     }
//   })
// } catch (err) {
//   console.log("Error");
// }
// connection.end();
