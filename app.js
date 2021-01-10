const express = require('express');
const app = express();
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");
const CustomError = require("./helpers/customError");
const errorHandler = require("./helpers/errorhandler");

const port = 3000;

//setup app routes
app.use("/", webRoutes);
app.use("/api", apiRoutes);


// Invalid route error handler
app.use("*", (req, res, next) => {
  const error = new CustomError(
    404,
    `Oops. The route ${req.method} ${req.originalUrl} is not recognised`
  );
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});


app.listen(port, () => {
  console.log('\n server running on port 3000'); 
  console.log("\n Server started on: " + Date())
})