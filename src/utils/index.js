import axios from "axios";

const url = "http://localhost:5000/Api/v1";

export const customFetch = axios.create({
  baseURL: url,
});

export const isValidPhoneNumber = (number) => {
  if (number === "") return true;
  const regex = /^0[567]\d{8}$/;
  return regex.test(number);
};

export function mergeQueryParams(params) {
  const searchParams = new URLSearchParams(window.location.search);

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      searchParams.set(key, params[key]);
    } else {
      searchParams.delete(key);
    }
  });

  return `?${searchParams.toString()}`;
}

export const formatPrice = (price) => {
  const amount = new Intl.NumberFormat("en", {
  // const amount = new Intl.NumberFormat("ar", {
    style: "currency",
    currency: "DZD",
  }).format((price).toFixed(2));
  return amount;
};