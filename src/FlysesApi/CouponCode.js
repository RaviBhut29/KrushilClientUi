import { apiPost } from "./FlysesApi";

export const applyCode = (obj) => {
  return apiPost("couponcode/ExistsCouponCode", obj);
};

export const createPlanOrder = (obj) => {
  return apiPost("order", obj);
};
