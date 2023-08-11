/* eslint-disable global-require */

import type { WorksData } from './worksList';

const worksData: WorksData = [
  {
    title: 'FishEye',
    description:
      'Site web pour photographes freelances, il a été conçu en respectant les critères d’accessibilité conforment aux  WCAG. La page du photographe est générée dynamiquement grâce à JavaScript, en fonction du photographe sélectionné sur la page d’accueil. Les travaux du photographe sont affichés dans une galerie de miniatures, et peuvent être visualisés individuellement (photographie ou vidéo) dans une lightbox contenant un slider. Un système de like permet d’évaluer le cliché.',
    picture: require('../assets/pictures/FishEye.png'),
    skills: {
      markup: ['HTML', 'accessibilité'],
      script: ['JavaScript ES6+'],
      style: ['CSS'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'Les petits plats',
    description:
      'Ce site de recettes de cuisine, devait disposer d’un algorithme de recherche performant. Un champ texte et un système de tags sont utilisés pour réaliser la recherche, les deux pouvant se combiner. Deux algorithmes différents ont été créés et comparés grâce à jsben.ch. L’affichage des fiches recettes et des listes de tags est instantanément mis à jour en fonction du critère de recherche. Le design a été réalisé avec Bootstrap et sa conception responsive assure une utilisation sur smartphone et tablette sans perte de qualité.',
    picture: require('../assets/pictures/les_petits_plats.png'),
    skills: {
      markup: ['HTML'],
      script: ['JavaScript ES6+'],
      style: ['CSS', 'Bootstrap', 'Responsive design'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'SportSee',
    description:
      'SportSee propose un tableau de bord graphique d’analyse de performance à des utilisateurs recourant au coaching sportif. Les données extraites du back-End via une API, sont restituées sous-formes de graphiques en utilisant React et la bibliothèque Recharts. La page utilisateur se compose de 4 graphiques,  2 d’entre eux retracent un historique et disposent de tooltips animés. 4 cartes de données clés viennent complètent les graphiques. Pour faciliter l’appropration du code, celui-ci est entièrement documenté.',
    picture: require('../assets/pictures/sport_see.png'),
    skills: {
      script: ['React', 'Recharts', 'API REST'],
      style: ['Modules CSS'],
      support: ['GitHub', 'JSDoc'],
    },
    links: [],
  },
  {
    title: 'Kasa',
    description:
      'L’application web Kasa s’adresse aux particuliers désireux de louer leurs appartements. Développée avec React, elle propose des composants évolués tels que des cartes pour afficher un apperçu des locations, des collapses pour dérouler ou masquer des informations, un slider pour faire défiler les photos des appartements. Elle dispose d’une page d’accueil, d’une page appartement dont le contenu est créé dynamiquement, d’une page à propos et d’une page d’erreur. La navigation est confiée à React Router.',
    picture: require('../assets/pictures/kasa.png'),
    skills: {
      script: ['React', 'React Router'],
      style: ['modules CSS', 'Responsive design'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'ohmyfood',
    description: 'Site de réservation caractérisé par des animations réalisées avec CSS',
    skills: {
      markup: ['HTML'],
      style: ['Animations CSS', 'Sass', 'Responsive design'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'GameOn',
    description: 'Validation de formulaire',
    skills: {
      markup: ['HTML'],
      script: ['JavaScript'],
      style: ['CSS'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'Billed',
    description: "Débuggage et tests d'une application RH",
    skills: {
      script: ['JavaScript'],
      test: ['Jest', 'Testing Library'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'ARGENT BANK',
    description: '',
    skills: {
      script: ['React', 'React Router', 'Redux', 'API Rest'],
      style: ['Modules CSS'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'Plugin React Data Table',
    description:
      "Plugin React pour créer une table de données intégrant des fonctions de tri multicritères, de filtrage, de pagination et d'affichage d'informations.",
    skills: {
      script: ['React', 'plugin npm'],
      style: ['Modules CSS'],
      support: ['GitHub'],
    },
    links: [],
  },
  {
    title: 'Sasu',
    description: "Site vitrine de Sasu. Un lien propose l'accès à la maquette Figma.",
    skills: {
      script: ['React', 'TypeScript', 'Node.js'],
      style: ['Modules CSS'],
      support: ['GitHub'],
    },
    links: [],
  },
];

export default worksData;
