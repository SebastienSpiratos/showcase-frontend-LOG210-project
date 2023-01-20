import React from 'react';
import ReactDOM from 'react-dom';
import GererProfil from './GererProfil';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "./translations/fr.json";

const baseProps = {
  messages: messagesFr,
  updateUtilisateurCourant: jest.fn(),
  utilisateurCourant: {
      id: 1,
      nom: "directeur",
      courriel: "directeur@admin.com",
      role: {id: 1, fr:"directeur", en:"director"},
      actif: true
  },
  langue: "fr"
};

it('renders without crashing', () => {
  shallow(<GererProfil {...baseProps}/>);
});
