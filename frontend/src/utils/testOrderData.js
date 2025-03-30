//for testing only, replace with api (idk how, i'm new to React)

// Generate some placeholder User IDs
const userIds = {
    johnDoe:      "60c72b1f9b1d4b3a4c8e4f5a",
    janeSmith:    "60c72b1f9b1d4b3a4c8e4f5b",
    aliceJohnson: "60c72b1f9b1d4b3a4c8e4f5c",
    bobWilliams:  "60c72b1f9b1d4b3a4c8e4f5d",
    charlieBrown: "60c72b1f9b1d4b3a4c8e4f5e",
    dianaPrince:  "60c72b1f9b1d4b3a4c8e4f5f",
}

// Generate some placeholder Product IDs
const productIds = {
    laptop:       "71d83c2a0c2e5c4b5d9f5a6a",
    mouse:        "71d83c2a0c2e5c4b5d9f5a6b",
    smartphone:   "71d83c2a0c2e5c4b5d9f5a6c",
    coffeeMaker:  "71d83c2a0c2e5c4b5d9f5a6d",
    coffeeBeans:  "71d83c2a0c2e5c4b5d9f5a6e",
    runningShoes: "71d83c2a0c2e5c4b5d9f5a6f",
    tShirt:       "71d83c2a0c2e5c4b5d9f5a70",
    jeans:        "71d83c2a0c2e5c4b5d9f5a71",
    jetModel:     "71d83c2a0c2e5c4b5d9f5a72",
}


const parseAndFormatDate = (dateString) => {
    const parts = dateString.split('-')
    if (parts.length !== 3) return new Date().toISOString()
    
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10)).toISOString()
}


export const testOrders = [
    {
        _id: "82e94d3b1d3f6d5c6ea06b7a", 
        userId: userIds.johnDoe,
        
        userName: "John Doe",
        userImage: "/images/profile-1.jpg",
        
        products: [
          {
            productId: productIds.laptop,
            productName: "Laptop Pro", 
            quantity: 1,
            price: 1200
          },
          {
            productId: productIds.mouse,
            productName: "Wireless Mouse", 
            quantity: 1,
            price: 25
          },
        ],
        totalAmount: 1301.25,
        status: "completed",
        address: "123 Main St, Anytown, 12345, USA",
        createdAt: parseAndFormatDate("14-08-2023"),
        updatedAt: parseAndFormatDate("14-08-2023"),
      },
      {
        _id: "82e94d3b1d3f6d5c6ea06b7b", 
        userId: userIds.janeSmith,
        userName: "Jane Smith",
        userImage: "/images/profile-2.jpg",
        products: [
          {
            productId: productIds.smartphone,
            productName: "Smartphone X", 
            quantity: 1,
            price: 800
          },
        ],
        totalAmount: 850,
        status: "pending",
        address: "456 Oak Ave, Somewhere, 67890, USA",
        createdAt: parseAndFormatDate("15-08-2023"),
        updatedAt: parseAndFormatDate("15-08-2023"),
      },
      {
        _id: "82e94d3b1d3f6d5c6ea06b7c", 
        userId: userIds.aliceJohnson,
        userName: "Alice Johnson",
        userImage: "/images/profile-3.jpg",
        products: [
          {
            productId: productIds.coffeeMaker,
            productName: "Coffee Maker", 
            quantity: 1,
            price: 50
          },
          {
            productId: productIds.coffeeBeans,
            productName: "Coffee Beans (1kg)", 
            quantity: 2,
            price: 15
          },
        ],
        totalAmount: 89,
        status: "pending",
        address: "789 Pine Ln, Villagetown, 11223, USA",
        createdAt: parseAndFormatDate("16-08-2023"),
        updatedAt: parseAndFormatDate("16-08-2023"),
      },
      {
        _id: "82e94d3b1d3f6d5c6ea06b7d", 
        userId: userIds.bobWilliams,
        userName: "Bob Williams",
        userImage: "/images/profile-4.jpg",
        products: [
          {
            productId: productIds.runningShoes,
            productName: "Running Shoes", 
            quantity: 1,
            price: 90
          },
        ],
        totalAmount: 102.5,
        status: "processing",
        address: "101 Runner Rd, Fastville, 33445, USA",
        createdAt: parseAndFormatDate("17-08-2023"),
        updatedAt: parseAndFormatDate("17-08-2023"),
      },
       {
        _id: "82e94d3b1d3f6d5c6ea06b7e", 
        userId: userIds.charlieBrown,
        userName: "Charlie Brown",
        userImage: "/images/profile-5.jpg",
        products: [
          {
            productId: productIds.tShirt,
            productName: "Graphic T-Shirt", 
            quantity: 3,
            price: 20
          },
          {
            productId: productIds.jeans,
            productName: "Jeans", 
            quantity: 1,
            price: 45
          },
        ],
        totalAmount: 117.25,
        status: "completed",
        address: "222 Cartoon Ave, Toontown, 55667, USA",
        createdAt: parseAndFormatDate("18-08-2023"),
        updatedAt: parseAndFormatDate("18-08-2023"),
      },
      {
        _id: "82e94d3b1d3f6d5c6ea06b7f", 
        userId: userIds.dianaPrince,
        userName: "Diana Prince",
        userImage: "/images/profile-6.jpg",
        products: [
          {
            productId: productIds.jetModel,
            productName: "Invisible Jet Model", 
            quantity: 1,
            price: 500
          },
        ],
        totalAmount: 500,
        status: "cancelled",
        address: "1 Paradise Island, Themyscira, N/A, Amazon",
        createdAt: parseAndFormatDate("19-08-2023"),
        updatedAt: parseAndFormatDate("19-08-2023"),
      }
]