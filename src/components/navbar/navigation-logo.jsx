import { Link } from "react-router-dom";

export function Logo() {
  const text = "OG STORE".split("").map((letter, index) => {
    if (letter === " ")
      return (
        <span key={index} className="txt">
          &nbsp;
        </span>
      );
    return (
      <span key={index} className="txt">
        {letter}
      </span>
    );
  });
  return (
    <Link to="/" className="relative">
      <h1 className="nav flex items-center py-3 text-xl uppercase opacity-0">
        {text}
      </h1>
      <h1 className="nav absolute left-1/2 top-0 flex -translate-x-1/2 items-center py-3 text-xl uppercase">
        {/* OG STORE */}
        {text}
      </h1>
    </Link>
  );
}
