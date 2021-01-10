
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
    .catch(err => {
      // console.log(err)
      let errorData = {
        statusCode: err.response.status,
        statusText: err.response.statusText
      }
      return next(new CustomError(400, `${err.response.data.error}`, errorData) );
    });

  } catch (err) {
    // console.log(err)
    return next(new CustomError(500, `Something went wrong ${err}`));
  }
};
