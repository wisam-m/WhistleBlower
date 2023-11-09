import { backendURL } from "../../backendUrl";
const url = backendURL + "users";

const queryFetch = (query, variables) => {
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => {
    const data = res.json();
    return data;
  });
};

export const loginRequest = (username, password) =>
  queryFetch(`
    mutation {
      Signin(
        username: "${username}"
        password: "${password}"
      )
    }
  `).then((data) => {
    return data;
  });
