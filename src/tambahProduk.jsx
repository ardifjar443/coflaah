import { useEffect, useState } from "react";
import { getProduk } from "./api/getProduk";
import Popup from "./component/popup";
import _isEqual from "lodash/isEqual";
import { useNavigate } from "react-router-dom";
import { cekLoginAdmin } from "./api/login";
import { addProduk } from "./api/addProduk";

const TambahBarang = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const [dataProduk, setDataProduk] = useState(null);
  const [statusLoginAdmin, setStatusLoginAdmin] = useState(false);
  const [isiPopup, setIsiPopup] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const [id, setId] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [stok, setStok] = useState(0);
  const [gambar, setGambar] = useState(null);
  const [isiError, setIsiError] = useState("");
  const [produkUpdate, setProdukUpdate] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setGambar(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchData = async () => {
    try {
      const data = await getProduk();

      if (data) {
        setDataProduk(data);
      }
    } catch (error) {
      console.error("Fetch data error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    setStatusLoginAdmin(cekLoginAdmin());
  }, [produkUpdate]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", gambar);
    formData.append("id_produk", id);
    formData.append("nama", namaProduk);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("ukuran", ukuran);
    formData.append("stok", stok);

    const data = await addProduk(formData);
    if (data.error) {
      setIsiError(<div className="text-black text-2xl">{data.error}</div>);
      setIsiPopup("error");
    }
    if (data.message) {
      setIsiPopup("berhasil");
    }
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

  if (!dataProduk || dataProduk.length === 0) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center flex-col">
          <h1 className="text-3xl text-white font-bold">Tambah Stok</h1>
          <div className="p-4  w-1/2 mx-auto grid grid-cols-2 gap-10  justify-center items-center">
            <div className="bg-[#2d1b08]  shadow rounded-md p-5 ">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-12 bg-white rounded"></div>
                  <div className="h-16 bg-white rounded"></div>
                  <div className="h-16 bg-white rounded"></div>
                </div>
              </div>
            </div>
            <div className="bg-[#2d1b08] shadow rounded-md p-5">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-12 bg-white rounded"></div>
                  <div className="h-16 bg-white rounded"></div>
                  <div className="h-16 bg-white rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-5 right-5 rounded-xl flex flex-col p-2 text-black">
          <button
            className="bg-white p-2 rounded-xl hover:bg-gray-200 text-lg font-bold"
            onClick={() => {
              navigate("/");
            }}
          >
            Kembali
          </button>
        </div>
      </>
    );
  }

  console.log(dataProduk);

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
                            src={items.foto}
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
          <div className="fixed bottom-5 right-5 rounded-xl flex flex-col p-2 text-black">
            <button
              className="bg-white p-2 rounded-xl hover:bg-gray-200 text-lg font-bold"
              onClick={() => {
                navigate("/");
              }}
            >
              Kembali
            </button>
          </div>
          <div className="fixed bottom-5 ms-5 text-center z-[999]">
            {/* Isi tombol melayang di sini */}
            <button
              className="bg-amber-900 hover:bg-amber-950 text-white px-6 py-3 rounded-full text-lg font-semibold  "
              onClick={() => {
                setPopup(true);
                setIsiPopup("input");
              }}
            >
              tambah Produk
            </button>
          </div>
          {popup && (
            <Popup
              content={
                <>
                  {isiPopup === "input" ? (
                    <>
                      <div className="flex flex-col gap-5">
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-black">
                              Id Produk
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full  bg-white border border-amber-900 text-black"
                            onChange={(e) => {
                              setId(e.target.value);
                            }}
                          />
                        </label>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-black">
                              Nama Produk
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full  bg-white border border-amber-900 text-black"
                            onChange={(e) => {
                              setNamaProduk(e.target.value);
                            }}
                          />
                        </label>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-black">Harga</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full  bg-white border border-amber-900 text-black"
                            onChange={(e) => {
                              setHarga(parseInt(e.target.value));
                            }}
                          />
                        </label>
                        <label className="form-control">
                          <div className="label">
                            <span className="label-text text-black">
                              Deskripsi Produk
                            </span>
                          </div>
                          <textarea
                            className="textarea textarea-bordered h-24 bg-white text-black border-amber-900"
                            placeholder="Type here"
                            onChange={(e) => {
                              setDeskripsi(e.target.value);
                            }}
                          ></textarea>
                        </label>

                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-black">
                              Ukuran
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full  bg-white border border-amber-900 text-black"
                            onChange={(e) => {
                              setUkuran(e.target.value);
                            }}
                          />
                        </label>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-black">Stok</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full  bg-white border border-amber-900 text-black"
                            onChange={(e) => {
                              setStok(parseInt(e.target.value));
                            }}
                          />
                        </label>
                        <button
                          className="bg-amber-600 p-3 rounded-lg text-white"
                          onClick={() => {
                            setIsiPopup("input_gambar");
                          }}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </>
                  ) : isiPopup === "input_gambar" ? (
                    <>
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="text-2xl text-black font-bold mb-10">
                          Masukan Gambar untuk produk
                        </h1>
                        <div>
                          <input
                            type="file"
                            onChange={handleImageChange}
                            className=" w-full text-sm text-slate-500 
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-amber-700 file:text-white
      hover:file:bg-amber-800 mb-5
    "
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <h1 className="text-black text-xl w-full">
                            Preview :
                          </h1>
                          <img src={imageSrc} alt="" className="w-1/2" />
                        </div>
                        <button
                          className="bg-amber-600 mt-5 p-2 w-full rounded-lg text-white hover:bg-amber-700"
                          onClick={() => {
                            setIsiPopup("preview");
                          }}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </>
                  ) : isiPopup === "preview" ? (
                    <div>
                      <h1 className="text-black text-2xl font-bold">
                        Preview :{" "}
                      </h1>
                      <div
                        className={
                          "col-span-1 lg:col-span-2 md:col-span-1 order-first"
                        }
                      >
                        <div className="relative ...">
                          <div
                            className={`card  h-96 bg-[#2d1b08] shadow-xl text-white m-3  `}
                          >
                            <figure>
                              <img
                                src={imageSrc}
                                alt="Shoes"
                                className="bg-contain"
                              />
                            </figure>
                            <div className="card-body">
                              <div className="grid grid-cols-2">
                                <div>
                                  <div className="">
                                    <h2 className="card-title text-2xl lg:text-3xl md:text-3xl ">
                                      {namaProduk + " (" + ukuran + ")"}
                                    </h2>
                                  </div>
                                  <p>{deskripsi}</p>
                                </div>
                                <div className="flex justify-end">
                                  <div className="bg-white w-fit p-3 text-black font-bold rounded-lg h-fit">
                                    {String(harga).slice(0, -3) + " "}K
                                  </div>
                                </div>
                              </div>
                              <div className="card-actions justify-end">
                                <button className="btn bg-[#603e21] text-white">
                                  Order Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-amber-600 hover:bg-amber-700 w-full p-2 rounded-lg text-white"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Kirim
                      </button>
                    </div>
                  ) : isiPopup === "berhasil" ? (
                    <>
                      <div className="text-black text-xl">
                        Berhasil Menambahkan data dengan id {id}
                      </div>
                    </>
                  ) : (
                    isiPopup === "error" && <>{isiError}</>
                  )}
                </>
              }
              namaButton={"Kembali"}
              onClose={() => {
                if (isiPopup === "input" || isiPopup === "error") {
                  setPopup(false);
                } else if (isiPopup === "input_gambar") {
                  setIsiPopup("input");
                } else if (isiPopup === "preview") {
                  setIsiPopup("input_gambar");
                } else if (isiPopup == "berhasil") {
                  setPopup(false);
                  setProdukUpdate(!produkUpdate);
                }
              }}
            />
          )}
        </>
      </div>
    </>
  );
};

export default TambahBarang;
