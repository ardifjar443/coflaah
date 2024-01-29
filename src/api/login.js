// api.js
const baseUrl = "http://localhost/backend_coflaah"; // Ganti dengan URL base yang sesuai
// const baseUrl = "https://coflaah123.000webhostapp.com/backend_coflaah"; // Ganti dengan URL base yang sesuai

let statusLogin = false;
let statusLoginAdmin = false;

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    statusLogin = true;

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/loginAdmin.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    statusLoginAdmin = true;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const cekLogin = () => {
  return statusLogin;
};

export const cekLoginAdmin = () => {
  return statusLoginAdmin;
};

export const logout = () => {
  statusLogin = false;
  statusLoginAdmin = false;
};
