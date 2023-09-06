import { gql } from "@apollo/client";

export const CREATE_PORTFOLIO = gql`
	mutation CreatePortfolio($input: PortfolioInput) {
		createPortfolio(input: $input) {
			id
			name
			description
			image
			flagIcon
			serviceId
			categoryId
			sortOrder
			isCatagory
			createdBy
			updatedBy
		}
	}
`;

export const UPDATE_PORTFOLIO = gql`
	mutation UpdatePortfolio($input: PortfolioInput) {
		updatePortfolio(input: $input) {
			id
			name
			description
			image
			flagIcon
			serviceId
			categoryId
			sortOrder
			isCatagory
			createdBy
			updatedBy
		}
	}
`;

export const DELETE_PORTFOLIO = gql`
	mutation DeletePortfolio($deletePortfolioId: ID) {
		deletePortfolio(id: $deletePortfolioId)
	}
`;
