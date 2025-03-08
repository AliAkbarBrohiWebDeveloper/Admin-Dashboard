export const CustomerShema=  {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      {
        name:"Address",
        type:"string"
      },
      {
        name:"Phone",
        type:"number"
      }
    ],
  };
  
  
  
  
  