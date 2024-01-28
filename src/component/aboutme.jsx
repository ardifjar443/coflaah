import { useEffect, useRef, useState } from "react";

const About = (props) => {
  // const [about, props.setAbout] = useState(true);
  // const [hilang, props.setHilang] = useState(false);

  return (
    <>
      <div
        className=" min-h-screen flex justify-center items-center  "
        id="order"
      >
        {props.about ? (
          <>
            <div
              className={`flex justify-center animate__animated ${
                props.hilang
                  ? "animate__fadeOutRight"
                  : props.about && "animate__fadeInLeft"
              }`}
            >
              <div className=" hidden  md:flex lg:flex  items-center">
                {props.hilang && (
                  <div className=" transform -rotate-90">
                    <img src="./img/y8.gif" alt="" />
                  </div>
                )}
              </div>
              <div
                className={`bg-white p-5 text-black w-3/4 lg:w-1/2 md:w-1/2 rounded-3xl shadow-xl  `}
              >
                <h1 className="text-3xl font-bold mb-5">About Us</h1>
                <p className="p-1 lg:p-10 md:p-10">
                  Kami sedang mengembangkan kopi yang memiliki rasa yang unik
                  dan tak terlupakan. Kopi ini akan dibuat dengan bahan-bahan
                  berkualitas tinggi, dan diproses dengan cara yang inovatif.
                </p>
              </div>
              <button
                className="text-white text-3xl p-3"
                onClick={() => {
                  props.setHilang(true);
                  setTimeout(() => {
                    props.setHilang(false);
                    props.setAbout(false);
                  }, 500);
                }}
              >
                Order here <i className="bi bi-arrow-bar-right"></i>
              </button>
            </div>
            {/* <div className=" hidden  md:flex lg:flex  items-center  w-96 justify-end ">
              {hilang && (
                <div className=" transform -rotate-90">
                  <img src="./img/portal.gif" className=" w-48" alt="" />
                </div>
              )}
            </div> */}
          </>
        ) : (
          <>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-center animate__animated gap-5 lg:gap-0 md:gap-0  ${
                props.hilang
                  ? "animate__fadeOutRight"
                  : !props.about && "animate__fadeInLeft"
              }`}
            >
              <div className="flex justify-center">
                <div className="bg-white p-5 text-black w-3/4  rounded-3xl shadow-xl">
                  <h1 className="text-3xl font-bold mb-5">Order Here :</h1>
                  <div className="flex flex-col m-10 gap-4">
                    <a
                      className="bg-green-400 hover:bg-green-500 p-4 text-center text-white text-3xl font-bold rounded-2xl shadow-lg"
                      href="https://api.whatsapp.com/send?phone=6283120685622"
                      target="__blank"
                    >
                      WhatsApp
                    </a>
                    <a
                      className="bg-gradient-to-r from-[#c92bb7] to-blue-500 hover:bg-amber-600 p-4 text-center text-white text-3xl font-bold rounded-2xl shadow-lg"
                      href="https://www.instagram.com/coflaah_/"
                      target="__blank"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-white w-1/2 p-5 text-center text-black rounded-xl ">
                  <h1 className="text-2xl font-bold">Keterangan : </h1>
                  <p className="text-start text-lg mt-5">
                    Untuk pengerjaan estimasi 1.5 jam setelah di order
                  </p>
                </div>
                <button
                  className="text-white text-3xl p-3"
                  onClick={() => {
                    props.setHilang(true);
                    setTimeout(() => {
                      props.setHilang(false);
                      props.setAbout(true);
                    }, 500);
                  }}
                >
                  About us<i className="bi bi-arrow-bar-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default About;
