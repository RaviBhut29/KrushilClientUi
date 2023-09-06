import { gql } from "@apollo/client";

export const GET_ALL_PORTFOLIO = gql`
	query GetAllPortfolioWithPaginate($page: Int, $limit: Int, $sort: Sort, $filter: String, $search: String) {
		getAllPortfolioWithPaginate(page: $page, limit: $limit, sort: $sort, filter: $filter, search: $search) {
			count
			data {
				id
				name
				description
				image
				flagIcon
				serviceId {
					id
					serviceName
					description
					flagIcon
					sortOrder
					isCatagory
				}
				categoryId {
					id
					catagoryName
					categoryTitle
					tumbnail
					description
					image
					ratignCount
					rating
					sortOrder
					discount
					price
					llikeReference
					formatIncluded
				}
				sortOrder
				isCatagory
				createdBy
				updatedBy
			}
		}
	}
`;
