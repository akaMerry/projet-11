import bannerAbout from "~/assets/banner_about.jpg";
import { Banner } from "./homepage";
import { Collapse } from "./place-details";

export default function About() {
  return (
    <div id="about" className="min-w-full">
      <Banner src={bannerAbout} />
      <div className="flex min-w-full justify-center">
        <div className="grid grid-cols-1 w-full gap-5 lg:gap-10 max-w-256 mb-5 lg:mb-10 mt-5 lg:mt-10">
          <Collapse
            title="Fiabilité"
            content="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes au logement, et toutes les informations sont régulièrement vérifiées par nos équipes."
          />
          <Collapse
            title="Respect"
            content="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
          />
          <Collapse
            title="Service"
            content="La qualité du service est au coeur de notre engagement chez Kasa. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance."
          />
          <Collapse
            title="Sécurité"
            content="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes."
          />
        </div>
      </div>
    </div>
  );
}
