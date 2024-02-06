import { useEffect, useState } from "react";
import { loginAdmin, loginUser } from "./api/login.js";
import { useNavigate } from "react-router-dom";
import Popup from "./component/popup.jsx";
import { getDataUser, setDatauser } from "./api/dataUser.js";
import { userRegister } from "./api/register.js";

const Register = () => {
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(false);
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password_validation, setPassword_validation] = useState("");
  const [passwordSama, setPasswordSama] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [nama, setNama] = useState("");
  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordValidChange = (event) => {
    setPassword_validation(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleRegister = async () => {
    if (!passwordSama) {
      setPesan("Password anda tidak sama");
      setPopup(true);
    } else if (!emailValid) {
      setPesan("Email anda tidak valid");
      setPopup(true);
    } else if (
      username === "" ||
      password === "" ||
      email === "" ||
      nama === ""
    ) {
      setPesan("Tidak boleh ada kolom yang kosong");
      setPopup(true);
    } else {
      try {
        const data = await userRegister(username, password, email, nama);
        console.log(data);
        if (data.message) {
          setPesan(data.message);
          setPopup(true);
        } else if (data.error) {
          setPesan(data.error);
          setPopup(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    if (password != password_validation) {
      setPasswordSama(false);
    } else {
      setPasswordSama(true);
    }
  }, [password_validation]);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(email));
  }, [email]);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="bg-white p-5 rounded-xl shadow-md text-black flex flex-col gap-5 justify-center items-center w-1/2">
          <h1 className="text-3xl font-bold">Register</h1>
          {!emailValid && (
            <div
              role="alert"
              className="alert alert-warning  animate__animated animate__bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Email Tidak Valid</span>
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full  bg-white"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="text"
            placeholder="nama"
            className="input input-bordered w-full  bg-white"
            value={nama}
            onChange={handleNamaChange}
          />
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full  bg-white"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full  bg-white"
            value={password}
            onChange={handlePasswordChange}
          />
          {!passwordSama && (
            <div
              role="alert"
              className="alert alert-error animate__animated animate__bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Password Tidak sama</span>
            </div>
          )}
          <input
            type="password"
            placeholder="validation  Password"
            className="input input-bordered w-full  bg-white"
            value={password_validation}
            onChange={(e) => {
              handlePasswordValidChange(e);
            }}
          />
          <button
            className="p-2 rounded-xl text-white font-bold w-full bg-amber-900 hover:bg-amber-950 "
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="text-center">
          <p className="text-white text-lg">Udah Punya Akun ?</p>
          <button
            className="text-white text-lg font-bold hover:bg-yellow-900 p-2 rounded-lg hover:text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Sekarang{" "}
          </button>
        </div>
        {/* <div className="fixed bottom-10 right-10 bg-white rounded-xl flex flex-col p-2 text-black">
          <input
            type="checkbox"
            className="toggle bg-amber-600"
            checked={isAdmin}
            onChange={handleIsAdmin}
          />
          <span className="text-center">{isAdmin ? "admin" : "user"}</span>
        </div> */}
      </div>
      {popup && (
        <Popup
          content={
            <div className="text-center text-black font-bold text-2xl flex flex-col gap-5">
              {pesan}

              {pesan === "Login successful" && (
                <div className="bg-amber-600 rounded-lg p-3 text-white">
                  <div>Selamat Datang</div>
                  <div>{getDataUser().dataUser.name}</div>
                </div>
              )}
            </div>
          }
          namaButton={
            pesan === "Registrasi berhasil. Anda dapat login sekarang."
              ? "Lanjut Login"
              : "Kembali"
          }
          onClose={() => {
            pesan === "Registrasi berhasil. Anda dapat login sekarang."
              ? navigate("/login")
              : setPopup(false);
          }}
        />
      )}
    </>
  );
};

export default Register;
