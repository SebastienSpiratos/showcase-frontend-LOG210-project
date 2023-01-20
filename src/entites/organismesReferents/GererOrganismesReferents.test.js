import React from 'react';
import ReactDOM from 'react-dom';
import GererOrganismesReferents from './GererOrganismesReferents';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messages: messagesFr,
  listeOrganismes: [
    {
      id: 1,
      nom: "Org1",
      adresse: "123 Beauchemin",
      courriel: "org1@test.com",
      telephone:  "111-222-3333",
      fax: "111-222-3334",
      actif: true
    }
  ],
  listeOrganismesReferents: [],
  langue: "fr",
  utilisateurCourant: {
      id: 1,
      nom: "directeur",
      courriel: "directeur@admin.com",
      role: {id: 1, fr:"directeur", en:"director"},
      actif: true
  }
};

it('renders without crashing', () => {
  shallow(<GererOrganismesReferents {...baseProps}/>);
});
