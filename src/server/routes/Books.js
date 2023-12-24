const express = require("express");
const router = express.Router();


router.get("/", (err, data) => {
    data.send({data: "Books have loaded"})
})

router.post("/", (err, data) => {
    data.send({data: "Books have been created"})
})

router.put("/", (err, data) => {
    data.send({data: "Books have updated"})
})

router.delete("/", (err, data) => {
    data.send({data: "Books have deleted"})
})

module.exports = router