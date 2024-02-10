import Product from "./component/product";
import { useEffect, useState } from "react";

import Jumbotron from "./component/jumbtron";
import About from "./component/aboutme";
import { getDataUser } from "./api/dataUser";
import Homeadmin from "./homeAdmin.jsx";

const Home = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(getDataUser());
  }, [getDataUser()]);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [about, setAbout] = useState(true);
  const [hilang, setHilang] = useState(false);

  const order = () => {
    // Mengarahkan ke elemen dengan id "contoh"
    const contohElement = document.getElementById("product");

    if (contohElement) {
      contohElement.scrollIntoView({ behavior: "smooth" });
    }
    if (about == true) {
      setHilang(true);
      setTimeout(() => {
        setHilang(false);
        setAbout(false);
      }, 500);
    }
  };
  const toAbout = () => {
    // Mengarahkan ke elemen dengan id "contoh"
    const contohElement = document.getElementById("order");

    if (contohElement) {
      contohElement.scrollIntoView({ behavior: "smooth" });
    }
    if (about == false) {
      setHilang(true);
      setTimeout(() => {
        setHilang(false);
        setAbout(true);
      }, 500);
    }
  };
  const view = (kopi) => {
    // Mengarahkan ke elemen dengan id "contoh"
    const contohElement = document.getElementById(kopi);

    if (contohElement) {
      contohElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const view2 = (ke) => {
    // Mengarahkan ke elemen dengan id "contoh"
    const contohElement = document.getElementById(ke);

    if (contohElement) {
      contohElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {userData ? (
        userData.tipeUser === "user" ? (
          <>
            <Jumbotron order={order} />
            <Product order={order} />
            <About
              about={about}
              setAbout={setAbout}
              hilang={hilang}
              setHilang={setHilang}
            />
          </>
        ) : (
          <Homeadmin />
        )
      ) : (
        <>
          <Jumbotron order={order} />
          <Product order={order} />
          <About
            about={about}
            setAbout={setAbout}
            hilang={hilang}
            setHilang={setHilang}
          />
        </>
      )}
    </>
  );
};

export default Home;
