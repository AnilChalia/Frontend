// import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { getPurchaseHistory } from "../../../services/operations/purchaseApi"

// const PurchaseHistory = () => {
//   const { token } = useSelector((state) => state.auth)
//   const [history, setHistory] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true)
//       const res = await getPurchaseHistory(token)
//       setHistory(res)
//       setLoading(false)
//     }
//     fetchHistory()
//   }, [token])

//   return (
//     <div className="p-4 w-full max-w-6xl mx-auto flex flex-col items-start text-richblack-50">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left w-full">
//         Purchase History
//       </h1>

//       {/* Loading or No Data */}
//       {loading ? (
//         <p className="text-center text-lg text-gray-300 w-full">Loading...</p>
//       ) : history.length === 0 ? (
//         <p className="text-center text-gray-300 w-full">No purchases found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//           {history.map((item) => (
//             <div
//               key={item._id}
//               className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md flex flex-col gap-4"
//             >
//               <img
//                 src={item.course?.thumbnail}
//                 alt={item.course?.title}
//                 className="w-full h-40 object-cover rounded"
//               />


//               <div>
//                 <h2 className="text-lg font-semibold">{item.course?.title}</h2>
//                 <p className="text-sm text-gray-300">Payment Mode: {item.paymentMode}</p>
//                 <p className="text-sm text-gray-300 break-words">Payment ID: {item.paymentId}</p>
//                 <p className="text-sm text-gray-300">Price: ₹{item.price}</p>
//                 <p className="text-sm text-gray-400 break-words">
//                   Purchased On: {new Date(item.purchasedAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default PurchaseHistory


import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getPurchaseHistory } from "../../../services/operations/purchaseApi"
import { FaExclamationTriangle } from "react-icons/fa";

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

  return (
    <div className="p-4 w-full max-w-6xl mx-auto flex flex-col  items-start text-richblack-50">
      <h1 className="text-3xl font-bold mb-6 text-center  sm:text-left w-full">
        Purchase History
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-300 w-full">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-300 w-full">No purchases found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md flex flex-col gap-4"
            >
  
              {item.course ? (
                <>
                  <img
                    src={item.course.thumbnail}
                    alt={item.course.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold">{item.course.title}</h2>
                </>
              ) : (
                <p className="text-yellow-400 font-semibold">Course Deleted By Instructor!</p>
              )}
              <div>
                <p className="text-sm text-richblue-50">Payment Mode: {item.paymentMode}</p>
                <p className="text-sm text-richblue-50 break-words">Payment ID: {item.paymentId}</p>
                <p className="text-sm text-richblue-50">Price: ₹{item.price}</p>
                <p className="text-sm text-richblue-50 break-words">
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
