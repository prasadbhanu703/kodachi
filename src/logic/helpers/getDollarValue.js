import axios from "axios";
import { CoinGeckoApi } from "../../shared/config";

export const getDollarValue = async () => {
  try {
    const response = await axios.get(CoinGeckoApi).then((res) => {
      return res;
    });
    return response?.data["kodachi-token"]?.usd;
  } catch (error) {
    console.log("error while getting dollar value", error);
  }
};
