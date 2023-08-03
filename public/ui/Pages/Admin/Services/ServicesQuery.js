import { gql } from "@apollo/client";

export const GET_ALL_SERVICES = gql`
	query GetAllServiceWithPaginate($page: Int, $limit: Int, $sort: Sort, $filter: String, $search: String) {
		getAllServiceWithPaginate(page: $page, limit: $limit, sort: $sort, filter: $filter, search: $search) {
			count
			data {
				id
				serviceName
				description
				flagIcon
				sortOrder
				isCatagory
				createdBy
				updatedBy
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_SERVICES = gql`
	query GetAllService {
		getAllService {
			id
			serviceName
			description
			flagIcon
			sortOrder
			isCatagory
			createdBy
			updatedBy
			createdAt
			updatedAt
		}
	}
`;

export const GET_SERVICES_BY_PORTFOLIO = gql`
	query GetAllServiceByPortfolio {
		getAllServiceByPortfolio {
			id
			serviceName
			description
			flagIcon
			sortOrder
			isCatagory
			createdBy
			updatedBy
			createdAt
			updatedAt
		}
	}
`;
