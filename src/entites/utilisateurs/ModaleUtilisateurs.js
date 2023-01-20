import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import '../../css/Modale.css';
import '../../css/Commun.css';
import axios from 'axios';

const listeRolesDefaut = [
    {id: 1, fr:"directeur", en:"director"},
    {id: 2, fr:"coordonnateur", en:"coordinator"},
    {id: 3, fr:"intervenant", en:"speaker"},
    {id: 4, fr:"employe", en:"empoyee"}
];

export default class ModaleUtilisateurs extends Component {
  // props: messagesEntite, messagesCommuns, utilisateurAModifier
  constructor(props) {
  	super(props)

  	this.state = {
  	  operation: "",
  	  modaleOuverte: false,
      listeRoles: []
  	}
  }

  // Fonction qui ouvre la modale. Recoit en paramètre soit "ajout" ou
  // "modification" pour savoir de quelle operation il s'agit
  handleOuvrirModale = (operation) => (e) => {
    /* istanbul ignore next */
    this.setState({
      operation: operation,
      modaleOuverte: true,
    })
  }

  // Handle pour cacher la boîte modale
  handleCacherModale = () => {
    /* istanbul ignore next */
    this.setState({
      operation: "",
      modaleOuverte: false,
    })
  }

  // Nous cherchons la liste de roles à la création du component
  componentDidMount = () => {
    this.getRoles();
  }

  // Cherche la liste de roles au backend
  getRoles = () => {
    /* istanbul ignore next */
    axios.get('/api/role')
      .then((response) => {
        /* istanbul ignore next */
        this.setState({listeRoles: response.data});
      })
      .catch((error) => {
        /* istanbul ignore next */
        this.setState({listeRoles: listeRolesDefaut});
      })
  }

  // Fonction d'ajout d'un utilisateur
  ajouterUtilisateur = () => {

    var data = {
      nom: $("#ajout-utilisateur-nom").val(),
      courriel: $("#ajout-utilisateur-courriel").val(),
      idRole: $("#ajout-utilisateur-role").val(),
      estActif: $("#ajout-utilisateur-actif").val()
    };

    /* istanbul ignore next */
    if (this.validerChamps(data)) {
      // On cache la modale
      this.handleCacherModale();
      // Executer le post
      /* istanbul ignore next */
      axios.post('api/usager', data)
        .then((response) => {
          // On rafraichit la liste avec une requete au backend
          this.props.activerRequetesGet();
          this.props.getListeUtilisateurs();
      })
        // Catch l'erreur au besoin
        .catch((error) => {
            alert(error);
      });

    }
  }

  modifierUtilisateur = () => {

    var data = {
      id: this.props.utilisateurAModifier.id,
      nom: $("#modification-utilisateur-nom").val(),
      courriel: $("#modification-utilisateur-courriel").val(),
      idRole: $("#modification-utilisateur-role").val(),
      estActif: $("#modification-utilisateur-actif").val()
    }

    /* istanbul ignore next */
    if (this.validerChamps(data)) {
      // On cache la modale
      this.handleCacherModale();
      /* istanbul ignore next */
      axios.put('api/usager/'+data.id, data)
        .then((response) => {
          // On rafraichit la liste avec une requete au backend
          this.props.activerRequetesGet();
          this.props.getListeUtilisateurs();
      })
        // Catch l'erreur au besoin
        .catch((error) => {

      });
    }
  }

  validerChamps = (data) => {

    // Source du regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    /* istanbul ignore next */
    var emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    /* istanbul ignore next */
    if (data.nom === "" || data.nom === null ||
        data.courriel == "" || data.courriel === null) {
      /* istanbul ignore next */
      $("#message-erreur").removeClass("hidden");
      /* istanbul ignore next */
      $("#message-erreur").text(this.props.messagesCommuns.erreurChampsVides);
      return false;
    }
    else if(!emailRegex.test(data.courriel)) {
      /* istanbul ignore next */
      $("#message-erreur").removeClass("hidden");
      /* istanbul ignore next */
      $("#message-erreur").text(this.props.messagesCommuns.erreurValiditeCourriel);
      return false;
    }
    else
      return true;
  }

  // Effectuer le rendu de la section "actif" de l'entité.
  renderActif = (utilisateur) => {
    if (this.state.operation === "ajout"){
      return (<select id="ajout-utilisateur-actif" defaultValue="true">
        <option value="1">{this.props.messagesCommuns.actif}</option>
        <option value="0">{this.props.messagesCommuns.inactif}</option>
      </select>);
    } else if (this.state.operation === "modification"){
      if(this.props.utilisateurCourant.role.id <= utilisateur.role.id) {
        return (<select id="modification-utilisateur-actif" value={this.props.utilisateurAModifier.actif}>
          <option value="1">{this.props.messagesCommuns.actif}</option>
          <option value="0">{this.props.messagesCommuns.inactif}</option>
        </select>);
      }
      else {
        return (<select id="modification-utilisateur-actif" value={this.props.utilisateurAModifier.actif} disabled>
          <option value="1">{this.props.messagesCommuns.actif}</option>
          <option value="0">{this.props.messagesCommuns.inactif}</option>
        </select>);
      }
    }
    return null;
  }

  renderListeRoles = () => {
    return this.state.listeRoles.map((role, idx) => {
      // Un utilisateur ne peut qu'ajouter ou modifier un utilisateur à un role
      // inférieur ou égal au sien
      if (this.props.utilisateurCourant.role.id <= role.id){
        if(this.props.langue == "fr") {
          return (
            <option key={idx} value={role.id}>{role.fr}</option>
          );
        }
        else {
          return (
            <option key={idx} value={role.id}>{role.en}</option>
          );
        }
      }
    })
  }

  // Effectuer le rendu de la boîte modale
  renderModale = (modification) => {
		var titreModale = this.props.titreEntite;

    var champsEnCours = this.state.operation === "ajout" ?
      this.props.champsAjout : this.props.champsModif;

    // Pour raccourcir les liens vers les messages
    var messagesEntite = this.props.messagesEntite;

    if (this.state.operation === "modification") {
      var champs = (
        <div className="champs-modale">
          <label>{messagesEntite.libelleNom}:
            <input id="modification-utilisateur-nom" type="text" defaultValue={this.props.utilisateurAModifier.nom}/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="modification-utilisateur-courriel" type="text" defaultValue={this.props.utilisateurAModifier.courriel}/><br/>
          </label>
          <label>{messagesEntite.libelleRole}:</label>
          <select id="modification-utilisateur-role" defaultValue={this.props.utilisateurAModifier.role.id}>
            {this.renderListeRoles()}
          </select><br/>
          <label>{this.props.messagesEntite.libelleActif}:</label>
          {this.renderActif(this.props.utilisateurAModifier)}
          <button className="btn btn-primary" onClick={this.modifierUtilisateur}>{this.props.messagesCommuns.modifier}</button><br/>
          <span id="message-erreur" className="hidden"></span>
        </div>
      );
    } else {
		  var champs = (
			  <div className="champs-modale">
			    <label>{messagesEntite.libelleNom}:
            <input id="ajout-utilisateur-nom" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="ajout-utilisateur-courriel" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleRole}:</label>
          <select id="ajout-utilisateur-role">
            {this.renderListeRoles()}
          </select><br/>
			    <label>{this.props.messagesEntite.libelleActif}:</label>
			    {this.renderActif(null)}
          <button className="btn btn-primary" onClick={this.ajouterUtilisateur}>{this.props.messagesCommuns.ajouter}</button><br/>
          <span id="message-erreur" className="hidden"></span>
        </div>
		  );
    }

	  return (
	    <Modal show={this.state.modaleOuverte} onHide={this.handleCacherModale}>
	      <Modal.Header closeButton>
	        <Modal.Title>{titreModale}</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        {champs}
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={this.handleCacherModale}>{this.props.messagesEntite.boutonFermeture}</Button>
	      </Modal.Footer>
	    </Modal>
	  );
  }

  // Effectuer le rendu du bouton de modification
  renderBoutonMofif = () => {
    if (this.props.utilisateurAModifier) {
      return (
        <button onClick={this.handleOuvrirModale("modification")} className="btn btn-primary">
          {this.props.messagesCommuns.boutonModification}
        </button>
      );
    } else {
      return (
      <button className="btn btn-primary" disabled>
        {this.props.messagesCommuns.boutonModification}
      </button>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="boutons">
          <button onClick={this.handleOuvrirModale("ajout")} className="btn btn-primary">
            {this.props.messagesCommuns.boutonAjout}
          </button>
          {this.renderBoutonMofif()}
        </div>
        {this.renderModale()}
      </div>
    );
  }
}
