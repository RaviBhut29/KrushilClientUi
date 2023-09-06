import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($input: categoryInput) {
		createCategory(input: $input) {
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
			serviceId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($input: categoryInput) {
		updateCategory(input: $input) {
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
			serviceId
			createdAt
			updatedAt
		}
	}
`;

export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($deleteCategoryId: ID) {
		deleteCategory(id: $deleteCategoryId)
	}
`;
