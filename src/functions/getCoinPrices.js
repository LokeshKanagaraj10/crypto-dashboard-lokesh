import axios from "axios";

export const getCoinPrice = (id ,days, PriceType) => {
    const prices =  axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily
    `)
    .then((response) => {
      console.log("response >>>>", response);
      return response.data[PriceType]

    })
    .catch((error) => {
      console.log("Error >>>>", error);
    })
    return prices
}