import React from "react";
import Icon from "../assets/img/modal-delete-icon.png";

export const ModalDelete = (detail) => {
  return (
    <>
      <div className="modalContainer d-flex column align-items-center">
        <img
          src={Icon}
          alt="icon-delete"
          className="icon-modal"
          data-cy="modal-icon-delete"
        />
        <div data-cy="modal-delete-title">
          <p className="title-delete font-sm text-center">
            Apakah anda yakin menghapus {detail.text}{" "}
          </p>
          <h2 className="font-sm  text-center">"{detail.detail.title}"?</h2>
        </div>
        <div className="w100 d-flex space-around footer-delete">
          <button
            onClick={() => detail.modal()}
            className="btn btn-normal bg-confirm font-sm semidark semi-bold"
            data-cy="modal-delete-cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={() => detail.hapus(detail.detail.id)}
            data-cy="modal-delete-confirm-button"
            className="btn btn-normal bg-red font-sm semi-bold light"
          >
            {detail.button}
          </button>
        </div>
      </div>
    </>
  );
};
