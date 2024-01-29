const baseUrl = "http://localhost/backend_coflaah"; // Ganti dengan URL base yang sesuai
// const baseUrl = "https://coflaah123.000webhostapp.com/backend_coflaah"; // Ganti dengan URL base yang sesuai
export const getProduk = async () => {
  try {
    const response = await fetch(`${baseUrl}/getProduk.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
