import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProduk } from "./api/getProduk";
import Popup from "./component/popup";
import { cekLogin } from "./api/login";
import { buatPesanan } from "./api/buatPesanan";
import { getDataUser } from "./api/dataUser";

const Produk = () => {
  const [popup, setPopup] = useState(false);
  const [id_transaksi, setId_transaksi] = useState("");

  const navigate = useNavigate();
  const [jumlah, setJumlah] = useState(1);

  const [isiPopup, setIsiPopup] = useState("qr");

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

  const { id } = useParams();
  const [dataProduk, setDataProduk] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getProduk();

      if (data) {
        setDataProduk(data);
      }
    } catch (error) {
      // Handle error, misalnya tampilkan pesan error ke pengguna
      console.error("Login error:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleTambah = () => {
    if (jumlah < selectedBarang.stok) {
      setJumlah(jumlah + 1);
    }
  };
  const handleKurang = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  if (!cekLogin()) {
    return (
      <>
        <div className="min-h-screen">
          <Popup
            content={
              <>
                <div className="flex flex-col gap-5">
                  <h1 className="text-black text-2xl font-bold">
                    Mohon untuk Login untuk mengakses Page ini
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

  if (!dataProduk || dataProduk.length === 0) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <div className="p-4 max-w-sm w-full mx-auto">
            <div className="bg-white shadow rounded-md p-5">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-12 bg-slate-700 rounded"></div>
                  <div className="h-16 bg-slate-700 rounded"></div>
                  <div className="h-16 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse flex space-x-4 mt-10">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-12 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
          <div className="max-w-xl w-full mx-auto bg-white p-2 rounded-2xl px-3">
            <div className="">
              <div className="animate-pulse flex space-x-4 ">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-72 bg-slate-700 rounded-xl"></div>
                </div>
              </div>

              <div className=" rounded-md p-4 ">
                <div className="animate-pulse flex space-x-4 ">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  const selectedBarang = dataProduk.find(
    (item) => item.id_produk === id.toUpperCase()
  );

  // Periksa apakah barang ditemukan
  if (!selectedBarang) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Popup
            content={
              <>
                <div className="text-xl text-black font-bold">
                  Produk dengan id : {id} tidak ditemukan
                </div>
              </>
            }
            namaButton={"kembali"}
            onClose={() => {
              navigate("/");
            }}
          />
        </div>
      </>
    );
  }

  const handleSubmit = async () => {
    try {
      const data = await buatPesanan(
        getDataUser().dataUser.username,
        id,
        jumlah,
        id_transaksi
      );

      if (data) {
        setDataProduk(data);
        setStok(data.map((items) => parseInt(items.stok)));
        setStok1(data.map((items) => parseInt(items.stok)));
      }
    } catch (error) {
      console.error("Fetch data error:", error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col-reverse gap-5 p-10 md:flex-row lg:flex-row pt-20 md:pt-0 lg:pt-0">
        <div className="max-w-sm w-full mx-auto ">
          <div className="bg-white p-4 rounded-xl text-black">
            <h1 className="text-3xl font-bold">
              {selectedBarang.nama}{" "}
              <span className="text-lg">({selectedBarang.ukuran})</span>
            </h1>
            <div className="text-center text-2xl bg-yellow-900 p-3 rounded-xl mt-3 text-white">
              {formatRupiah(selectedBarang.harga * jumlah)}
            </div>
            <div className="flex bg-yellow-900 justify-center items-center rounded-xl p-2 mt-3 gap-5">
              <button
                className="bg-white hover:bg-gray-400 p-2 rounded-md w-full  text-3xl font-bold"
                onClick={handleKurang}
              >
                -
              </button>
              <span className="w-full text-center text-white">{jumlah}</span>
              <button
                className="bg-white hover:bg-gray-400 p-2 rounded-md w-full text-3xl font-bold"
                onClick={handleTambah}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              className="bg-white hover:bg-gray-300 p-3 text-xl text-black font-bold rounded-xl"
              onClick={() => {
                setPopup(true);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
        <div className=" max-w-xl w-full mx-auto p-4 rounded-xl flex flex-col gap- bg-white">
          <img src={selectedBarang.foto} className="rounded-xl" />
          <div className="bg-white p-4 rounded-xl text-black">
            <h1 className="text-xl font-bold">Keterangan :</h1>
            <span>{selectedBarang.deskripsi}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10  rounded-xl flex flex-col p-2 text-black">
        <button
          className="bg-white p-2 text-xl rounded-lg font-bold hover:bg-gray-200"
          onClick={() => {
            navigate("/");
          }}
        >
          Kembali
        </button>
      </div>
      {popup && (
        <Popup
          content={
            <>
              {isiPopup === "qr" ? (
                <div>
                  <div className="bg-yellow-950 p-5 rounded-md flex justify-center">
                    <img src="../img/qr.png" alt="" />
                  </div>
                  <div className="bg-yellow-900 mt-4 p-2 rounded-md text-white text-center">
                    <h1 className="text-lg ">bayar dengan harga :</h1>
                    <span className="text-2xl font-bold">
                      {formatRupiah(selectedBarang.harga * jumlah)}
                    </span>
                  </div>
                  <button
                    className="bg-yellow-700 hover:bg-yellow-800 p-2 rounded-md text-white w-full mt-4"
                    onClick={() => {
                      setIsiPopup("bukti");
                    }}
                  >
                    Selanjutnya
                  </button>
                </div>
              ) : isiPopup === "bukti" ? (
                <div className="flex flex-col gap-5">
                  <h1 className="text-3xl text-black font-bold">
                    Masukan kode pembayaran
                  </h1>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full  bg-white border border-yellow-900 text-black"
                    onChange={(e) => {
                      setId_transaksi(e.target.value);
                    }}
                  />
                  <button
                    className="bg-yellow-700 hover:bg-yellow-800 p-2 rounded-md text-white"
                    onClick={() => {
                      setIsiPopup("selesai");
                      handleSubmit();
                    }}
                  >
                    Kirim
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h1 className="text-black text-2xl font-bold">
                    Menunggu konfirmasi
                  </h1>
                  <img src="../img/nunggu.png" alt="" className="w-1/2" />
                </div>
              )}
            </>
          }
          namaButton={
            isiPopup === "qr"
              ? "kembali"
              : isiPopup === "bukti"
              ? "Kembali Ke qr code"
              : "Kembali ke Halaman Utama"
          }
          onClose={() => {
            if (isiPopup === "qr") {
              setPopup(false);
            } else if (isiPopup === "bukti") {
              setIsiPopup("qr");
            } else if (isiPopup === "selesai") {
              setIsiPopup("qr");
              setPopup(false);
              navigate("/");
            }
          }}
        />
      )}
    </>
  );
};

export default Produk;
