// react-movies/src/api/auth-api.jsx
export const login = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch(
    "http://localhost:8080/api/users?action=register",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  return response.json();
};
