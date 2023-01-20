import React from 'react';
import ReactDOM from 'react-dom';
import ListeOrganismes from './ListeOrganismes';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messages: messagesFr,
  listeOrganismes: [],
  langue: "fr"
};

it('renders without crashing', () => {
  shallow(<ListeOrganismes {...baseProps}/>);
});
