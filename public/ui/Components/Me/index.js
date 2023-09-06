import { gql } from '@apollo/client';

export const ME = gql`
query Me {
  me {
    id
    firstName
    lastName
    email
    mobile
    state
    city
    country
    code
    roleId {
      id
      roleName
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
    isVerified
    isDeleted
  }
}
`