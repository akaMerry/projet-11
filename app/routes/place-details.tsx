import type { Route } from "./+types/place-details";
import { redirect } from "react-router";
import { useState } from "react";
import { places } from "~/data/places.json";
import { Collapse } from "../components/collapse";
import chevronRight from "~/assets/chevron_right.svg";
import chevronLeft from "~/assets/chevron_left.svg";
import star from "~/assets/star.svg";
import starInactive from "~/assets/star-inactive.svg";

function Gallery({ pictures }: { pictures: string[] }) {
  const [index, setIndex] = useState(0);

  function handleNext() {
    setIndex((index + 1) % pictures.length);
  }

  function handlePrevious() {
    setIndex((index - 1 + pictures.length) % pictures.length);
  }

  let url = pictures[index];

  return (
    <div className="relative w-full max-w-310 h-64 lg:h-104 mt-5 lg:mt-10 rounded-3xl">
      <img
        className="w-full h-full rounded-3xl object-cover"
        src={url}
        alt={"Galerie de photos"}
      />
      {pictures.length === 1 ? null : (
        <div className="absolute inset-0 flex items-center max-w-full justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-items-center w-full h-full p-4 z-20">
            <div className="flex col-span-1 flex-start h-full w-full items-center justify-start">
              <button
                className="flex cursor-pointer justify-start opacity-75 transition duration-300 ease-in-out hover:scale-110 hover:opacity-100"
                onClick={handlePrevious}
                onKeyUp={handlePrevious}
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
                className="flex cursor-pointer justify-end opacity-75 transition duration-300 ease-in-out hover:scale-110 hover:opacity-100"
                onClick={handleNext}
                onKeyUp={handleNext}
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

function Title({ h1, h2 }: { h1: string; h2: string }) {
  return (
    <div className="w-full max-w-310 h-full">
      <h1 className="text-lg lg:text-4xl text-red-400 font-medium">{h1}</h1>
      <h2 className="pt-1 text-sm lg:text-lg font-medium">{h2}</h2>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
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

function Host({ name, picture }: { name: string; picture: string }) {
  return (
    <div className="flex w-fit gap-2 items-center">
      <div className="flex">
        <p className="text-red-400 font-medium text-xs lg:text-lg text-right wrap-break-word max-x-23.5">
          {name}
        </p>
      </div>
      <div className="flex h-8 lg:h-16 w-8 lg:w-16 rounded-full">
        <img
          className="object-cover w-full h-full rounded-full"
          src={picture}
        ></img>
      </div>
    </div>
  );
}

function Rating({ rating }: { rating: string }) {
  let rate = [1, 2, 3, 4, 5];
  let parseRating = parseInt(rating);
  return (
    <div className="grid grid-cols-5 items-center gap-1 lg:gap-0 lg:justify-items-end">
      {rate.map((r) => (
        <img
          className="h-3 lg:h-6"
          src={r <= parseRating ? star : starInactive}
          key={`rating-star-${r}`}
        />
      ))}
    </div>
  );
}

export function loader(props: Route.ComponentProps) {
  // thisPlace est le lieu qui correspond à l'id affichée dans l'URL
  let thisPlace = places.find((p) => p.id === props.params.id);

  // si l'id ne correspond à rien, l'utilisateur est redirigé vers la page d'erreur
  if (!thisPlace) {
    throw redirect("/error");
  }
  return thisPlace;
}

export default function Details({ loaderData }: Route.ComponentProps) {
  const thisPlace = loaderData;
  // ci-dessous, une alternative au loader côté client :
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!thisPlace) {
  //     navigate(href("/error"));
  //   }
  // }, [thisPlace]);

  return (
    <div id="details" className="min-w-full">
      <Gallery pictures={thisPlace.pictures} />
      <div className="flex flex-col md:flex-row justify-between mt-5 mb-5">
        <div className="flex w-fit h-fit flex-col">
          <Title h1={thisPlace.title} h2={thisPlace.location} />
          <Tags tags={thisPlace.tags} />
        </div>
        <div className="flex flex-row-reverse md:flex-col justify-between mt-2">
          <Host name={thisPlace.host.name} picture={thisPlace.host.picture} />
          <Rating rating={thisPlace.rating} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5 lg:mb-10">
        <div className="h-full">
          <Collapse title={"Description"}>{thisPlace.description}</Collapse>
        </div>
        <div className="h-full">
          <Collapse title={"Équipements"}>
            <ul>
              {thisPlace.equipments.map((eq) => (
                <li className="list-none">{eq}</li>
              ))}
            </ul>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
