import React, { Component } from 'react';
import * as $ from 'jquery';
import './css/Commun.css';
import './css/Navigation.css';

export default class Navigation extends Component {
  constructor(props){
    super(props)

    this.state = {

    };
  }

  render() {

    var gererUtilisateurs = (this.props.utilisateurCourant.role.id == 1 ||
      this.props.utilisateurCourant.role.id == 2) ?
      <a onClick={this.props.selectionnerSection("gererUtilisateurs")}>
        {this.props.messages.navigation.lienGererUtilisateurs}
      </a> : "";

    var gererOrganismes = (this.props.utilisateurCourant.role.id == 1) ?
      <a onClick={this.props.selectionnerSection("gererOrganismes")}>
        {this.props.messages.navigation.lienGererOrganismes}
      </a> : "";

    var gererOrganismesReferents = (this.props.utilisateurCourant.role.id <= 4) ?
      <a onClick={this.props.selectionnerSection("gererOrganismesReferents")}>
        {this.props.messages.navigation.lienGererOrganismesReferents}
      </a> : "";

    var rechercherReferent = (this.props.utilisateurCourant.role.id <= 4) ?
      <a onClick={this.props.selectionnerSection("rechercherReferent")}>
        {this.props.messages.navigation.lienRechercherReferent}
      </a> : "";

    return (
      <div className="navigation-zone">
          <h4>{this.props.messages.navigation.titre}</h4>
          <div className="menu-sections">
            {gererUtilisateurs}
            {gererOrganismes}
            {gererOrganismesReferents}
            {rechercherReferent}
          </div>
      </div>
    );
  }
}
