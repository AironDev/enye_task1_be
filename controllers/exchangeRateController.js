
const Rates = require("../models/Rates");
const CustomError = require("../helpers/customError");
const responseHandler = require("../helpers/responseHandler");
const axios = require('axios');


  
exports.getRate = async (req, res, next) => {
 
  const { base, currency} = req.query;

  try {
    let url = `https://api.exchangeratesapi.io/latest`

    await axios.get(url, {
      params: {
        base: base,
        symbols: currency
      }
    })
    .then((response) => {
      
      let data = response.data;
      responseHandler(
        res,
        200,
        data,
        `Rates retrieved successfully, query: ${JSON.stringify(req.query)}`
      );
    })
    .catch(next);

  } catch (err) {
    return next(new CustomError(401, `Something went wrong ${err}`));
  }
};
