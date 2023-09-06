import { gql } from "@apollo/client";

export const CREATE_FAQ = gql`
mutation Mutation($input: FAQInput) {
    createFAQ(input: $input) {
      id
      categoryId
      question
      answer    
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_FAQ = gql`
mutation UpdateFAQ($input: FAQInput) {
  updateFAQ(input: $input) {
    answer
    categoryId
    createdAt
    id
    createdBy
    question
    updatedBy
    updatedAt
  }
}
`
export const DELETE_FAQ = gql`
mutation DeleteFAQ($deleteFaqId: ID) {
  deleteFAQ(id: $deleteFaqId)
}
`

export const GET_ALL_FAQ = gql`
query GetAllFAQWithPaginate($page: Int, $limit: Int, $sort: Sort, $filter: String, $search: String) {
  getAllFAQWithPaginate(page: $page, limit: $limit, sort: $sort, filter: $filter, search: $search) {
    count
    data {
      answer
      categoryId {
        categoryTitle
      }
      id
      question
      createdBy {
        id
        profilePhoto
        firstName
        lastName
        email
        mobile
        password
        state
        city
        country
        code
        roleId
        isVerified
        isDeleted
      }
      updatedBy {
        id
        profilePhoto
        firstName
        lastName
        email
        mobile
        password
        state
        city
        country
        code
        roleId
        isVerified
        isDeleted
      }
      createdAt
      updatedAt
    }
  }
}
`