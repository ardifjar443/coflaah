import { getUrl } from "./api";

const baseUrl = getUrl();

let update = false;

export const buatPesanan = async (
  username,
  id_produk,
  jumlah,
  id_transaksi
) => {
  try {
    const response = await fetch(`${baseUrl}/buatPesanan.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        id_produk: id_produk,
        jumlah: jumlah,
        id_transaksi: id_transaksi,
      }),
    });
    const result = await response.json();
    console.log(result);
    update = !update;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updatePesanan = () => {
  return update;
};
