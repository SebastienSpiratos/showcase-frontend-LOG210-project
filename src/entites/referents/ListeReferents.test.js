import React from 'react';
import ReactDOM from 'react-dom';
import ListeReferents from './ListeReferents';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const listeReferentsTest = [
  {
    id: 1,
    nom: "Reférent",
    prenom: "1",
    titre: "Buddha",
    tel_cell: "321-765-4321",
    tel_bureau: "321-777-8888",
    fax: "+44 1-4569 3217",
    courriel: "referent1@test.com",
    rapport_fax: 1,
    rapport_courriel: 1,
    rapport_papier: 0
  },
  {
    id: 2,
    nom: "Reférent",
    prenom: "2",
    titre: "Le Grand Manitou",
    tel_cell: "243-765-3548",
    tel_bureau: "579-219-2341",
    fax: "+44 1-4569 2117",
    courriel: "referent2@test.com",
    rapport_fax: 0,
    rapport_courriel: 0,
    rapport_papier: 1
  }
]

const utilisateurCourantTest = {
  id: 1,
  nom: "directeur",
  courriel: "directeur@admin.com",
  role: {id: 1, fr:"directeur", en:"director"},
  actif: true
}

const baseProps = {
  messagesEntite: messagesFr.gererReferents,
  listeReferents: listeReferentsTest,
  langue: "fr",
  utilisateurCourant: utilisateurCourantTest
};

it('renders without crashing', () => {
  shallow(<ListeReferents {...baseProps}/>);
});
