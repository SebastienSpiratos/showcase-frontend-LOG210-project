import React from 'react';
import ReactDOM from 'react-dom';
import ModaleOrganismes from './ModaleOrganismes';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const baseProps = {
  messagesEntite: messagesFr.gererOrganismes,
  messagesCommuns: messagesFr.commun,
  organismeAModifier: "",
  langue: "fr"
};

it('renders without crashing', () => {
  shallow(<ModaleOrganismes {...baseProps}/>);
});
