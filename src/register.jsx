import { useState } from "react";
import { loginAdmin, loginUser } from "./api/login.js";
import { useNavigate } from "react-router-dom";
import Popup from "./component/popup.jsx";
import { getDataUser, setDatauser } from "./api/dataUser.js";

const Register = () => {
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(false);
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password_validation, setPassword_validation] = useState("");
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

  const handleLogin = async () => {
    if (isAdmin) {
      try {
        const data = await loginAdmin(username, password);

        if (data.message) {
          // Jika login berhasil, set pesan ke state dan navigasikan ke halaman baru
          setPesan(data.message);
          setPopup(true);
          setDatauser(data);
        } else if (data.error) {
          // Jika login gagal, set pesan error ke state
          setPesan(data.error);
          setPopup(true);
        }
      } catch (error) {
        // Handle error, misalnya tampilkan pesan error ke pengguna
        console.error("Login error:", error.message);
      }
    } else {
      try {
        const data = await loginUser(username, password);

        if (data.message) {
          // Jika login berhasil, set pesan ke state dan navigasikan ke halaman baru
          setPesan(data.message);
          setPopup(true);
          setDatauser(data);
        } else if (data.error) {
          // Jika login gagal, set pesan error ke state
          setPesan(data.error);
          setPopup(true);
        }
      } catch (error) {
        // Handle error, misalnya tampilkan pesan error ke pengguna
        console.error("Login error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-5 rounded-xl shadow-md text-black flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs bg-white"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs bg-white"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs bg-white"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs bg-white"
            value={password_validation}
            onChange={handlePasswordValidChange}
          />
          <button
            className="p-2 rounded-xl text-white font-bold w-full bg-amber-900 hover:bg-amber-950 "
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="fixed bottom-10 right-10 bg-white rounded-xl flex flex-col p-2 text-black">
          <input
            type="checkbox"
            className="toggle bg-amber-600"
            checked={isAdmin}
            onChange={handleIsAdmin}
          />
          <span className="text-center">{isAdmin ? "admin" : "user"}</span>
        </div>
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
            pesan === "Login successful" ? "Lanjut Ke Menu Utama" : "Kembali"
          }
          onClose={() => {
            pesan === "Login successful" ? navigate("/") : setPopup(false);
          }}
        />
      )}
    </>
  );
};

export default Register;
