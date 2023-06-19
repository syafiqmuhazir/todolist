import React from "react";
import empety from "../assets/img/activity-empty-state.svg";
import "../assets/css/empety.css";

export const ActivityEmpety = (tambah) => {
  return (
    <div className="container py-3" data-cy="activity-empty-state">
      <div className="hero  d-flex column">
        <img src={empety} alt="empety" className="iempety" />
        <div className="hero-content">
          <div className="card">
            <div className="card-empety d-flex justify-content-center align-items-center">
              <button
                className="btn btn-circle bg-primary"
                onClick={tambah.tambah}
              >
                <span className="plus light">&#43;</span>
              </button>
            </div>
            <div className="card-b"></div>
          </div>
          <p
            className="font-sm text-center py-1 medium text-empety"
            data-cy="activity-empty-title"
          >
            Buat activity pertamamu
          </p>
        </div>
      </div>
    </div>
  );
};
