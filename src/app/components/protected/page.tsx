// "use client"

// import { useRouter } from 'next/navigation'
// import React, { useEffect } from 'react'

// function ProtectedRoute({children}:{children:React.ReactNode}) {
// const router=useRouter();


// useEffect(()=>{
//     const isLogedIn=localStorage.getItem("isLogedIn")
//     if (!isLogedIn){
//         router.push('/Adminlogin')
//     }

// },[router])
//   return (
//     <div>{children}</div>
//   )
// }

// export default ProtectedRoute
































"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// If you have a complex PageProps type, ensure it allows children
interface PageProps {
  children?: React.ReactNode;
  // other props...
}

const ProtectedRoute = ({ children }: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/Adminlogin');
    }
  }, [router]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
