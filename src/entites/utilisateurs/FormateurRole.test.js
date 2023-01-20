import React from 'react';
import ReactDOM from 'react-dom';
import FormateurRole from './FormateurRole';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { expect } from 'chai';
import messagesFr from "../../translations/fr.json";

const basePropsFr = {
  langue: "fr",
  role: {
    fr: "directeur",
    en: "director"
  }
}

const basePropsEn = {
  langue: "en",
  role: {
    fr: "directeur",
    en: "director"
  }
}

const basePropsAutre = {
  langue: "es",
  role: {
    fr: "directeur",
    en: "director"
  }
}

it('renders without crashing', () => {
  shallow(<FormateurRole {...basePropsFr}/>);
});

const wrapperFr = shallow(<FormateurRole {...basePropsFr}  />);

const wrapperEn = shallow(<FormateurRole {...basePropsEn}  />);

const wrapperAutre = shallow(<FormateurRole {...basePropsAutre}  />);

it('renders les span de roles en francais', () => {
  const roleSpan = <span>directeur</span>;
  expect(wrapperFr.contains(roleSpan)).equal(true);
  });

it('renders les span de roles en anglais', () => {
  const roleSpan = <span>director</span>;
  expect(wrapperEn.contains(roleSpan)).equal(true);
  });

it('renders null si this.props.langue != en || fr ', () => {
  const roleSpanFr = <span>directeur</span>;
  const roleSpanEn = <span>director</span>;
  expect(wrapperAutre.contains(roleSpanFr)).equal(false);
  expect(wrapperAutre.contains(roleSpanEn)).equal(false);
  });
