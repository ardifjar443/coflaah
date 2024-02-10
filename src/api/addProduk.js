import { getUrl } from "./api";

const baseUrl = getUrl();

export const addProduk = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/addProduk.php`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
