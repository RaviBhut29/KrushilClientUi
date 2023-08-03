import { gql } from "@apollo/client"

export const SIGN_UP = gql`
    mutation CreateUser($input: userInput) {
        createUser(input: $input) {
            id
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
    }
`;