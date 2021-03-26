var express = require('express');
var router = express.Router();

const fs = require("fs");

router.use(express.json())

/* GET users listing. */
router.get('/', function(req, res, next) {

    fs.readFile("users.json", function(err, data){
      if (err) {
        console.log(err);
      }

      const users = JSON.parse(data)

      res.send("Alla users")
      return;
    });
});

router.post('/add', function(req, res, next) {

  
  console.log(req.body);

  fs.readFile("users.json", function(err, data){
    if (err) {
      console.log(err);

      if (err.code == "ENOENT") {
        console.log("Filen finns inte!");

        let users = [{"userName": "Herbert", "userEmail": "herbert@mail.com"}];

        fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
          if (err) {
            console.log(err);
          }
        })

        res.send("Fil skapad och ny användare sparad")
        return;

      }

      res.send("404 - Nått gick fel!")
    }

    const users = JSON.parse(data);

    let newUser = {"userName": req.body.userName, "userEmail": req.body.userEmail};

    users.push(newUser);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
      if (err) {
        console.log(err);
      }
    })

    res.send("ok");
    
  });
});

module.exports = router;
