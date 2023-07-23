export const typeDefs = `#graphql
  
  type Product {
    name: String
    description: String
    image_url: String
    category: String
    id: ID!
    price_in_cents: Int
    sales: Int
    created_at: Date
  }

  type Query {
    allProducts(sortField: String, sortOrder: String, category: String): [Product!]!
    Product(id: ID!): Product
  }

  scalar Date
  scalar ID
`;
