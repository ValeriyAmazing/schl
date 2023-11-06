import { useState } from "react";
import style from "./Sidebar.module.css";

function Sidebar({ lessons, toggler }) {
  return (
    <div className={`${style.list}`}>
      <h2 className={style.title}>JavaScript</h2>
      {lessons.map((lesson) => {
        return (
          <div
            className={`${style.item} ${lesson.isOpened ? style.active : ''}`}
            key={lesson.id}
            onClick={() => {
              toggler(lesson.id);
              console.log(lesson);
            }}
          >
            {lesson.title}
          </div>
        );
      })}
    </div>
  );
}
export { Sidebar };
