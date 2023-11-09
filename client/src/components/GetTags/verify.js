import { backendURL } from "../../backendUrl";
const url = backendURL + "users";

const queryFetch = (query, variables) => {
  return fetch(url, {
    method: "POST",
    credentials: 'include',
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

export const verify = (image1, image2) =>
  queryFetch(`
    mutation { Verify(username: "${localStorage.getItem("username")}", file1: "${image1}", file2: "${image2}") }
  `).then((data) => {
    return data;
});