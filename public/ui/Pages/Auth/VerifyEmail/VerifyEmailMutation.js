import { gql } from "@apollo/client"

export const VERIFY_EMAIL = gql`
    mutation VerifyEmail($verifyEmailId: ID!, $code: String!) {
        verifyEmail(id: $verifyEmailId, code: $code)
    }
`; 