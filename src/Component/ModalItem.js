import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../assets/css/modal.css";
import { API_URL } from "./ConfigAPI";

export const ModalItem = (item) => {
  console.log(item);
  const [select, setSelect] = useState(false);
  const [dropdown, setDropdown] = useState(
    "dropdown d-flex align-items-center",
  );
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(item.priority);
  const [textSelect, setTextSelect] = useState("Very High");
  const [cssPriority, setCssPriority] = useState("indicator-vhigh");
  const navigate = useNavigate();

  useEffect(() => {
    switch (priority) {
      case "high":
        setTextSelect("High");
        setCssPriority("indicator-high");
        break;
      case "normal":
        setTextSelect("Medium");
        setCssPriority("indicator-medium");
        break;
      case "low":
        setTextSelect("Low");
        setCssPriority("indicator-low");
        break;
      case "very-low":
        setTextSelect("Very Low");
        setCssPriority("indicator-vlow");
        break;
      default:
        setTextSelect("Very High");
        setCssPriority("indicator-vhigh");
        break;
    }
  }, [priority]);

  const tambahItem = () => {
    if (item.text === "Edit") {
      const id = item.detail.id;
      axios
        .patch(API_URL + "todo-items/" + id, {
          title: input,
          is_active: item.detail.is_active,
          priority: priority,
        })
        .then((ress) => {
          item.tambah((oldKey) => oldKey + 1);
          item.edit(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/404");
        });
    } else {
      axios
        .post(API_URL + "todo-items", {
          activity_group_id: item.id,
          title: input,
          priority: priority,
        })
        .then((ress) => {
          item.tambah((oldKey) => oldKey + 1);
          item.tambahTodo(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/404");
        });
    }
  };

  const pilihPriority = (e) => {
    const pilih = e.target.getAttribute("data");
    setPriority(pilih);
    setSelect(false);
    setDropdown("dropdown d-flex align-items-center");
  };
  return (
    <div className="modal-add " data-cy="modal-add">
      <div className="modal-add-header d-flex justify-content-between align-items-center">
        <span className="font-sm semi-bold" data-cy="modal-add-title">
          {item.text} List Item
        </span>
        <span
          onClick={() => {
            item.tambahTodo(false);
          }}
          className="close"
          data-cy="modal-add-close-button"
        >
          &times;
        </span>
      </div>
      <div className="modal-add-content">
        <div className="form-input d-flex column">
          <label className="name-title" data-cy="modal-add-name-title">
            Nama List Item
          </label>
          <input
            type="text"
            className="input-add"
            id="name-title"
            data-cy="modal-add-name-input"
            placeholder="Tambahkan nama list item"
            defaultValue={item.text === "Edit" ? item.detail.title : null}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
        <div className="form-select d-flex column">
          <label className="priority-title" data-cy="modal-add-priority-title">
            Priority
          </label>
          <div
            className={
              select ? "select-add d-flex active" : "select-add d-flex"
            }
            data-cy="modal-add-priority-dropdown"
            onClick={(e) => {
              setSelect(true);
              setDropdown("active-dropdown d-flex align-items-center");
            }}
          >
            <div className="select-pilihan d-flex align-items-center">
              <div className={cssPriority}></div>
              <span className="px-1">{textSelect}</span>
            </div>
            <div className={dropdown}>
              <span>&lt;</span>
            </div>
          </div>
          {select ? (
            <div className="pilihan">
              <div
                className="option d-flex align-items-center "
                data-cy="modal-add-priority-item"
                data="very-high"
                onClick={(e) => pilihPriority(e)}
              >
                <div className="indicator-vhigh" data="very-high"></div>
                <span className="px-1" data="very-high">
                  Very High
                </span>
                {priority === "very-high" ? (
                  <span className="centang">&#10004;</span>
                ) : null}
              </div>
              <div
                className="option d-flex align-items-center"
                data-cy="modal-add-priority-item"
                data="high"
                onClick={(e) => pilihPriority(e)}
              >
                <div className="indicator-high" data="high"></div>
                <span className="px-1" data="high">
                  High
                </span>
                {priority === "high" ? (
                  <span className="centang">&#10004;</span>
                ) : null}
              </div>
              <div
                className="option d-flex align-items-center"
                data-cy="modal-add-priority-item"
                data="normal"
                onClick={(e) => pilihPriority(e)}
              >
                <div className="indicator-medium" data="normal"></div>
                <span className="px-1" data="normal">
                  Medium
                </span>
                {priority === "normal" ? (
                  <span className="centang">&#10004;</span>
                ) : null}
              </div>
              <div
                className="option d-flex align-items-center"
                data-cy="modal-add-priority-item"
                data="low"
                onClick={(e) => pilihPriority(e)}
              >
                <div className="indicator-low" data="low"></div>
                <span className="px-1" data="low">
                  Low
                </span>
                {priority === "low" ? (
                  <span className="centang">&#10004;</span>
                ) : null}
              </div>
              <div
                className="option d-flex align-items-center"
                data-cy="modal-add-priority-item"
                data="very-low"
                onClick={(e) => pilihPriority(e)}
              >
                <div className="indicator-vlow" data="very-low"></div>
                <span className="px-1" data="very-low">
                  Very Low
                </span>
                {priority === "very-low" ? (
                  <span className="centang">&#10004;</span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="modal-add-footer d-flex">
        {item.text === "Edit" || input.length > 0 ? (
          <button
            onClick={() => tambahItem()}
            data-cy="modal-add-save-button"
            className="btn btn-submit bg-primary light font-sm bold"
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            data-cy="modal-add-save-button"
            className=" btn btn-submit bg-primary light font-sm bold"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
