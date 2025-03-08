// File: app/api/orders/route.ts

import { client } from "@/sanity/lib/client";

// Define the GET method export
export async function GET() {
  try {
    // Fetch orders from Sanity
    const orders = await client.fetch(`
      *[_type == "order"]{
        _id,
        orderNumber,
        orderItems[]->{
          _id,
          title,
          image { asset->{url} }
        },
        totalPrice,
        orderStatus,
        customer->{
          _id,
          firstName,
          lastName,
          email,
          Address,
          Phone
        }
      }
    `);

    // If no orders were found
    if (!orders || orders.length === 0) {
      console.log("No orders found.");
      return new Response(JSON.stringify({ message: "No orders found" }), { status: 404 });
    }

    // Return orders as JSON response
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Return error response with status 500
    return new Response(JSON.stringify({ message: "Error fetching orders." }), { status: 500 });
  }
}
