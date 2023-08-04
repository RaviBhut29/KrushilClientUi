import { apiPost } from "./FlysesApi";

export const applyCode = (obj) => {
  return apiPost("couponcode/ExistsCouponCode", obj);
};

export const createPlanOrder = (obj) => {
  return apiPost("order", obj);
};

export const CreateUserWiseModifyOrder = (obj) => {
  console.clear()
  console.warn(obj)
  return apiPost("userWiseOrderOption", obj);
};