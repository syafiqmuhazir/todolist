import React from "react";
import AlertIcon from "../assets/img/notif.png";

export const Alert = (text) => {
  return (
    <div
      data-cy="modal-information"
      className="notifcontainer d-flex align-items-center px-2"
    >
      <img src={AlertIcon} alt="alert" data-cy="modal-information-icon" />
      <p className="font-s px-1" data-cy="modal-information-title">
        {" "}
        {text.text} berhasil dihapus
      </p>
    </div>
  );
};
