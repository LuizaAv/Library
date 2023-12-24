const express = require("express");
const router = express.Router();


router.get("/", (err, data) => {
    data.send({data: "Users have loaded"})
})

router.post("/", (err, data) => {
    data.send({data: "Users have been created"})
})

router.put("/", (err, data) => {
    data.send({data: "Users have updated"})
})

router.delete("/", (err, data) => {
    data.send({data: "Users have deleted"})
})

module.exports = router