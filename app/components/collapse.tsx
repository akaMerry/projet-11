import { useState, type ReactNode } from "react";
import chevronLeft from "~/assets/chevron_left.svg";

export function Collapse({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const [showMore, setShowMore] = useState(false);

  function handleMore() {
    setShowMore(!showMore);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <button
        className="group h-7.5 lg:h-13.5 cursor-pointer flex items-center justify-between p-2 lg:p-4 bg-red-400 rounded-md"
        onClick={handleMore}
        onKeyUp={handleMore}
        tabIndex={0}
      >
        <p className="font-semibold text-white text-xs lg:text-lg">{title}</p>
        <img
          className={
            showMore
              ? "h-full object-fit rotate-90 transitio duration-300"
              : "h-full object-fit -rotate-90 transition duration-300"
          }
          src={chevronLeft}
        />
      </button>

      <div
        className={
          showMore
            ? "lg:bg-neutral-50 transition-tansformation duration-300 opacity-100 h-full"
            : "lg:bg-neutral-50 transition-tansformation duration-300 opacity-0 h-0"
        }
      >
        <p
          className={
            showMore
              ? "transition-tansformation duration-300 p-5 text-xs lg:text-lg"
              : "transition-tansformation duration-300 hidden"
          }
        >
          {children}
        </p>
      </div>
    </div>
  );
}
