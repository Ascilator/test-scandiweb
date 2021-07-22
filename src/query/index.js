import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
  query {
    currencies
  }
`;

export const GET_CATALOG = gql`
  query {
    category {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;
