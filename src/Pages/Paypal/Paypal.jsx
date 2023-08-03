import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { createPlanOrder } from "../../FlysesApi/CouponCode";
import { useNavigate } from "react-router-dom";

const PayPal = (props) => {
  const { paymentDetails, setOpen } = props;
  const history = useNavigate();
  let path = window.location.pathname;
  let splitdata = path.split("/");

  const CLIENT_ID =
    process.env.CLIENT_ID ||
    "AayhGXAwG4lyn5v0HqpaXBOQsIfEFeUzv_lx_MzfdNjxVqYqKtkqvx7BquYAsE5P3IBpNx4xf3F2tDW-";
  const [orderID, setOrderID] = useState(false);
  const [success, setSuccess] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    if (
      paymentDetails?.price !== null &&
      paymentDetails?.price !== undefined &&
      paymentDetails?.price !== ""
    ) {
      return actions.order
        .create({
          purchase_units: [
            {
              description: paymentDetails?.planName,
              amount: {
                currency_code: "USD",
                value: paymentDetails?.price,
              },
            },
          ],
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    }
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    toastError("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      console.warn(paymentDetails);
      toastSuccess("Payment successful!!");
      const userId = sessionStorage.getItem("userId");
      const obj = {
        orPlanId: paymentDetails?.planId,
        orUserId: userId,
        orNumber: orderID,
      };
      createPlanOrder(obj)
        .then((response) => {
          history(`/requirement/${splitdata[splitdata.length - 1]}`);
        })
        .catch(() => {
          toastError("Bad response from server");
        });
      setOpen(false);
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPal;
