import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import './css/Commun.css';
import ModaleConfirmation from './ModaleConfirmation';
import axios from 'axios';

export default class GererProfil extends Component {
  constructor(props){
    super(props)

    this.state = {
      modaleOuverte: false
    };
  }

  // Fonction qui ouvre la modale.
  handleOuvrirModale = () => {
    /* istanbul ignore next */
    this.setState({
      modaleOuverte: true,
    })
  }

  // Handle pour cacher la boîte modale
  handleCacherModale = () => {
    /* istanbul ignore next */
    this.setState({
      modaleOuverte: false,
    })
  }

  // Fonction qui modifie le profil de l'utilisateur
  modifierProfil = () => {
    /* istanbul ignore next */
    this.handleCacherModale();

    var data = {
      id: this.props.utilisateurCourant.id,
      nom: $("#gerer-profil-nom").val(),
      courriel: $("#gerer-profil-courriel").val(),
      idRole: this.props.utilisateurCourant.role.id,
      estActif: this.props.utilisateurCourant.estActif
    }

    axios.put('api/usager/'+data.id, data)
      .then((response) => {
        var utilisateur = {
          id: this.props.utilisateurCourant.id,
          nom: $("#gerer-profil-nom").val(),
          courriel: $("#gerer-profil-courriel").val(),
          role: this.props.utilisateurCourant.role,
          estActif: this.props.utilisateurCourant.estActif
        }
        // On rafraichit l'utilisateur courant
        this.props.updateUtilisateurCourant(utilisateur);
    })
      // Catch l'erreur au besoin
      .catch((error) => {
        /* istanbul ignore next */
        alert(error);
    });
  }

  render() {
    return (
      <div className="gererProfil">
          <h2>{this.props.messages.profil.titre}</h2>
          <div className="section-champs">
            <label>{this.props.messages.gererUtilisateurs.libelleNom}:</label><input id="gerer-profil-nom" type="text" defaultValue={this.props.utilisateurCourant.nom}/><br/>
            <label>{this.props.messages.gererUtilisateurs.libelleCourriel}:</label><input id="gerer-profil-courriel" type="text" defaultValue={this.props.utilisateurCourant.courriel}/><br/>
          </div>
          <br/>
          <div>
            <button onClick={this.handleOuvrirModale} className="btn btn-primary">
              {this.props.messages.commun.boutonModification}
            </button>
          </div>
          <ModaleConfirmation modaleOuverte={this.state.modaleOuverte}
           operation={this.modifierProfil}
           messages={this.props.messages}
           handleCacherModale={this.handleCacherModale}/>
      </div>
    );
  }
}
