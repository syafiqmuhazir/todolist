import React, { useEffect, useState } from "react";
import itemEdit from "../assets/img/edit.png";
import Trash from "../assets/img/delete.png";
import axios from "axios";
import { API_URL } from "./ConfigAPI";
import { ModalDelete } from "../Component/ModalDelete";
import { Alert } from "../Component/Alert";
import { ModalItem } from "./ModalItem";
import { useNavigate } from "react-router";

export const TodoItem = (items) => {
  const [notif, setNotif] = useState(false);
  const [bg, setBg] = useState(false);
  const [modal, setModal] = useState(false);
  const [textDelete, setTextDelete] = useState("Hapus");
  const [detail, setDetail] = useState([]);
  const [editItem, setEditItem] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleHapus = (e) => {
    setTextDelete("Loading...");
    axios
      .delete(API_URL + "todo-items/" + e)
      .then((ress) => {
        items.tambah((oldKey) => oldKey + 1);
        setTextDelete("Hapus");
        setModal(false);
        setTimeout(() => {
          setNotif(true);
        }, 30);
        setTimeout(() => {
          setNotif(false);
          setBg(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (items.items.is_active > 0) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [check]);
  const modalOpen = (e) => {
    setBg(true);
    setModal(true);
    setDetail(e);
  };

  const closeModal = () => {
    setModal(false);
    setBg(false);
  };

  const handleCheckbox = (e) => {
    setCheck(e);
    if (items.items.is_active === 1) {
      axios
        .patch(API_URL + "todo-items/" + items.items.id, {
          title: items.items.title,
          is_active: 0,
          priority: items.items.priority,
        })
        .then((ress) => {
          items.tambah((oldKey) => oldKey + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(API_URL + "todo-items/" + items.items.id, {
          title: items.items.title,
          is_active: 1,
          priority: items.items.priority,
        })
        .then((ress) => {
          items.tambah((oldKey) => oldKey + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="todoItem d-flex align-items-center" data-cy="todo-item">
        <div className="content-kiri d-flex align-items-center">
          {items.items.is_active > 0 || !check ? (
            <input
              onClick={(e) => handleCheckbox(e.target.checked)}
              type="checkbox"
              className="checkbox"
              data-cy="todo-item-checkbox"
            ></input>
          ) : (
            <input
              onClick={(e) => handleCheckbox(e.target.checked)}
              type="checkbox"
              checked
              className="checkbox"
              data-cy="todo-item-checkbox"
            ></input>
          )}

          <div
            className={items.class + " ml-1"}
            data-cy="todo-item-priority-indicator"
          ></div>
          <p
            className={
              items.items.is_active === 1
                ? "item-title ml-1 font-sm"
                : "item-title-off ml-1 font-sm"
            }
            data-cy="todo-item-title"
          >
            {items.items.title}
          </p>
          <img
            onClick={() => setEditItem(true)}
            src={itemEdit}
            alt="edit"
            className="ml-1 itemEdit"
          ></img>
        </div>
        <div className="d-flex content-kanan">
          <img
            src={Trash}
            alt="trash"
            onClick={() => modalOpen(items.items)}
            className="itemHapus"
            data-cy="todo-item-delete-button"
          ></img>
        </div>
      </div>
      {bg ? (
        <div className="notif d-flex justify-content-center align-items-center">
          <div
            className="modalBackground"
            onClick={() => closeModal()}
            data-cy="modal-delete"
          ></div>
          {modal ? (
            <ModalDelete
              detail={detail}
              modal={closeModal}
              hapus={handleHapus}
              text="List Item"
              button={textDelete}
            />
          ) : null}

          {notif ? <Alert text="List Item" /> : null}
        </div>
      ) : null}

      {editItem ? (
        <div className="notif d-flex justify-content-center align-items-center">
          <div
            className="modalBackground"
            onClick={() => setEditItem(false)}
          ></div>
          <ModalItem
            text={"Edit"}
            tambah={items.tambah}
            tambahTodo={setEditItem}
            detail={items.items}
            priority={items.items.priority}
          />
        </div>
      ) : null}
    </div>
  );
};
