import { gql } from "@apollo/client";

export const GET_ALL_SERVICE = gql`
query GetAllService($getAllServiceId: ID) {
    getAllService(id: $getAllServiceId) {
      createdAt
      createdBy
      description
      flagIcon
      id
      isCatagory
      serviceName
      sortOrder
      updatedAt
      updatedBy
    }
  }
`;