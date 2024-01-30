import React from "react";
import "./style/Popup.css"; // Ganti dengan nama file CSS yang sesuai

const Popup = ({ content, onClose, namaButton }) => {
  return (
    <div className="popup-container ">
      <div className="bg-white p-5 rounded-3xl w-1/2 flex flex-col gap-5 animate__animated  animate__backInDown">
        {content}
        <button
          className="bg-amber-900 p-2 rounded-xl text-white hover:bg-amber-950"
          onClick={onClose}
        >
          {namaButton}
        </button>
      </div>
    </div>
  );
};

export default Popup;
