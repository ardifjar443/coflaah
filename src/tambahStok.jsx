import { useEffect, useState } from "react";
import { getProduk } from "./api/getProduk";
import Popup from "./component/popup";
import _isEqual from "lodash/isEqual";
import { updateStock } from "./api/updateStock";
import { useNavigate } from "react-router-dom";
import { cekLoginAdmin } from "./api/login";

const TambahStok = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [pesan, setPesan] = useState("");
  const [stok, setStok] = useState([]);
  const [stok1, setStok1] = useState([]);
  const [dataProduk, setDataProduk] = useState(null);
  const [statusLoginAdmin, setStatusLoginAdmin] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getProduk();

      if (data) {
        setDataProduk(data);
        setStok(data.map((items) => parseInt(items.stok)));
        setStok1(data.map((items) => parseInt(items.stok)));
      }
    } catch (error) {
      console.error("Fetch data error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    setStatusLoginAdmin(cekLoginAdmin());
  }, [popup]);

  const TambahStok = (indexProduk) => {
    const newStok = stok.map((value, i) =>
      i === indexProduk ? parseInt(value) + 1 : value
    );
    setStok(newStok);
  };
  const KurangStok = (indexProduk) => {
    const newStok = stok.map((value, i) =>
      parseInt(value) > 0 && i === indexProduk ? parseInt(value) - 1 : value
    );
    setStok(newStok);
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

  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="mt-20 text-white text-3xl font-bold mb-10">
          Tambah Stock
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:w-1/2 md:w-1/2">
          {dataProduk &&
            dataProduk.map((items, index) => (
              <div key={index} id={"kopi" + index}>
                <div className="relative ...">
                  <div
                    className={`card h-96 bg-[#2d1b08] shadow-xl text-white m-3`}
                  >
                    <figure>
                      <img
                        src={"./img/" + items.foto}
                        alt="Shoes"
                        className="bg-cover w-full"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="grid grid-cols-2">
                        <div>
                          <div className="">
                            <h2 className="card-title text-2xl lg:text-3xl md:text-3xl">
                              {items.nama + " (" + items.ukuran + ")"}
                            </h2>
                          </div>
                          <p>{items.deskripsi}</p>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-white w-fit p-3 text-black font-bold rounded-lg h-fit">
                            {String(items.harga).slice(0, -3) + " "}K
                          </div>
                        </div>
                      </div>
                      <div className="card-actions">
                        <div className="flex justify-center items-center w-full">
                          <button
                            className="bg-white w-full text-black font-bold text-2xl rounded-lg hover:bg-gray-200"
                            onClick={() => KurangStok(index)}
                          >
                            -
                          </button>
                          <span className="w-full text-center">
                            {stok[index]}
                          </span>
                          <button
                            className="bg-white w-full text-black font-bold text-2xl rounded-lg hover:bg-gray-200"
                            onClick={() => TambahStok(index)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className={`rounded-lg w-full p-2 ${
                            stok[index] === stok1[index]
                              ? "bg-amber-900  "
                              : "bg-amber-600 hover:bg-amber-700 "
                          }`}
                          disabled={stok[index] === stok1[index]}
                          onClick={async () => {
                            try {
                              const data = await updateStock(
                                items.id_produk,
                                stok[index]
                              );

                              if (data.message) {
                                // Jika login berhasil, set pesan ke state dan navigasikan ke halaman baru
                                setPesan(
                                  <>
                                    <div className="text-black font-bold text-2xl">
                                      {data.message}
                                    </div>
                                  </>
                                );
                                setPopup(true);
                              } else if (data.error) {
                                // Jika login gagal, set pesan error ke state
                                setPesan(data.error);
                                setPopup(true);
                              }
                            } catch (error) {
                              // Handle error, misalnya tampilkan pesan error ke pengguna
                              console.error("Login error:", error.message);
                            }
                          }}
                        >
                          Update/Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="fixed bottom-10 right-10 rounded-xl flex flex-col p-2 text-black">
        <button
          className="bg-white p-2 rounded-xl hover:bg-gray-200 text-lg font-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          Kembali
        </button>
      </div>
      {popup && (
        <Popup
          content={pesan}
          namaButton={"Kembali"}
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </>
  );
};

export default TambahStok;
