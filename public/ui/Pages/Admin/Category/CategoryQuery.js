import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY = gql`
	query GetAllCategoryWithPaginate($page: Int, $limit: Int, $sort: Sort, $filter: String, $search: String) {
		getAllCategoryWithPaginate(page: $page, limit: $limit, sort: $sort, filter: $filter, search: $search) {
			count
			data {
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
				serviceId {
					id
					serviceName
					description
					flagIcon
					sortOrder
					isCatagory
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetAllCategory($getAllCategoryId: ID, $serviceId: ID) {
		getAllCategory(id: $getAllCategoryId, serviceId: $serviceId) {
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
			serviceId {
				id
				serviceName
				description
				flagIcon
				sortOrder
				isCatagory
			}
			createdAt
			updatedAt
		}
	}
`;

export const GET_CATEGORIES_BY_FAQ = gql`
	query GetAllCategoryByFAQ {
		getAllCategoryByFAQ {
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
			serviceId {
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
			createdAt
			updatedAt
		}
	}
`;
