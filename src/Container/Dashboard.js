import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../assets/css/index.css";
import axios from "axios";
import { API_URL } from "../Component/ConfigAPI";
import { ActivityCard } from "../Component/ActivityCard";
import { ActivityEmpety } from "../Component/ActivityEmpety";
import { ModalDelete } from "../Component/ModalDelete";
import { Alert } from "../Component/Alert";

function Dashboard() {
  const [activity, setActivity] = useState([]);
  const [detail, setDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [tambah, setTambah] = useState(0);
  const [button, setButton] = useState("+ Tambah");
  const [modal, setModal] = useState(false);
  const [textDelete, setTextDelete] = useState("Hapus");
  const [notif, setNotif] = useState(false);
  const [bg, setBg] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + "activity-groups?email=sapikm06%40gmail.com")
      .then((res) => {
        setActivity(res.data.data);
        setTotal(res.data.total);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [tambah]);

  const handleTambah = () => {
    setButton("Loading...");
    axios
      .post(API_URL + "activity-groups", {
        title: "Activity Baru",
        email: "sapikm06@gmail.com",
      })
      .then((ress) => {
        setTambah((oldKey) => oldKey + 1);
        setButton("+ Tambah");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hapusData = (e) => {
    setTextDelete("Loading...");
    axios
      .delete(API_URL + "activity-groups/" + e)
      .then((ress) => {
        setTambah((oldKey) => oldKey + 1);
        setTextDelete("Hapus");
        setModal(false);
        setTimeout(() => {
          setNotif(true);
        }, 30);
        setTimeout(() => {
          setNotif(false);
          setBg(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalOpen = (e) => {
    setBg(true);
    setModal(true);
    setDetail(e);
  };

  const closeModal = () => {
    setModal(false);
    setBg(false);
  };

  return (
    <>
      <Suspense fallback={<div></div>}>
        <div className="d-flex justify-content-center">
          <div className=" pnav">
            <div className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 data-cy="activity-title" className="font-l">
                  Activity
                </h1>
                <button
                  onClick={handleTambah}
                  data-cy="activity-add-button"
                  className="font-sm btn btn-prim bg-primary light"
                >
                  {button}
                </button>
              </div>
            </div>
          </div>
        </div>

        {total < 1 ? (
          <>
            <Helmet>
              <title>To Do List - Dashboard Empety</title>
            </Helmet>
            <ActivityEmpety tambah={handleTambah} />
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="content-dashboard py-2 row">
              <Helmet>
                <title>To Do List - Dashboard</title>
              </Helmet>
              {activity &&
                activity.map((activity, index) => (
                  <ActivityCard
                    modal={modalOpen}
                    activity={activity}
                    key={index}
                    index={index}
                  />
                ))}
            </div>
          </div>
        )}
        {bg ? (
          <>
            <div className="notif d-flex justify-content-center align-items-center">
              <div
                className="modalBackground"
                data-cy="modal-delete"
                onClick={() => closeModal()}
              ></div>

              {modal ? (
                <ModalDelete
                  detail={detail}
                  modal={closeModal}
                  hapus={hapusData}
                  text="activity"
                  button={textDelete}
                />
              ) : null}

              {notif ? <Alert text="Activity" /> : null}
            </div>
          </>
        ) : null}
      </Suspense>
    </>
  );
}
export default Dashboard;
