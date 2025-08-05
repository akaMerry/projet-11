import type { Route } from "./+types/place-details";
import { useState } from "react";
import { places } from "~/data/places.json";
import type { Place } from "~/types/types";
import chevronRight from "~/assets/chevron_right.svg";
import chevronLeft from "~/assets/chevron_left.svg";
import star from "~/assets/star.svg";
import starInactive from "~/assets/star-inactive.svg";

function Gallery({ place }: { place: Place }) {
  const [index, setIndex] = useState(0);

  const pictures = place.pictures;

  function handleNextClick() {
    setIndex((index + 1) % pictures.length);
  }

  function handlePreviousClick() {
    setIndex((index - 1 + pictures.length) % pictures.length);
  }

  let url = pictures[index];

  return (
    <div className="relative w-full max-w-310 h-64 lg:h-104 mt-5 lg:mt-10 rounded-3xl">
      <img
        className="w-full h-full rounded-3xl object-cover"
        src={url}
        alt={"Galerie de photos : " + place.title}
      />
      {pictures.length === 1 ? null : (
        <div className="absolute inset-0 flex items-center max-w-full justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-items-center w-full h-full p-4 z-20">
            <div className="flex col-span-1 flex-start min-h-full w-full items-center justify-start">
              <button
                className="flex cursor-pointer justify-start"
                onClick={handlePreviousClick}
                tabIndex={0}
              >
                <img className="w-1/3 md:w-1/2 lg:w-full" src={chevronLeft} />
              </button>
            </div>
            <div className="hidden lg:flex col-span-1 min-h-full items-end">
              <p className="text-white lg:text-shadow-lg text-xl text-center">
                {index + 1}/{pictures.length}
              </p>
            </div>
            <div className="flex col-span-1 flex-start min-h-full w-full items-center justify-end">
              <button
                className="flex cursor-pointer justify-end"
                onClick={handleNextClick}
                tabIndex={0}
              >
                <img className="w-1/3 md:w-1/2 lg:w-full" src={chevronRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Title({ place }: { place: Place }) {
  return (
    <div className="w-full max-w-310 h-full">
      <h1 className="text-lg lg:text-4xl text-red-400 font-medium">
        {place.title}
      </h1>
      <h2 className="pt-1 text-sm lg:text-lg font-medium">{place.location}</h2>
    </div>
  );
}

function Tags({ place }: { place: Place }) {
  const tags = place.tags;
  return (
    <div className="w-full h-fit max-w-310 flex flex-row flex-wrap lg:mt-2">
      {tags.map((tag) => (
        <div className="flex col-span-1 h-4.5 lg:h-6.5 min-w-21 lg:min-w-29 max-w-fit mr-2 bg-red-400 items-center justify-center rounded-md lg:rounded-xl lg:mt-0">
          <p className="text-[10px] lg:text-sm font-semibold text-white pl-4 pr-4">
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
}

function Host({ place }: { place: Place }) {
  return (
    <div className="flex w-fit gap-2 items-center">
      <div className="flex">
        <p className="text-red-400 font-medium text-xs lg:text-lg text-right wrap-break-word max-x-23.5">
          {place.host.name}
        </p>
      </div>
      <div className="flex h-8 lg:h-16 w-8 lg:w-16 rounded-full">
        <img
          className="object-cover w-full h-full rounded-full"
          src={place.host.picture}
        ></img>
      </div>
    </div>
  );
}

function Rating({ place }: { place: Place }) {
  let rate = [1, 2, 3, 4, 5];
  let rating = parseInt(place.rating);
  return (
    <div className="grid grid-cols-5 items-center gap-1 lg:gap-0 lg:justify-items-end">
      {rate.map((r) => (
        <img
          className="h-3 lg:h-6"
          src={r <= rating ? star : starInactive}
          alt={"note " + place.rating + "/5"}
        />
      ))}
    </div>
  );
}

export function Collapse({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  const [showMore, setShowMore] = useState(false);

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <button
        className="h-7.5 lg:h-13.5 cursor-pointer flex items-center justify-between p-2 lg:p-4 bg-red-400 rounded-md"
        onClick={handleMoreClick}
        tabIndex={0}
      >
        <p className="font-semibold text-white text-xs lg:text-lg">{title}</p>
        <img
          className={
            showMore
              ? "h-full object-fit rotate-90 transition"
              : "h-full object-fit -rotate-90 transition"
          }
          src={chevronLeft}
        />
      </button>

      {showMore && (
        <div className="lg:bg-neutral-50 h-full p-5">
          <div className="grid">
            <p className="text-xs lg:text-lg">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Details(props: Route.ComponentProps) {
  // thisPlace est le lieu qui correspond à l'id affichée dans l'URL
  const thisPlace = places.find((p) => p.id === props.params.id);
  return (
    <div id="details" className="min-w-full">
      <Gallery place={thisPlace} />
      <div className="flex flex-col lg:flex-row justify-between mt-5 mb-5">
        <div className="flex w-fit h-fit flex-col">
          <Title place={thisPlace} />
          <Tags place={thisPlace} />
        </div>
        <div className="flex flex-row-reverse lg:flex-col justify-between mt-2">
          <Host place={thisPlace} />
          <Rating place={thisPlace} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5 lg:mb-10">
        <div className="h-full">
          <Collapse title={"Description"} content={thisPlace?.description} />
        </div>
        <div className="h-full">
          <Collapse title={"Équipements"} content={thisPlace?.equipments} />
        </div>
      </div>
    </div>
  );
}
