const baseUrl = "http://localhost/backend_coflaah";
export const validPembayaran = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/validPembayaran.php`, {
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
