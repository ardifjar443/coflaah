const baseUrl = "http://localhost/backend_coflaah/getPesananUser.php";

export const getPesananUser = async (username) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error: ", error);
  }
};
