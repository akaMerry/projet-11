import { places } from "~/data/places.json";
// export type Place = { id: string; cover: string; title: string };
export type Place = (typeof places)[number];
