// src/components/core/Dashboard/PurchaseHistory.jsx
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getPurchaseHistory } from "../../../services/operations/purchaseApi"

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      const res = await getPurchaseHistory(token)
      setHistory(res)
      setLoading(false)
    }
    fetchHistory()
  }, [token])

console.log("👀 PurchaseHistory component rendered")


  return (  
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Purchase History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-md flex items-center gap-4"
            >
              <img
                src={item.course.thumbnail}
                alt={item.course.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.course.title}</h2>
                <p className="text-sm text-gray-600">
                  Payment Mode: {item.paymentMode}
                </p>
                <p className="text-sm text-gray-600">
                  Payment ID: {item.paymentId}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ₹{item.price}
                </p>
                <p className="text-sm text-gray-500">
                  Purchased On: {new Date(item.purchasedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory

