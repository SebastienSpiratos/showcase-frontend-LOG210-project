import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "./translations/fr.json";

const baseProps = {
  messages: messagesFr,
  listeUtilisateurs: [],
  loginUtilisateur: jest.fn()
};

it('renders without crashing', () => {
  shallow(<Login {...baseProps}/>);
});
