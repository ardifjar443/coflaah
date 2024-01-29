import { useEffect, useRef, useState } from "react";
import { getProduk } from "../api/getProduk";
import { useNavigate } from "react-router-dom";
import { cekLogin } from "../api/login";
import Popup from "./popup";

const Product = (props) => {
  const [popup, setPopup] = useState(false);
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();
  const [statusLogin, setStatusLogin] = useState(false);
  const items = [
    {
      kopi: 1,
      soldOut: false,
      promo: false,
      bestSeller: false,
      new: true,
      image: "./img/kopi1.png",
      nama: "Signature Fix",
      deskripsi: "kopi susu gula aren ",
      harga: 28,
      ukuran: "500 ml",
    },
  ];
  const [dataProduk, setDataProduk] = useState(null);

  const animatedRef = useRef(null);
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
    setStatusLogin(cekLogin());
  }, [cekLogin()]);

  const cekBaru = (dateString) => {
    const currentDate = new Date();

    // Mendapatkan tahun, bulan, dan tanggal dari tanggal saat ini
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember)
    const currentDay = currentDate.getDate();

    // Mendapatkan tahun, bulan, dan tanggal dari tanggal dalam format tertentu
    const dateParts = dateString.split(/[\s-:]/);
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    // Mengecek apakah tahun, bulan, dan tanggal sama dengan tanggal saat ini
    const isDateEqualsNow =
      year === currentYear && month === currentMonth && day === currentDay;

    return isDateEqualsNow;
  };

  return (
    <>
      <div
        className="bg-gradient-to-b from-transparent to-[#eaddcf] p-16"
        id="product"
      ></div>
      <div className="flex justify-center items-center flex-col bg-[#eaddcf] pb-20">
        <div className="text-black text-3xl font-bold p-10">
          <h1>Product</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10  lg:w-1/2 md:w-1/2  ">
          {dataProduk &&
            dataProduk.map((items, index) => (
              <div
                key={index}
                className={
                  index == dataProduk.length - 1 || cekBaru(items.time)
                    ? "col-span-2 order-first"
                    : ""
                }
                id={"kopi" + index}
              >
                <div className="relative ...">
                  <div
                    className={`card  h-96 bg-[#2d1b08] shadow-xl text-white m-3  `}
                  >
                    <figure>
                      <img
                        src={"./img/" + items.foto}
                        alt="Shoes"
                        className="bg-contain"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="grid grid-cols-2">
                        <div>
                          <div className="">
                            <h2 className="card-title text-2xl lg:text-3xl md:text-3xl ">
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
                      <div className="card-actions justify-end">
                        <button
                          className="btn bg-[#603e21] text-white"
                          onClick={() => {
                            if (statusLogin) {
                              navigate(`/produk/${items.id_produk}`);
                            } else {
                              setPopup(true);
                              setPesan(
                                <>
                                  <div className="flex flex-col gap-3">
                                    <h1 className="text-black text-2xl font-bold">
                                      Harus Login Terlebih Dahulu
                                    </h1>
                                    <button
                                      className="bg-yellow-900 p-3 rounded-md text-white"
                                      onClick={() => {
                                        navigate("/login");
                                      }}
                                    >
                                      Login
                                    </button>
                                  </div>
                                </>
                              );
                            }
                          }}
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4  right-2 ...">
                    <div className="flex gap-2">
                      {items.soldOut && (
                        <div>
                          <img
                            src="./img/soldOut.png"
                            className="w-20"
                            alt=""
                          />
                        </div>
                      )}
                      {items.promo && (
                        <div>
                          <img
                            src="./img/discount.png"
                            className="w-20"
                            alt=""
                          />
                        </div>
                      )}
                      {items.bestSeller && (
                        <div>
                          <img
                            src="./img/best-seller.png"
                            className="w-20"
                            alt=""
                          />
                        </div>
                      )}
                      {cekBaru(items.time) && (
                        <div>
                          <img
                            src="./img/new.png"
                            className="w-20 mt-4 me-1"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-gradient-to-t from-transparent to-[#eaddcf] p-16"></div>
      {popup && (
        <Popup
          content={pesan}
          onClose={() => {
            setPopup(false);
          }}
          namaButton={"Kembali"}
        />
      )}
    </>
  );
};

export default Product;
