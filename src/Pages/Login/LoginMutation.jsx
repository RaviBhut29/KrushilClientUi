import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation SignIn($email: String, $password: String!) {
		signIn(email: $email, password: $password) {
			token
			user {
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
	}
`;
