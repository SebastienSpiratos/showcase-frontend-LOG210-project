import React from 'react';
import ReactDOM from 'react-dom';
import ListeUtilisateurs from './ListeUtilisateurs';
import FormateurRole from './ListeUtilisateurs';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messages: messagesFr,
  listeUtilisateurs: [
    {
        id: 1,
        nom: "directeur",
        courriel: "directeur@admin.com",
        role: {id: 1, fr:"directeur", en:"director"},
        estActif: 1
    }
  ],
  langue: "fr",
  utilisateurCourant: {
      id: 1,
      nom: "directeur",
      courriel: "directeur@admin.com",
      role: {id: 1, fr:"directeur", en:"director"},
      estActif: 1
  }
};

it('renders without crashing', () => {
  shallow(<ListeUtilisateurs {...baseProps}/>);
});
