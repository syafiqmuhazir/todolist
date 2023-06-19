import axios from "axios";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../Component/ConfigAPI";
import { DetailActivityEmpety } from "../Component/DetailActivityEmpety";
import gEdit from "../assets/img/edit.png";
import { TodoItem } from "../Component/TodoItem";
import { ModalItem } from "../Component/ModalItem";
import iTerbaru from "../assets/img/terbaru.svg";
import iTerlama from "../assets/img/terlama.svg";
import iZa from "../assets/img/za.svg";
import iAz from "../assets/img/az.svg";
import "../assets/css/index.css";

export default function DetailActivity() {
  const navigate = useNavigate();
  const [totalItem, setTotalItem] = useState(0);
  const [items, setItems] = useState([]);
  const [activity, setActivity] = useState([]);
  const [ubah, setUbah] = useState(false);
  const [title, setTitle] = useState("");
  const [tambah, setTambah] = useState(0);
  const [tambahTodo, setTambahTodo] = useState(false);
  const [sortItem, setSortItem] = useState("");
  const [sort, setSort] = useState(false);
  const [saved, setSaved] = useState([]);

  var { id } = useParams();

  useEffect(() => {
    //   activity
    axios
      .get(API_URL + "activity-groups/" + id)
      .then((ress) => {
        setActivity(ress.data);
        setTitle(ress.data.title);
        setItems(ress.data.todo_items);
        setTotalItem(ress.data.todo_items);
        setSaved(ress.data.todo_items);
        setSort(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tambah]);

  const editActivity = () => {
    setUbah(true);
  };

  const sortest = (e) => {
    setSort(false);
    setItems(saved);
    const getsort = e.target.getAttribute("data");
    setSortItem(getsort);
    switch (e.target.getAttribute("data")) {
      case "sort-az":
        const asc = [...items].sort(function (a, b) {
          var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setItems(asc);
        break;
      case "sort-za":
        const desc = [...items].sort(function (a, b) {
          var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase();
          if (nameA > nameB)
            //sort string descending
            return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        setItems(desc);
        break;
      case "sort-oldest":
        const terlama = [...items].sort(function (a, b) {
          var nameA = a.id,
            nameB = b.id;
          if (nameA < nameB)
            //sort string terlama
            return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setItems(terlama);
        break;
      case "sort-unfinished":
        const blm = [...items].sort(function (a, b) {
          var nameA = a.is_active,
            nameB = b.is_active;
          if (nameA > nameB)
            //sort string belum selesai
            return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        setItems(blm);
        break;
      default:
        const result = [...items].sort(function (a, b) {
          var nameA = a.id,
            nameB = b.id;
          if (nameA > nameB)
            //sort string terbaru
            return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        setItems(result);
        break;
    }
    console.log(items);
  };

  const updateTitle = (e) => {
    if (ubah && e.target.className !== "font-l editactivity") {
      setUbah(false);
      setTambah((oldKey) => oldKey + 1);
    }
    if (ubah) {
      axios
        .patch(API_URL + "activity-groups/" + id, { title: title })
        .then((ress) => {
          setActivity(ress.data);
        })
        .catch((err) => console.log(err));
    }
    if (sort) {
      setSort(false);
    }

    if (!ubah && e.target.className === "edit") {
      setUbah(true);
    }
  };

  return (
    <div onClick={(e) => updateTitle(e)}>
      <>
        <div className="d-flex justify-content-center">
          <div className="pnav">
            <div className="py-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center aktifitas">
                  <span
                    className="back"
                    data-cy="todo-back-button"
                    onClick={() => navigate("/")}
                  >
                    &lt;
                  </span>
                  {ubah ? (
                    <>
                      <input
                        className="font-l editactivity"
                        data-cy="todo-title"
                        type="text"
                        autoFocus
                        defaultValue={activity.title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                          updateTitle(event);
                        }}
                        onClick={(e) => updateTitle(e)}
                        onFocus={(event) => {
                          setTitle(event.target.value);
                          console.log(event);
                        }}
                      ></input>
                    </>
                  ) : (
                    <h1
                      data-cy="todo-title"
                      onClick={() => editActivity()}
                      className="font-l px-1"
                    >
                      {activity.title}
                    </h1>
                  )}
                  <img
                    onClick={() => editActivity()}
                    src={gEdit}
                    alt="edit"
                    className="edits"
                    data-cy="todo-title-edit-button"
                  />
                </div>
                <div className="d-flex align-items-center">
                  {totalItem < 1 ? null : (
                    <div className="sort-box">
                      <div
                        onClick={() => setSort(true)}
                        data-cy="todo-sort-button"
                        className="sort d-flex justify-content-center align-items-center"
                      >
                        <span className="sort-button">&#8645;</span>
                      </div>
                      {sort ? (
                        <div className="sort-container" data-cy="sort-parent">
                          <div
                            className="sort-content "
                            data-cy="sort-selection"
                          >
                            <div
                              className="insort"
                              data="sort-latest"
                              onClick={(e) => sortest(e)}
                            ></div>
                            <img
                              src={iTerbaru}
                              alt="iterbaru"
                              className="isort"
                            />
                            <span className="text-sort font-xm ml-1">
                              Terbaru
                            </span>
                            {sortItem === "sort-latest" ? (
                              <span className="centang">&#10004;</span>
                            ) : null}
                          </div>
                          <div className="sort-content">
                            <div
                              className="insort"
                              data-cy="sort-selection"
                              data="sort-oldest"
                              onClick={(e) => sortest(e)}
                            ></div>
                            <img
                              src={iTerlama}
                              alt="iterlama"
                              className="isort"
                            />
                            <span className="text-sort font-xm ml-1">
                              Terlama
                            </span>
                            {sortItem === "sort-oldest" ? (
                              <span className="centang">&#10004;</span>
                            ) : null}
                          </div>
                          <div className="sort-content">
                            <div
                              className="insort"
                              data-cy="sort-selection"
                              data="sort-az"
                              onClick={(e) => sortest(e)}
                            ></div>
                            <img src={iAz} alt="iaz" className="isort" />
                            <span className="text-sort font-xm ml-1">A-Z</span>
                            {sortItem === "sort-az" ? (
                              <span className="centang">&#10004;</span>
                            ) : null}
                          </div>
                          <div className="sort-content">
                            <div
                              data-cy="sort-selection"
                              className="insort"
                              data="sort-za"
                              onClick={(e) => sortest(e)}
                            ></div>
                            <img src={iZa} alt="iza" className="isort" />
                            <span className="text-sort font-xm ml-1">Z-A</span>
                            {sortItem === "sort-za" ? (
                              <span className="centang">&#10004;</span>
                            ) : null}
                          </div>
                          <div className="sort-content">
                            <div
                              className="insort"
                              data="sort-unfinished"
                              data-cy="sort-selection"
                              onClick={(e) => sortest(e)}
                            ></div>
                            <span className="blmselesai">&#8645;</span>
                            <span className="text-sort font-xm ml-1">
                              Belum Selesai
                            </span>
                            {sortItem === "sort-unfinished" ? (
                              <span className="centang">&#10004;</span>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                  <button
                    onClick={() => setTambahTodo(true)}
                    data-cy="todo-add-button"
                    className="font-sm btn btn-prim bg-primary light"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {totalItem < 1 ? (
        <>
          <Helmet>
            <title>To Do List - Detail Kosong</title>
          </Helmet>
          <DetailActivityEmpety tambah={setTambahTodo} />
        </>
      ) : (
        <>
          <Helmet>
            <title>To Do List - Detail</title>
          </Helmet>
          <div className="d-flex justify-content-center">
            <div className="content-item py-2">
              {items.map((item, index) => (
                <TodoItem
                  items={item}
                  key={index}
                  index={index}
                  tambah={setTambah}
                  class={
                    item.priority === "high"
                      ? "indicator-high"
                      : item.priority === "very-high"
                      ? "indicator-vhigh"
                      : item.priority === "normal"
                      ? "indicator-medium"
                      : item.priority === "low"
                      ? "indicator-low"
                      : "indicator-vlow"
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}

      {tambahTodo ? (
        <>
          <div className="notif d-flex justify-content-center align-items-center">
            <div
              className="modalBackground"
              onClick={() => setTambahTodo(false)}
            ></div>
            <ModalItem
              text={"Tambah"}
              tambah={setTambah}
              tambahTodo={setTambahTodo}
              priority={"very-high"}
              id={id}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
