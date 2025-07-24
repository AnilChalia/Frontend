import { apiConnector } from "../apiconnector"
import { purchaseEndpoints } from "../apis"

const { SAVE_PURCHASE_API, PURCHASE_HISTORY_API } = purchaseEndpoints
console.log("save history url is ->",SAVE_PURCHASE_API);

export const savePurchaseDetails = async (data, token) => {
  let result = null
  try {
    const response = await apiConnector("POST", SAVE_PURCHASE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (response?.data?.success) {
      result = response.data
    }
  } catch (error) {
    console.error("SAVE_PURCHASE_DETAILS API ERROR:", error)
  }
  return result
}


export const getPurchaseHistory = async (token) => {
  let result = []
  try {
    const response = await apiConnector("GET", PURCHASE_HISTORY_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (response?.data?.success) {
      result = response.data.data
    }
  } catch (error) {
    console.error("GET_PURCHASE_HISTORY API ERROR:", error)
  }
  return result
}
