import React from 'react';
import ReactDOM from 'react-dom';
import ModaleOrganismesReferents from './ModaleOrganismesReferents';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messagesEntite: messagesFr.gererOrganismes,
  messagesCommuns: messagesFr.commun,
  organismeAModifier: "",
  langue: "fr",
  listeOrganismes:[],
  utilisateurCourant: {

      nom: "directeur",
      courriel: "directeur@admin.com",
      role: {id: 1, fr:"directeur", en:"director"},
      actif: true
  },
  activerRequetesGet: jest.fn(),
  getListeOrganismes: jest.fn()
};

it('renders without crashing', () => {
  shallow(<ModaleOrganismesReferents {...baseProps}/>);
});
