import {
  Router_Contract,
  TransLinkUrl,
  WETH_Address,
} from "../../shared/config";
import { convertToWei } from "../../shared/helpers/helper";
import RouterAbi from "../contracts/abis/routerAbi.json";
import {
  setTransactionFailed,
  setTransactionHash,
  setTransactionPending,
  setTransactionStatus,
  setTransactionSuccess,
} from "../redux/slices/userWallet";

export const swapContracts = async (
  account,
  tokenOneAmount,
  tokenTwoAmount,
  tokenOne,
  tokenTwo,
  library,
  enteredIn,
  minReceive,
  maxSold,
  DEADLINE,
  dispatch
) => {
  try {
    dispatch(setTransactionStatus("Swap"));
    dispatch(setTransactionPending(true));
    dispatch(setTransactionSuccess(false));
    dispatch(setTransactionFailed(false));

    const path = [tokenOne, tokenTwo];

    const amountInEth = tokenOneAmount;
    const amountOutEth = tokenTwoAmount;
    const to = account;

    const amountInWei = convertToWei(amountInEth, 18);
    let amountOutWei = convertToWei(amountOutEth, 18);

    console.log("amounts", amountInWei, amountOutWei)

    const contractInstance = new library.eth.Contract(
      RouterAbi,
      Router_Contract
    );
    if (tokenOne === WETH_Address) {
      /*
       * Swaps an exact amount of ETH for as many output tokens as possible, along the route determined by the path.
       * amountIn = The amount of ETH to send.
       * amountOut = The minimum amount of output tokens that must be received for the transaction not to revert.(i.e minReceive)
       */
      if (enteredIn === "token1") {
        const gasLimit = await contractInstance.methods
          .swapExactETHForTokens(
            convertToWei(minReceive, 18),
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
            value: convertToWei(amountInEth, 18),
          });

        if (gasLimit) {
          await contractInstance.methods
            .swapExactETHForTokens(
              convertToWei(minReceive, 18),
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              value: convertToWei(amountInEth, 18),
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      } else {
        const gasLimit = await contractInstance.methods
          .swapETHForExactTokens(
            amountOutWei,
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
            value: convertToWei(maxSold, 18),
          });
        if (gasLimit) {
          await contractInstance.methods
            .swapETHForExactTokens(
              amountOutWei,
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              value: convertToWei(maxSold, 18),
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      }
    } else if (tokenTwo === WETH_Address) {
      /*
       * Swaps an exact amount of ETH for as many output tokens as possible, along the route determined by the path.
       * amountIn = The amount of ETH to send.
       * amountOut = The minimum amount of output tokens that must be received for the transaction not to revert.(i.e minReceive)
       */
      if (enteredIn === "token1") {
        const gasLimit = await contractInstance.methods
          .swapExactTokensForETH(
            amountInWei,
            convertToWei(minReceive, 18),
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
          });
        if (gasLimit) {
          await contractInstance.methods
            .swapExactTokensForETH(
              amountInWei,
              convertToWei(minReceive, 18),
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      } else {
        const gasLimit = await contractInstance.methods
          .swapTokensForExactETH(
            amountOutWei,
            convertToWei(maxSold, 18),
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
          });
        if (gasLimit) {
          await contractInstance.methods
            .swapTokensForExactETH(
              amountOutWei,
              convertToWei(maxSold, 18),
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      }
    } else {
      /*
       * Swaps an exact amount of input tokens for as many output tokens as possible, along the route determined by the path.
       * amountIn = The amount of input tokens to send.
       * amountOut = The minimum amount of output tokens that must be received for the transaction not to revert.(i.e minReceive)
       */
      if (Number(maxSold) > 0) {
        const gasLimit = await contractInstance.methods
          .swapTokensForExactTokens(
            amountOutWei,
            convertToWei(maxSold, 18),
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
          });
        if (gasLimit) {
          await contractInstance.methods
            .swapTokensForExactTokens(
              amountOutWei,
              convertToWei(maxSold, 18),
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      } else {
        console.log("addresses new new");
        console.log(
          "addresses new new",
          amountInWei,
          // gasLimit,
          convertToWei(minReceive, 18),
          path,
          to
        );
        const gasLimit = await contractInstance.methods
          .swapExactTokensForTokens(
            amountInWei,
            // amountOutWei,
            convertToWei(minReceive, 18),
            path,
            to,
            Math.floor(Date.now() / 1000) + DEADLINE
          )
          .estimateGas({
            from: to,
          });
        console.log("addresses new new gasLimit", gasLimit);
        if (gasLimit) {
          console.log(
            "addresses new new",
            amountInWei,
            gasLimit,
            convertToWei(minReceive, 18),
            path,
            to
          );
          await contractInstance.methods
            .swapExactTokensForTokens(
              amountInWei,
              // amountOutWei,
              convertToWei(minReceive, 18),
              path,
              to,
              Math.floor(Date.now() / 1000) + DEADLINE
            )
            .send({
              from: to,
              gas: gasLimit + 1000,
            })
            .once("transactionHash", function (res) {
              if (res && typeof res !== "undefined") {
                const transLink = `${TransLinkUrl}${res}`;
                dispatch(setTransactionHash(transLink));
              }
            })
            .once("confirmation", function (confNumber, receipt) {
              if (receipt && typeof receipt !== "undefined") {
                console.log("receipt", receipt);
                dispatch(setTransactionPending(false));
                dispatch(setTransactionSuccess(true));
                dispatch(setTransactionFailed(false));
              }
            })
            .on("error", function (error) {
              dispatch(setTransactionPending(false));
              dispatch(setTransactionSuccess(false));
              dispatch(setTransactionFailed(true));
            });
        }
      }
    }
  } catch (error) {
    dispatch(setTransactionPending(false));
    dispatch(setTransactionSuccess(false));
    dispatch(setTransactionFailed(true));
    console.log("error while Swapping", error);
  }
};
