const express = require('express');
const transactionController = express.Router();


const transactionArray = require("../models/transactions.js");  

transactionController.get("/", (req, res) => {    
    res.send(transactionArray);    
});

// transactionController.get('/:index', (req, res) => {
//     const { index } = req.params;
    
//     if(transactionArray[index]) {
//     res.send(transactionArray[index]);
//   } else {
//     res.redirect("/404")
//   } 
//   })

transactionController.get("/:id", (req,res) => {
  const { id } = req.params;

   if (transactionArray.find(element=>   element.transactionId == id )) {
      res.send(transactionArray.find((e)=> e.transactionId == id))
   } else {
      res.redirect("/400")
   }
});


  transactionController.post('/', (req, res) => {
    const transaction = {
        transactionId: Math.floor(Math.random() * 999999),
        item_name: req.body.item_name,
        amount: req.body.amount,
        date: req.body.date,
        from: req.body.from,
        category: req.body.category,
      }

      transactionArray.push(transaction)
      res.json(transactionArray[transactionArray.length - 1]);
  })

transactionController.put('/:index', (req, res) => {
    const { index } = req.params;
    if(transactionArray[index]) {
      transactionArray[index] = req.body;
      res.status(200).json({ status: 200, message: "resource updated" });
    } else {
      res.redirect("/404")
    }
  });

// transactionController.delete("/:index", (req, res) => {
//     const { index } = req.params;
//     if(transactionArray[index]) {
//         transactionArray.splice(index, 1);
//         res.status(200).json({ status: 200, message: "resource deleted" });
//     } else {
//       res.redirect("/404")
//     }
// });
transactionController.delete('/:id', (req, res) => {
  const { id } = req.params;
  let indexArr = transactionArray.map((e,i) => {
      if (e.transactionId == id ) {
          return i
      }
      return -1
  })
  console.log(indexArr)
  if (indexArr.find(e => e != -1)) {
      transactionArray.splice(indexArr.find(e => Number(e) != -1), 1);
      res.status(200).json({ status: 200, message: "resource deleted" });
  }else{
      res.redirect("/404")
  }
});

module.exports = transactionController;
