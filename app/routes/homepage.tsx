import { href, Link } from "react-router";
import banner_homepage from "~/assets/banner_homepage.jpg";
import { places } from "~/data/places.json";
import type { Place } from "~/types/types";

export function Banner({ src, tagline }: { src: string; tagline?: string }) {
  return (
    <div className="relative max-w-310 h-27.5 lg:h-55.5 mt-5 lg:mt-10 rounded-xl bg-black shadow-md ">
      <img
        className="w-full h-full rounded-xl object-cover opacity-55"
        src={src}
      />
      <div className="absolute inset-0 flex items-center max-w-65 md:max-w-full md:justify-center">
        <p className="font-bold text-white text-shadow-lg text-2xl lg:text-5xl text-left md:text-center p-4">
          {tagline}
        </p>
      </div>
    </div>
  );
}

function DisplayPlaces() {
  return (
    <div className="flex items-center justify-center mt-5 lg:mt-10 mb-5 lg:mb-10 lg:rounded-xl lg:bg-neutral-100">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-15 lg:p-12">
        {places.map((place) => (
          <PlaceCard place={place} />
        ))}
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      to={href("/places/:id", { id: place.id })}
      className="flex relative w-83.5 lg:w-85 h-63.5 lg:h-85 transition duration-300 ease-in-out hover:scale-105"
    >
      <img
        src={place.cover}
        className="absolute object-cover w-full h-full rounded-xl"
      />
      <div className="absolute w-83.5 lg:w-85 h-63.5 lg:h-85 bg-gradient-to-t from-black opacity-75 rounded-xl z-10"></div>
      <div className="absolute bottom-0 left-0 p-4 z-20">
        <p className=" font-bold text-white text-lg">{place.title}</p>
      </div>
    </Link>
  );
}

export default function Homepage() {
  return (
    <div id="homepage" className="w-full">
      <Banner src={banner_homepage} tagline="Chez vous, partout et ailleurs" />
      <DisplayPlaces />
      <div></div>
    </div>
  );
}
