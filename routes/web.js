const router = require("express").Router();

router.get("/", function(req, res){
	res.send("Hello Mars")
});

module.exports = router;
