import React from 'react';
import ReactDOM from 'react-dom';
import GererOrganismes from './GererOrganismes';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messages: messagesFr,
  listeOrganismes: [],
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
  shallow(<GererOrganismes {...baseProps}/>);
});
