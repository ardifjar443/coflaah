import { getUrl } from "./api";

const baseUrl = getUrl();
export const selesaiPesanan = async (id) => {
  try {
    const response = await fetch(`${baseUrl}selesaiPesanan.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id_pesanan: id,
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
