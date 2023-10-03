import { apiGet, apiPost } from "./FlysesApi";

export const applyCode = (obj) => {
  return apiPost("couponcode/CheckCouponCodeValid", obj);
};

export const createPlanOrder = (obj) => {
  return apiPost("order", obj);
};

export const CreateUserWiseModifyOrder = (obj) => {
 
  return apiPost("userWiseOrderOption", obj);
};

export const SendOrderDetailsMail = (orderId,userId) => {
  return apiGet(`user/SendOrderDetailsMail/${orderId}/${userId}`);
};