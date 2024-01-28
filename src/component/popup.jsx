import React from "react";
import "./style/Popup.css"; // Ganti dengan nama file CSS yang sesuai

const Popup = ({ content, onClose, namaButton }) => {
  return (
    <div className="popup-container animate__animated  animate__backInDown">
      <div className="popup-content flex flex-col gap-5">
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
