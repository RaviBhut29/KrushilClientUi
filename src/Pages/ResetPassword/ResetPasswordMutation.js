import { gql } from "@apollo/client"

export const RESET_PASSWORD = gql`
    mutation ResetPassword($resetPasswordId: ID, $code: String, $password: String) {
        resetPassword(id: $resetPasswordId, code: $code, password: $password)
    }
`;