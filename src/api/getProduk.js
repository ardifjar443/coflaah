const baseUrl = "http://localhost/backend_coflaah"; // Ganti dengan URL base yang sesuai
export const getProduk = async () => {
    try {
      const response = await fetch(`${baseUrl}/getProduk.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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