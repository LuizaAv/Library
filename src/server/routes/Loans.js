const express = require("express");
const router = express.Router();


router.get("/", (err, data) => {
    data.send({data: "Loans has loaded"})
})

router.post("/", (err, data) => {
    data.send({data: "Loans has been created"})
})

router.put("/", (err, data) => {
    data.send({data: "Loans has updated"})
})

router.delete("/", (err, data) => {
    data.send({data: "Loans has deleted"})
})

module.exports = router