import React from 'react';
import ReactDOM from 'react-dom';
import ModaleConfirmation from './ModaleConfirmation';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "./translations/fr.json";

const baseProps = {
  modaleOuverte: true,
  messages: messagesFr,
  operation: jest.fn(),
  handleCacherModale: jest.fn()
};

it('renders without crashing', () => {
  shallow(<ModaleConfirmation {...baseProps}/>);
});
