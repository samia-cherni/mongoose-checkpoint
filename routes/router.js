 const express=require('express');
 const router=express.Router();
 const Person = require("../models/Person");
//Add a Person
router.post("/add-person", (req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age,
        favouriteFoods: req.body.favouriteFoods,
    });
    person
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
//Add many people
  router.post("/add-people", (req, res) => {
    Person.create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
//Find by name
  router.get("/:name", (req, res) => {
    Person.find({ name: req.params.name})
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
//Find by food
  router.get("/food/:food", (req, res) => {
    console.log(req.params.food);
    Person.findOne({ favoriteFoods: req.params.food })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 //Find by id
  router.get("/:id", (req, res) => {
    Person.findById(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 //Edit then save
  router.post("/id/:id", (req, res) => {
    const foodToAdd = "hamburger";
    Person.findById({_id:req.params.id}, (err, person) => {
      if (err) return console.log(err);
      person.favoriteFoods.push(foodToAdd);
      person
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
  //find and update
  router.put("/:name", (req, res) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({ name: req.params.name }, { age: ageToSet }, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //Find by id and remove
  router.delete("/:id", (req, res) => {
    Person.findByIdAndRemove({_id:req.params.id})
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //delete many
  router.delete("/many/:name", (req, res) => {
    Person.remove({ name: req.params.name })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 //Chain Search
  router.get("/chain/:food", (req, res) => {
    Person.find({ favoriteFoods: req.params.food })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  module.exports=router;