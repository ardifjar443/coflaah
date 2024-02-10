import { getUrl } from "./api";

const baseUrl = getUrl();

export const getPesananUser = async (username) => {
  try {
    const response = await fetch(`${baseUrl}getPesananUser.php`, {
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
