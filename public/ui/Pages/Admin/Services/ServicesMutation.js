import { gql } from "@apollo/client";

export const CREATE_SERVICES = gql`
    mutation CreateService($input: serviceInput) {
        createService(input: $input) {
            id
            serviceName
            description
            flagIcon
            sortOrder
            createdBy
            updatedBy
            createdAt
            updatedAt
            
        }
    }
`;

export const UPDATE_SERVICES = gql`
    mutation UpdateService($input: serviceInput) {
        updateService(input: $input) {
            id
            serviceName
            description
            flagIcon
            sortOrder
            createdBy
            updatedBy
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_SERVICES = gql`
    mutation DeleteService($deleteServiceId: ID) {
        deleteService(id: $deleteServiceId)
    }
`;