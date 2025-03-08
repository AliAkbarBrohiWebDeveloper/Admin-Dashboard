
export const OrderSchema= {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      { name: 'orderNumber', type: 'string' },
      { name: 'customer', type: 'reference', to: [{ type: 'customer' }] },
      {
        name: 'orderItems',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
      { name: 'totalPrice', type: 'number' },
      { name: 'orderStatus', type: 'string' },
    ],
  }
  
  
  