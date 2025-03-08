



// "use client";

// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the type for the Order and Customer based on your schema
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string }[];
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     address: string;
//     phone: number;
//   };
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders and customer data
//   useEffect(() => {
//     client
//       .fetch(`
//         *[_type == "order"]{
//           _id,
//           orderNumber,
//           orderItems[]->{_id, title},  // Fetch the reference to products
//           totalPrice,
//           orderStatus,
//           customer->{
//             _id,
//             firstName,
//             lastName,
//             email,
//             address,
//             phone
//           }
//         }
//       `)
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("Error fetching orders:", error));
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle to view order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });
//     if (!result.isConfirmed) return;

//     try {
//       await client.delete(orderId);
//       setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//       Swal.fire("Deleted!", "Your order has been deleted.", "success");
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await client.patch(orderId).set({ orderStatus: newStatus }).commit();
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, orderStatus: newStatus } : order
//         )
//       );
//       Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//     } catch (error) {
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

//           <div className="flex justify-between items-center mb-4">
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//                 <p className="text-gray-600 mb-2">
//                   Customer: {order.customer.firstName} {order.customer.lastName}
//                 </p>
//                 <p className="text-gray-600 mb-2">Email: {order.customer.email}</p>
//                 <p className="text-gray-600 mb-2">Phone: {order.customer.phone}</p>
//                 <p className="text-gray-600 mb-2">Address: {order.customer.address}</p>
//                 <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>

//                 <button
//                   onClick={() => toggleOrderDetails(order._id)}
//                   className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                 >
//                   Toggle Details
//                 </button>

//                 {selectedOrderId === order._id && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                     {order.orderItems.map((item) => (
//                       <div key={item._ref} className="text-gray-600">
//                         <p>Product ID: {item._ref}</p>
//                         {/* You can expand this to fetch actual product data */}
//                       </div>
//                     ))}
//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => handleDelete(order._id)}
//                         className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                       >
//                         Delete Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Dispatch")}
//                         className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                       >
//                         Dispatch Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Completed")}
//                         className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                       >
//                         Complete Order
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default DashboardPage;
























































// "use client";

// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the type for the Order and Customer based on your schema
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string }[];
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     address: string;
//     phone: number;
//   };
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders and customer data
//   useEffect(() => {
//     client
//       .fetch(`
//         *[_type == "order"]{
//           _id,
//           orderNumber,
//           orderItems[]->{_id, title},  // Fetch the reference to products
//           totalPrice,
//           orderStatus,
//           customer->{
//             _id,
//             firstName,
//             lastName,
//             email,
//             address,
//             phone
//           }
//         }
//       `)
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("Error fetching orders:", error));
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle to view order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       // Ensure we're deleting the order by ID correctly.
//       const deleteResponse = await client.delete(orderId);
//       if (deleteResponse) {
//         // Only update state if the deletion is successful.
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       // Ensure status update is successful by checking the result.
//       const updateResponse = await client.patch(orderId).set({ orderStatus: newStatus }).commit();
//       if (updateResponse) {
//         // Update the state after successfully updating the order status.
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, orderStatus: newStatus } : order
//           )
//         );
//         Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

//           <div className="flex justify-between items-center mb-4">
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//                 <p className="text-gray-600 mb-2">
//                   Customer: {order.customer.firstName} {order.customer.lastName}
//                 </p>
//                 <p className="text-gray-600 mb-2">Email: {order.customer.email}</p>
//                 <p className="text-gray-600 mb-2">Phone: {order.customer.phone}</p>
//                 <p className="text-gray-600 mb-2">Address: {order.customer.address}</p>
//                 <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>

//                 <button
//                   onClick={() => toggleOrderDetails(order._id)}
//                   className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                 >
//                   Toggle Details
//                 </button>

//                 {selectedOrderId === order._id && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                     {order.orderItems.map((item) => (
//                       <div key={item._ref} className="text-gray-600">
//                         <p>Product ID: {item._ref}</p>
//                         {/* You can expand this to fetch actual product data */}
//                       </div>
//                     ))}
//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => handleDelete(order._id)}
//                         className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                       >
//                         Delete Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Dispatch")}
//                         className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                       >
//                         Dispatch Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Completed")}
//                         className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                       >
//                         Complete Order
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default DashboardPage;




































// "use client"


// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the type for the Order and Customer based on your schema
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[]; // Add image field
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     Address: string;
//     Phone: number;
//   };
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders and customer data
//   useEffect(() => {
//     client
//       .fetch(`
//         *[_type == "order"]{
//           _id,
//           orderNumber,
//           orderItems[]->{
//             _id,
//             title,
//             image { asset->{url} },  // Fetch the image URL properly
//           },
//           totalPrice,
//           orderStatus,
//           customer->{
//             _id,
//             firstName,
//             lastName,
//             email,
//             Address,
//             Phone
//           }
//         }
//       `)
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("Error fetching orders:", error));
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle to view order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       // Ensure we're deleting the order by ID correctly.
//       const deleteResponse = await client.delete(orderId);
//       if (deleteResponse) {
//         // Only update state if the deletion is successful.
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       // Ensure status update is successful by checking the result.
//       const updateResponse = await client.patch(orderId).set({ orderStatus: newStatus }).commit();
//       if (updateResponse) {
//         // Update the state after successfully updating the order status.
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, orderStatus: newStatus } : order
//           )
//         );
//         Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

//           <div className="flex justify-between items-center mb-4">
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//                 <p className="text-gray-600 mb-2">
//                   Customer: {order.customer.firstName} {order.customer.lastName}
//                 </p>
//                 <p className="text-gray-600 mb-2">Email: {order.customer.email}</p>
//                 <p className="text-gray-600 mb-2">Phone: {order.customer.Phone}</p>
//                 <p className="text-gray-600 mb-2">Address: {order.customer.Address}</p>
//                 <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
//                 <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>

//                 <button
//                   onClick={() => toggleOrderDetails(order._id)}
//                   className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                 >
//                   Toggle Details
//                 </button>

//                 {selectedOrderId === order._id && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                     {order.orderItems.map((item) => {
//                       console.log("Order Item Image:", item.image); // Log image data to inspect it
//                       return (
//                         <div key={item._ref} className="flex items-center space-x-4 text-gray-600">
//                           {item.image?.asset?.url ? (
//                             <img
//                               src={item.image.asset.url}
//                               alt={item.title}
//                               className="w-16 h-16 object-cover rounded-md"
//                             />
//                           ) : (
//                             <span className="text-gray-400">No image available</span>
//                           )}
//                           <div>
//                             <p>{item.title}</p>
//                           </div>
//                         </div>
//                       );
//                     })}

//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => handleDelete(order._id)}
//                         className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                       >
//                         Delete Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Dispatch")}
//                         className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                       >
//                         Dispatch Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Completed")}
//                         className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                       >
//                         Complete Order
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default DashboardPage;





















































































// "use client"

// import ProtectedRoute from "@/app/components/protected/page";
// import { client } from "@/sanity/lib/client";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the type for the Order and Customer based on your schema
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[]; // Add image field
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     Address: string;
//     Phone: number;
//   };
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders and customer data
//   useEffect(() => {
//     client
//       .fetch(`
//         *[_type == "order"]{
//           _id,
//           orderNumber,
//           orderItems[]->{
//             _id,
//             title,
//             image { asset->{url} },  // Fetch the image URL properly
//           },
//           totalPrice,
//           orderStatus,
//           customer->{
//             _id,
//             firstName,
//             lastName,
//             email,
//             Address,
//             Phone
//           }
//         }
//       `)
//       .then((data) => setOrders(data))
//       .catch((error) => console.log("Error fetching orders:", error));
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle to view order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const deleteResponse = await client.delete(orderId);
//       if (deleteResponse) {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       const updateResponse = await client.patch(orderId).set({ orderStatus: newStatus }).commit();
//       if (updateResponse) {
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, orderStatus: newStatus } : order
//           )
//         );
//         Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Navbar Section */}
//           <div className="bg-indigo-600 text-white py-4 px-6 rounded-md shadow-lg flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//             {/* Filter Section (dropdown) */}
//             <div className="flex items-center space-x-4">
//               <select
//                 onChange={(e) => setFilter(e.target.value)}
//                 value={filter}
//                 className="bg-white text-gray-800 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//               >
//                 <option value="All">All Orders</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Dispatch">Dispatched</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//           </div>

//           {/* Orders Section */}
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//                 <p className="text-gray-600 mb-2">
//                   Customer: {order.customer.firstName} {order.customer.lastName}
//                 </p>
//                 <p className="text-gray-600 mb-2">Email: {order.customer.email}</p>
//                 <p className="text-gray-600 mb-2">Phone: {order.customer.Phone}</p>
//                 <p className="text-gray-600 mb-2">Address: {order.customer.Address}</p>
//                 <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
//                 <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>

//                 <button
//                   onClick={() => toggleOrderDetails(order._id)}
//                   className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                 >
//                   Toggle Details
//                 </button>

//                 {selectedOrderId === order._id && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                     {order.orderItems.map((item) => {
//                       return (
//                         <div key={item._ref} className="flex items-center space-x-4 text-gray-600">
//                           {item.image?.asset?.url ? (
//                             <img
//                               src={item.image.asset.url}
//                               alt={item.title}
//                               className="w-16 h-16 object-cover rounded-md"
//                             />
//                           ) : (
//                             <span className="text-gray-400">No image available</span>
//                           )}
//                           <div>
//                             <p>{item.title}</p>
//                           </div>
//                         </div>
//                       );
//                     })}

//                     <div className="flex gap-2 mt-4">
//                       <button
//                         onClick={() => handleDelete(order._id)}
//                         className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                       >
//                         Delete Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Dispatch")}
//                         className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                       >
//                         Dispatch Order
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(order._id, "Completed")}
//                         className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                       >
//                         Complete Order
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default DashboardPage;




































// // pages/admin/dashboard.tsx
// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import ProtectedRoute from "@/app/components/protected/page";

// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[];
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     Address: string;
//     Phone: number;
//   } | null;
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("/api/orders");
//         const data = await response.json();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-indigo-600 text-white py-4 px-6 rounded-md shadow-lg flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="bg-white text-gray-800 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatched">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredOrders.map((order) => (
//               <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//                 <p className="text-gray-600 mb-2">
//                   Customer: {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "Unknown"}
//                 </p>
//                 <p className="text-gray-600 mb-2">Email: {order.customer?.email || "No email available"}</p>
//                 <p className="text-gray-600 mb-2">Phone: {order.customer?.Phone || "No phone number available"}</p>
//                 <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
//                 <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>
//                 <button onClick={() => toggleOrderDetails(order._id)} className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md">
//                   Toggle Details
//                 </button>

//                 {selectedOrderId === order._id && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                     {order.orderItems.map((item) => (
//                       <div key={item._ref} className="flex items-center space-x-4 text-gray-600">
//                         {item.image?.asset?.url ? (
//                           <img
//                             src={item.image.asset.url}
//                             alt={item.title}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No image available</span>
//                         )}
//                         <div>
//                           <p>{item.title}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default DashboardPage;
















































































































































































// "use client"

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the Order and Customer interfaces
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[];
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     Address: string;
//     Phone: number;
//   } | null; // Make customer nullable
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders from the API
//   useEffect(() => {
//     fetch("/api/orders")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message === "No orders found") {
//           Swal.fire("No Orders", "There are no orders to display.", "info");
//         } else {
//           setOrders(data);
//         }
//       })
//       .catch((error) => {
//         console.log("Error fetching orders:", error);
//         Swal.fire("Error", "Something went wrong while fetching orders.", "error");
//       });
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const deleteResponse = await fetch(`/api/orders/${orderId}`, {
//         method: "DELETE",
//       });

//       if (deleteResponse.ok) {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ newStatus }),
//       });

//       if (response.ok) {
//         const updatedOrder = await response.json();
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, orderStatus: newStatus } : order
//           )
//         );
//         Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Navbar Section */}
//         <div className="bg-indigo-600 text-white py-4 px-6 rounded-md shadow-lg flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//           {/* Filter Section (dropdown) */}
//           <div className="flex items-center space-x-4">
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="bg-white text-gray-800 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Orders Section */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredOrders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//               {/* Safe checks for customer data */}
//               <p className="text-gray-600 mb-2">
//                 Customer: {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Email: {order.customer ? order.customer.email : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Phone: {order.customer ? order.customer.Phone : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Address: {order.customer ? order.customer.Address : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
//               <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>

//               <button
//                 onClick={() => toggleOrderDetails(order._id)}
//                 className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Toggle Details
//               </button>

//               {selectedOrderId === order._id && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                   {order.orderItems.map((item) => {
//                     return (
//                       <div key={item._ref} className="flex items-center space-x-4 text-gray-600">
//                         {item.image?.asset?.url ? (
//                           <img
//                             src={item.image.asset.url}
//                             alt={item.title}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No image available</span>
//                         )}
//                         <div>
//                           <p>{item.title}</p>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => handleDelete(order._id)}
//                       className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                     >
//                       Delete Order
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(order._id, "Dispatch")}
//                       className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                     >
//                       Dispatch Order
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(order._id, "Completed")}
//                       className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                     >
//                       Complete Order
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;













































































// "use client"

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// // Define the Order and Customer interfaces
// interface Order {
//   _id: string;
//   orderNumber: string;
//   orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[]; 
//   totalPrice: number;
//   orderStatus: string;
//   customer: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     Address: string;
//     Phone: number;
//   } | null; // Make customer nullable
// }

// function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
//   const [filter, setFilter] = useState("All");

//   // Fetch orders from the API
//   const fetchOrders = () => {
//     fetch("/api/orders")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message === "No orders found") {
//           Swal.fire("No Orders", "There are no orders to display.", "info");
//         } else {
//           setOrders(data);  // Update the orders state with the latest data
//         }
//       })
//       .catch((error) => {
//         console.log("Error fetching orders:", error);
//         Swal.fire("Error", "Something went wrong while fetching orders.", "error");
//       });
//   };

//   useEffect(() => {
//     // Initial fetch of orders
//     fetchOrders();

//     // Polling for new orders every 5 seconds
//     const interval = setInterval(() => {
//       fetchOrders();
//     }, 5000); // Fetch orders every 5 seconds

//     // Cleanup the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   // Filter orders by status (All, Pending, Dispatched, etc.)
//   const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

//   // Toggle order details
//   const toggleOrderDetails = (orderId: string) => {
//     setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const deleteResponse = await fetch(`/api/orders/${orderId}`, {
//         method: "DELETE",
//       });

//       if (deleteResponse.ok) {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Something went wrong while deleting the order.", "error");
//     }
//   };

//   // Update order status
//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ newStatus }),
//       });

//       if (response.ok) {
//         // const updatedOrder = await response.json();
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, orderStatus: newStatus } : order
//           )
//         );
//         Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       Swal.fire("Error", "Failed to update the order status.", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Navbar Section */}
//         <div className="bg-indigo-600 text-white py-4 px-6 rounded-md shadow-lg flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//           {/* Filter Section (dropdown) */}
//           <div className="flex items-center space-x-4">
//             <select
//               onChange={(e) => setFilter(e.target.value)}
//               value={filter}
//               className="bg-white text-gray-800 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="Dispatch">Dispatched</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Orders Section */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredOrders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
//               {/* Safe checks for customer data */}
//               <p className="text-gray-600 mb-2">
//                 Customer: {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Email: {order.customer ? order.customer.email : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Phone: {order.customer ? order.customer.Phone : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Address: {order.customer ? order.customer.Address : "N/A"}
//               </p>
//               <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
//               <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>

//               <button
//                 onClick={() => toggleOrderDetails(order._id)}
//                 className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Toggle Details
//               </button>

//               {selectedOrderId === order._id && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold text-gray-700">Order Items:</h4>
//                   {order.orderItems.map((item) => {
//                     return (
//                       <div key={item._ref} className="flex items-center space-x-4 text-gray-600">
//                         {item.image?.asset?.url ? (
//                           <Image
//                             src={item.image.asset.url}
//                             alt={item.title}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No image available</span>
//                         )}
//                         <div>
//                           <p>{item.title}</p>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => handleDelete(order._id)}
//                       className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                     >
//                       Delete Order
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(order._id, "Dispatch")}
//                       className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                     >
//                       Dispatch Order
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(order._id, "Completed")}
//                       className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                     >
//                       Complete Order
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

































"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Define the Order and Customer interfaces
interface Order {
  _id: string;
  orderNumber: string;
  orderItems: { _ref: string; title: string; image?: { asset: { url: string } } }[]; 
  totalPrice: number;
  orderStatus: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    Address: string;
    Phone: number;
  } | null; // Make customer nullable
}

function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderID] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  // Fetch orders from the API
  const fetchOrders = () => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "No orders found") {
          Swal.fire("No Orders", "There are no orders to display.", "info");
        } else {
          setOrders(data);  // Update the orders state with the latest data
        }
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
        Swal.fire("Error", "Something went wrong while fetching orders.", "error");
      });
  };

  useEffect(() => {
    // Initial fetch of orders
    fetchOrders();

    // Polling for new orders every 5 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // Fetch orders every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Filter orders by status (All, Pending, Dispatched, etc.)
  const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);

  // Toggle order details
  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderID((prev) => (prev === orderId ? null : orderId));
  };

  // Delete order
  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const deleteResponse = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Something went wrong while deleting the order.", "error");
    }
  };

  // Update order status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        Swal.fire("Status Updated", `The order status has been changed to ${newStatus}.`, "success");
      }
    } catch (error) {
      console.error("Status update error:", error);
      Swal.fire("Error", "Failed to update the order status.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Navbar Section */}
        <div className="bg-indigo-600 text-white py-4 px-6 rounded-md shadow-lg flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          {/* Filter Section (dropdown) */}
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="bg-white text-gray-800 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Dispatch">Dispatched</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Orders Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Number: {order.orderNumber}</h3>
              {/* Safe checks for customer data */}
              <p className="text-gray-600 mb-2">
                Customer: {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                Email: {order.customer ? order.customer.email : "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                Phone: {order.customer ? order.customer.Phone : "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                Address: {order.customer ? order.customer.Address : "N/A"}
              </p>
              <p className="text-gray-600 mb-2">Status: {order.orderStatus}</p>
              <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice}</p>

              <button
                onClick={() => toggleOrderDetails(order._id)}
                className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Toggle Details
              </button>

              {selectedOrderId === order._id && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700">Order Items:</h4>
                  {order.orderItems.map((item) => (
                    <div
                      key={order._id + item._ref} // Use order._id + item._ref to ensure uniqueness
                      className="flex items-center space-x-4 text-gray-600"
                    >
                      {item.image?.asset?.url ? (
                        <Image
                          src={item.image.asset.url}
                          alt={item.title}
                          height={300}
                          width={300}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No image available</span>
                      )}
                      <div>
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                    >
                      Delete Order
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, "Dispatch")}
                      className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                      Dispatch Order
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, "Completed")}
                      className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
