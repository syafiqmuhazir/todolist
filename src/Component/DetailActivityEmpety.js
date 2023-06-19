import React from "react";
import detail from "../assets/img/empety.svg";
import Detail from "../assets/img/mobileempety.svg";

export const DetailActivityEmpety = (tambah) => {
  return (
    <div
      className="d-flex column justify-content-center align-items-center py-3"
      data-cy="todo-empty-state"
      onClick={() => tambah.tambah(true)}
    >
      {window.innerWidth < 600 ? (
        <>
          <img src={Detail} alt="detail" className="detailempety" />
          <p className="font-l bold py-1 color-secondary">
            Buat List Item Kamu
          </p>
        </>
      ) : (
        <img src={detail} alt="detail" className="detailempety" />
      )}
    </div>
  );
};
