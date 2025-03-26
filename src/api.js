export const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/users");
    return response.json();
  };

  








  