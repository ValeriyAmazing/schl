import style from "./Lessons.module.css";
function Lessons({ lessons }) {
  return (
    <div className={style.lesson}>
      {lessons.map((l) => {
        return l.isOpened ? <l.Lesson key={l.id} className={style.item}/> : '';
      })}
    </div>
  );
}
export { Lessons };
