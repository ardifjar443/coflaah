import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Jumbotron = (props) => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const Rekomendasi = [
    {
      kopi: 1,
      image: "./img/kopi1.png",
      nama: "Signature Fix",
      harga: 28,
      deskripsi: "kopi susu gula aren  ",
    },
  ];
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };
  return (
    <>
      <div
        className=" min-h-screen bg-fixed bg-cover bg-transparent text-white text-3xl flex justify-center items-center"
        id="home"
      >
        <div className="grid grid-cols-1 gap-4  w-full lg:grid-cols-2 mt-28 lg:mt-0 ">
          <div className="  min-w-full flex justify-center items-center flex-col gap-5 animate__animated animate__backInLeft">
            <h1
              style={{ fontSize: "75px" }}
              className=" font-serif shadow-md font-bold"
            >
              Coflaah.
            </h1>
            <p className="p-5">
              “Hidup dapat diibaratkan seperti minum kopi suguhan. Terkadang,
              kita akan mendapatkan rasa pahit, terkadang kita juga mendapatkan
              rasa manis. Namun, hal itu akan membuat mata kita menjadi
              terbuka.”
            </p>
          </div>

          <div className=" flex justify-center items-center p-10 lg:p-20 min-h-screen animate__animated animate__bounceIn">
            <div className="container rounded-3xl  h-full">
              <h1 className="text-center font-bold p-2">Best Seller</h1>
              <Slider {...settings}>
                {Rekomendasi.map((items, index) => (
                  <div key={index}>
                    <div
                      style={{
                        backgroundImage: `url(${items.image})`,
                        backgroundSize: "cover",
                      }}
                      className="h-[35rem] p-2 rounded-3xl flex items-start "
                    >
                      <div className="bg-white text-black p-3 rounded-2xl shadow-2xl w-3/4 lg:w-1/2 md:1/2 ">
                        <div className="grid grid-cols-2 m-4  ">
                          <div className=" flex items-center">
                            <h1 className="text-2xl font-bold">{items.nama}</h1>
                          </div>
                          <div className="flex justify-end items-center ">
                            <div className="bg-yellow-800 p-2 rounded-lg text-white shadow-lg text-lg lg:text-2xl md:text-2xl">
                              {items.harga}K
                            </div>
                          </div>
                        </div>
                        <p className="text-lg  p-5">{items.deskripsi}</p>
                        <div className=" flex justify-end  h-full ">
                          <button
                            className="bg-yellow-800 hover:bg-yellow-900 text-white p-2 rounded-2xl shadow-lg h-16"
                            onClick={props.order}
                          >
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jumbotron;
