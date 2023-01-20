import React from 'react';
import ReactDOM from 'react-dom';
import ModaleRechercheReferent from './ModaleRechercheReferent';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messages: messagesFr,
  referent: {
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
};

it('renders without crashing', () => {
  shallow(<ModaleRechercheReferent {...baseProps}/>);
});
