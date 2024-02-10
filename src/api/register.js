import { getUrl } from "./api";

const baseUrl = getUrl();
export const userRegister = async (username, password, email, nama) => {
  try {
    const response = await fetch(`${baseUrl}register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: nama,
      }),
    });

    if (!response.ok) {
      throw new Error("Register failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
