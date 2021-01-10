
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

      let data = response.data
      
      let results = {
        base: data.base,
        date: data.date,
        rates: data.rates
      }
      responseHandler(
        res,
        200,
        results,
        `Rates retrieved successfully`
      );
    })
    .catch(next);

  } catch (err) {
    return next(new CustomError(401, `Something went wrong ${err}`));
  }
};
