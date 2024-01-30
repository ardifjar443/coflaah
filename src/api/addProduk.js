const baseUrl = "http://localhost/backend_coflaah/addProduk.php";

export const addProduk = async (formData) => {
  try {
    const response = await fetch(baseUrl, {
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
