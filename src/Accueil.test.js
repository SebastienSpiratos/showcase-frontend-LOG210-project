import React from 'react';
import ReactDOM from 'react-dom';
import Accueil from './Accueil';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "./translations/fr.json";

const baseProps = {
  messages: messagesFr,
  selectionnerSection: jest.fn(),
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
  shallow(<Accueil {...baseProps}/>);
});
