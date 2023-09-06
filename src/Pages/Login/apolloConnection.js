import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GQL_URL } from './config';
import SignOut from "./SignOut"
import { onError } from "apollo-link-error";
import { toast } from 'react-toastify';
import { FormatError } from '../Common/FormatError';

const httpLink = createHttpLink({
    uri: GQL_URL,
});

const loginUser = JSON.parse(sessionStorage.getItem("user"));

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            ...headers,
            'x-token': token ? token : "",
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, extensions, path }) => {
            if (extensions.code === "UNAUTHENTICATED") {
                if (loginUser?.roleId) {
                    SignOut(client);
                    toast.error(FormatError(message));
                }
            }
        });
    }

    if (networkError) {
        if (networkError.statusCode === 400) {
            if (loginUser?.roleName) {
                SignOut(client);
            }
        }
    }
});


const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

export default client;