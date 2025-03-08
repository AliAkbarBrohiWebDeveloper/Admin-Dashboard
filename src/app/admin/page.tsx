// "use client"

// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if the entered email is the admin email
//     if (email === 'aliakberbrohi455@gmail.com' && password) {
//       // Redirect to the admin dashboard if the email is correct
//       router.push('/admin-dashboard');  // Replace with your actual admin dashboard path
//     } else {
//       alert('Invalid email or password');
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default AdminLogin;





























"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the entered email is the admin email
    if (email === "aliakberbrohi455@gmail.com" && password =="brohi0300") {
      // Redirect to the admin dashboard if the email is correct
      router.push("/Adminlogin"); // You can set up your login route here
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;




















































// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const AdminDashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const router = useRouter();

//   const handleLogout = () => {
//     // Log out and redirect to the login page
//     router.push("/Adminlogin"); // You can set up your login route here
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`bg-blue-900 text-white w-64 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="p-4">
//           <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//         </div>
//         <div className="mt-6 space-y-4">
//           <a href="/admin-dashboard" className="block px-4 py-2 hover:bg-blue-700 rounded">
//             Dashboard
//           </a>
//           <a href="/admin-orders" className="block px-4 py-2 hover:bg-blue-700 rounded">
//             Orders
//           </a>
//           <a href="/admin-customers" className="block px-4 py-2 hover:bg-blue-700 rounded">
//             Customers
//           </a>
//           <a href="/admin-products" className="block px-4 py-2 hover:bg-blue-700 rounded">
//             Products
//           </a>
//         </div>
//         <div className="mt-10 px-4">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
//           <button
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//             className="lg:hidden text-gray-800"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Stats or any other content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Total Orders</h2>
//             <p className="text-3xl font-bold text-gray-800">250</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Total Customers</h2>
//             <p className="text-3xl font-bold text-gray-800">500</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Total Revenue</h2>
//             <p className="text-3xl font-bold text-gray-800">$10,000</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




