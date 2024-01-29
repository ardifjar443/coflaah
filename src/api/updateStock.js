// api.js
const baseUrl = "http://localhost/backend_coflaah"; // Ganti dengan URL base yang sesuai
// const baseUrl = "https://coflaah123.000webhostapp.com/backend_coflaah"; // Ganti dengan URL base yang sesuai

export const updateStock = async (id, stok) => {
  try {
    const response = await fetch(`${baseUrl}/updateStok.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        id_produk: id,
        stok: stok,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
