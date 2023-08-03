import React, { useMemo, useState } from "react";
import { FormFeedback } from "reactstrap";
import { applyCode } from "../../FlysesApi/CouponCode";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const CouponCode = (props) => {
  const { couponDiscount,setCouponDiscount, orderDetails,setIsPayPal } = props;
  const [text, setText] = useState({
    name: "",
  });
  const [invalid, setInvalid] = useState("");
  const [codeValid, setCodeValid] = useState(false);

  useMemo(() => {
    console.warn(orderDetails[0]?.pnPrice)
  }, [orderDetails]);

  const codeApplyClick = () => {
    if (text.name !== "") {
      applyCode(text)
        .then((response) => {
          if (response.isValid) {
            setCodeValid(true);
            toastSuccess("Coupon code apply successfully.");
            if (response.ccPercentage !== 0) {
              setCouponDiscount(response?.ccPercentage);
            }
          } else {
            setInvalid("Please enter valid code.");
          }
        })
        .catch(() => {
          toastError(
            "Coupon code could not be apply due to a network issue. Please contact the administrator if the issue persists."
          );
        });
    } else {
      setInvalid("Please enter code.");
    }
  };

  const handleRemoveCouponCode = () => {
    setCodeValid(false);
    setCouponDiscount(0);
    setIsPayPal(false);
    setText({name:""})
  };

  return (
    <>
      {codeValid && (
        <div className="col-md-12 border">
          <div className="d-flex py-2">
            <Link onClick={handleRemoveCouponCode}>
              <IoMdClose
                style={{
                  fontSize: "17px",
                  marginTop: "-3px",
                }}
              />{" "}
              Remove Coupon Code
            </Link>
          </div>
        </div>
      )}

      {!codeValid && (
        <div className="col-md-12 border">
          <div className="d-flex py-2">
            <span className="PaymentCardText col-4">Apply Coupon Code :</span>
            <input
              className="PaymentCardText ms-auto mb-1 form-control col-8"
              value={text.name}
              onChange={(e) => {
                setText({ name: e.target.value });
                setInvalid("");
              }}
            ></input>
          </div>
        </div>
      )}
      {invalid !== "" && !codeValid && (
        <FormFeedback style={{ display: "block", marginLeft: "-10px" }}>
          {invalid}
        </FormFeedback>
      )}

      {!codeValid && (
        <div className="col-md-12 my-3 text-center px-0">
          <button
            className="btn btn-primary rounded-0 w-100 p-2"
            onClick={codeApplyClick}
            style={{ border: "#0C0D48" }}
          >
            Apply
          </button>
        </div>
      )}

      {codeValid && (
        <div className="col-md-12 my-3 text-center px-0">
          <div
            className="container row"
            style={{
              marginTop: codeValid ? "0px" : "-18px",
              textAlign: "right",
              marginBottom: "-25px",
            }}
          >
            <label>Price : ${orderDetails[0]?.pnPrice}</label>
            <br />
            <label>Coupon Code Discount : {couponDiscount}%</label>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponCode;
