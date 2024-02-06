import { useEffect, useState } from "react";
import { getPesanan } from "./api/getPesanan";
import Popup from "./component/popup";
import { cekLoginAdmin } from "./api/login";
import { useNavigate } from "react-router-dom";
import { validPembayaran } from "./api/validPembayaran";
import { selesaiPesanan } from "./api/selesaiPesanan";

const DaftarPesanan = () => {
  const navigate = useNavigate();
  const [statusLoginAdmin, setStatusLoginAdmin] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isiPopup, setIsiPopup] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setStatusLoginAdmin(cekLoginAdmin());
  }, []);

  const [dataPesanan, setDataPesanan] = useState(null);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getPesanan();
        if (response.message === "Ada Pesanan") {
          setDataPesanan(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }

      // ...
    }
    fetchData();
  }, [update]);
  const formatRupiah = (number) => {
    // Lakukan validasi untuk memastikan input adalah angka
    if (isNaN(number)) {
      return "Invalid input";
    }

    // Konversi angka ke string dan pecah menjadi bagian desimal dan non-desimal
    const parts = number.toString().split(".");
    const nonDecimalPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const decimalPart = parts[1] ? "," + parts[1] : "";

    // Gabungkan bagian desimal dan non-desimal
    return "Rp " + nonDecimalPart + decimalPart;
  };
  if (!statusLoginAdmin) {
    return (
      <>
        {" "}
        <div className="min-h-screen">
          <Popup
            content={
              <>
                <div className="flex flex-col gap-5">
                  <h1 className="text-black text-2xl font-bold">
                    Mohon untuk Login sebagai admin untuk mengakses Page ini
                  </h1>
                  <button
                    className=" bg-amber-700 text-white rounded-xl hover:bg-amber-800 p-2"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                </div>
              </>
            }
            namaButton={"Kembali ke Halaman Utama"}
            onClose={() => {
              navigate("/");
            }}
          />
        </div>
      </>
    );
  }

  const handleKonfirmasi = async (id) => {
    try {
      const data = await validPembayaran(id);
      setUpdate(!update);
      setIsiPopup(
        <>
          <div className="text-black text-center text-2xl font-bold">
            {data.message}
          </div>
        </>
      );
      setPopup(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSelesai = async (id) => {
    try {
      const data = await selesaiPesanan(id);
      setUpdate(!update);
      setIsiPopup(
        <>
          <div className="text-black text-center text-2xl font-bold">
            {data.message}
          </div>
        </>
      );
      setPopup(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-white text-4xl font-bold">Daftar Pesanan</h1>
        </div>
        <div className="flex flex-col gap-10  w-full px-32 py-10">
          {dataPesanan &&
            dataPesanan.map((items, index) => (
              <div
                className="card card-side bg-white shadow-xl w-full"
                key={index}
              >
                <figure>
                  <img
                    src={items.foto}
                    className=" w-72 h-80 bg-contain"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex">
                    <h2 className="card-title text-black font-bold text-3xl w-full">
                      {items.status}
                    </h2>
                    <h2 className="w-full text-end text-black text-xl font-bold">
                      ID Pesanan : {" " + items.id_pesanan}
                    </h2>
                  </div>
                  <table className=" w-1/2 text-black">
                    <thead>
                      <tr>
                        <td>Bukti Pembayaran </td>
                        <td className="font-bold">: {items.id_transaksi}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tanggal Pesanan</td>
                        <td>: {items.tanggal_pesanan}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Jumlah Pesanan</td>
                        <td>: {items.jumlah}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Total Harga</td>
                        <td>: {formatRupiah(items.total_harga)}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>User </td>
                        <td>: {items.username}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="card-actions justify-end">
                    {items.status !== "selesai" && (
                      <button
                        className="bg-amber-900 p-3 rounded-lg hover:bg-amber-950 text-xl text-white"
                        onClick={() => {
                          if (items.status === "menunggu") {
                            handleKonfirmasi(items.id_pesanan);
                          } else if (items.status === "dibuat") {
                            handleSelesai(items.id_pesanan);
                          }
                        }}
                      >
                        {items.status === "menunggu"
                          ? "Konfirmasi Pembayaran"
                          : items.status === "dibuat" && "Pesanan Selesai"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {popup && (
        <Popup
          content={isiPopup}
          onClose={() => {
            setPopup(false);
          }}
          namaButton={"Kembali"}
        />
      )}
    </>
  );
};

export default DaftarPesanan;
