import React from 'react';
import ReactDOM from 'react-dom';
import ModaleUtilisateurs from './ModaleUtilisateurs';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const listeUtilisateursTest = [
  {
    id: 1,
    nom: "directeur",
    courriel: "directeur@admin.com",
    role: {id: 1, fr:"directeur", en:"director"},
    estActif: 1
  },
  {
    id: 2,
    nom: "coordonnateur",
    courriel: "coordonnateur@admin.com",
    role: {id: 2, fr:"coordonnateur", en:"coordinator"},
    estActif: 1
  },
  {
    id: 3,
    nom: "intervenant",
    courriel: "intervenant@admin.com",
    role: {id: 3, fr:"intervenant", en:"speaker"},
    estActif: 1
  },
  {
    id: 4,
    nom: "employe",
    courriel: "employe@admin.com",
    role: {id: 4, fr:"employe", en:"employee"},
    estActif: 1
  },
];

const baseProps = {
  messagesEntite: messagesFr.gererUtilisateurs,
  messagesCommuns: messagesFr.commun,
  langue: "fr",
  utilisateurAModifier: "",
  getListeUtilisateurs: listeUtilisateursTest,
  utilisateurCourant: {
      id: 1,
      nom: "directeur",
      courriel: "directeur@admin.com",
      role: {id: 1, fr:"directeur", en:"director"},
      estActif: 1
  }
};

it('renders without crashing', () => {
  shallow(<ModaleUtilisateurs {...baseProps}/>);
});
