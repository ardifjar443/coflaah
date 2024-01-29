import { useEffect, useState } from "react";
import { getProduk } from "./api/getProduk";
import Popup from "./component/popup";
import _isEqual from "lodash/isEqual";
import { updateStock } from "./api/updateStock";
import { useNavigate } from "react-router-dom";
import { cekLoginAdmin } from "./api/login";

const TambahBarang = () => {
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

  return (
    <>
      <div className="min-h-screen">
        <>
          <div className="min-h-screen flex justify-center items-center flex-col">
            <div className="mt-20 text-white text-3xl font-bold mb-10">
              Daftar Produk
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
                          <div className="card-actions"></div>
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
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center z-[999]">
            {/* Isi tombol melayang di sini */}
            <button className="bg-amber-900 hover:bg-amber-950 text-white px-6 py-3 rounded-full text-lg font-semibold  ">
              tambah Produk
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
      </div>
    </>
  );
};

export default TambahBarang;
