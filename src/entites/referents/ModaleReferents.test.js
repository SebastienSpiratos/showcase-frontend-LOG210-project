import React from 'react';
import ReactDOM from 'react-dom';
import ModaleReferents from './ModaleReferents';
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

const orgReferentTest = {
  id: 1,
  nom: "Org Ref 1",
  noCivique: "111",
  rue: "Beauchemin",
  ville: "Montreal",
  province: "Qc",
  codePostal: "J5F 2H7",
  telephone: "123-765-4321",
  telBureau: "123-777-8888",
  courriel: "orgRef1@test.com",
  fax: "+44 1-2222 8888",
  siteWeb: "www.orgRef1.com",
  estActif: 1,
  organisme: {
    id: 2,
    nom: "Télétubbies",
    adresse: "Planète Mars",
    telephone: "(123) 765-4321",
    courriel: "tinkywinky@teletubies.io",
    fax: "+44 1-2222 8888",
    estActif: 1
  },
  referents: [
    {
      id: 1,
      nom: "Reférent",
      prenom: "1",
      titre: "Buddha",
      telephone: "321-765-4321",
      telBureau: "321-777-8888",
      fax: "+44 1-4569 3217",
      courriel: "referent1@test.com",
      rapportFax: 1,
      rapportCourriel: 1,
      rapportPapier: 0
    }
  ]
}

const utilisateurCourantTest = {
  id: 1,
  nom: "directeur",
  courriel: "directeur@admin.com",
  role: {id: 1, fr:"directeur", en:"director"},
  actif: true
}

const baseProps = {
  orgReferent: orgReferentTest,
  messagesEntite: messagesFr.gererReferents,
  messagesCommuns: messagesFr.commun,
  langue: "fr",
  referentAModifier: "",
  selectionnerSection: () => {},
  listeReferents: listeReferentsTest,
  utilisateurCourant: utilisateurCourantTest
};

it('renders without crashing', () => {
  shallow(<ModaleReferents {...baseProps}/>);
});
