import React from "react";
import { useNavigate } from "react-router-dom";
import Trash from "../assets/img/delete.png";
import { formatDateDayEs } from "./ConfigAPI";

export const ActivityCard = (activity) => {
  const navigate = useNavigate();
  return (
    <div className="col" data-cy="activity-item">
      <div className=" item d-flex column justify-content-between">
        <div
          className="itembody"
          onClick={(e) => {
            navigate(`/detail/${activity.activity.id}`);
          }}
        >
          <h3 className="font-sm p-1" data-cy="activity-item-title">
            {activity.activity.title}
          </h3>
        </div>
        <div className="p-1 d-flex justify-content-between">
          <p className="font-s tanggal" data-cy="activity-item-date">
            {formatDateDayEs(activity.activity.created_at)}
          </p>
          <img
            data-cy="activity-item-delete-button"
            src={Trash}
            alt="trash"
            className="trash"
            onClick={(e) => activity.modal(activity.activity)}
          />
        </div>
      </div>
    </div>
  );
};
