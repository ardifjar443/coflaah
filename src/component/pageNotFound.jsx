import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="bg-white rounded-2xl p-2 flex flex-col justify-center items-center">
          <img src="./img/505.png" alt="" className="w-1/2" />
          <h1 className="text-4xl font-bold text-black ">
            Halaman Tidak Ditemukan
          </h1>
        </div>
        <button
          className="bg-amber-900 hover:bg-amber-950 rounded-xl p-3 mt-10 text-white text-2xl font-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          Kembali Ke Halaman Utama
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
