import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import '../../css/Modale.css';
import '../../css/Commun.css';
import axios from 'axios';

export default class ModaleOrganismesReferents extends Component {
  // props: messagesEntite, messagesCommuns, organismeAModifier
  constructor(props) {
  	super(props)

  	this.state = {
  	  operation: "",
  	  modaleOuverte: false,
  	}
  }



  // Handle pour ouvrir la boîte modale
  handleOuvrirModale = (operation) => (e) => {
    /* istanbul ignore next */
    this.setState({
      operation: operation,
      modaleOuverte: true
    })
  }

  // Handle pour cacher la boîte modale
  handleCacherModale = () => {
    /* istanbul ignore next */
    this.setState({
      operation: "",
      modaleOuverte: false
    })
  }

  // Fonction d'ajout d'un utilisateur
  ajouterOrganisme = () => {

    var data = {
      nom: $("#ajout-organisme-nom").val(),
      adresse: $("#ajout-organisme-adresse").val(),
      courriel: $("#ajout-organisme-courriel").val(),
      tel: $("#ajout-organisme-telephone").val(),
      fax: $("#ajout-organisme-fax").val(),
      siteWeb: $("#ajout-organisme-siteWeb").val(),
      estActif: $("#ajout-organisme-actif").val(),
      organisme: $("#ajout-liste-organismes").val()
    };

    /* istanbul ignore next */
    console.log("selected organisme:");
    /* istanbul ignore next */
    console.log(data.organisme);
    /* istanbul ignore next */
    if(this.validerChamps(data)) {

      // On cache la modale
      /* istanbul ignore next */
      this.handleCacherModale();

      // Executer le post
      /* istanbul ignore next */
      axios.post('api/organismereferent', data)
        .then((response) => {
          /* istanbul ignore next */
          console.log("new org ref id:");
          /* istanbul ignore next */
          console.log(response.data.id);
          /* istanbul ignore next */
          console.log("organism to link:");
          /* istanbul ignore next */
          console.log(data.organisme);
          /* istanbul ignore next */
          axios.post('api/organismereferent/lien/'+response.data.id+'/'+data.organisme)
          .then((response) => {
            /* istanbul ignore next */
            console.log("link response");
            /* istanbul ignore next */
            console.log(response);
            // On rafraichit la liste avec une requete au backend
            this.props.activerRequetesGet();
            this.props.getListeOrganismes();
            this.props.activerRequetesGet();
            this.props.getListeOrganismesReferents();
          })
            // Catch l'erreur au besoin
            .catch((error) => {
              alert(error);
            })
      })
        // Catch l'erreur au besoin
        .catch((error) => {
            alert(error);
      });
    }
  }

  modifierOrganisme = () => {

    var data = {
      id: this.props.organismeAModifier.id,
      nom: $("#modification-organisme-nom").val(),
      adresse: $("#modification-organisme-adresse").val(),
      courriel: $("#modification-organisme-courriel").val(),
      tel: $("#modification-organisme-telephone").val(),
      fax: $("#modification-organisme-fax").val(),
      siteWeb: $("#modification-organisme-siteWeb").val(),
      estActif: $("#modification-organisme-actif").val()
    }

    /* istanbul ignore next */
    if(this.validerChamps(data)) {

      // On cache la modale
      /* istanbul ignore next */
      this.handleCacherModale();

      /* istanbul ignore next */
      axios.put('api/organismereferent/'+data.id, data)
        .then((response) => {
          // On rafraichit les listes avec une requete au backend
          this.props.activerRequetesGet();
          this.props.getListeOrganismes();
          this.props.activerRequetesGet();
          this.props.getListeOrganismesReferents();
      })
        // Catch l'erreur au besoin
        .catch((error) => {
          /* istanbul ignore next */
            alert(error);
      });
    }
  }

  validerChamps = (data) => {

    // Source du regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    /* istanbul ignore next */
    var emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    /* istanbul ignore next */
    if (data.nom === "" || data.nom === null ||
        data.courriel === "" || data.courriel === null ||
        data.adresse === "" || data.adresse === null ||
        data.tel === "" || data.tel === null ||
        data.siteWeb === "" || data.siteWeb === null ||
        data.fax === "" || data.fax === null) {
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
  renderActif = () => {
    if (this.state.operation === "ajout"){
      return (<select id="ajout-organisme-actif" defaultValue="true">
        <option value="1">{this.props.messagesCommuns.actif}</option>
        <option value="0">{this.props.messagesCommuns.inactif}</option>
      </select>);
    } else if (this.state.operation === "modification"){
      return (<select id="modification-organisme-actif" defaultValue={this.props.organismeAModifier.actif}>
        <option value="1">{this.props.messagesCommuns.actif}</option>
        <option value="0">{this.props.messagesCommuns.inactif}</option>
      </select>);
    }
    return null;
  }

  renderListeOrganismes = () => {
    return this.props.listeOrganismes.map((organisme, idx) => {
      return(
        <option key={idx} value={organisme.id}>{organisme.nom}
        </option>
      );
    });
  }

  // Effectuer le rendu de la boîte modale
  renderModale = (modification) => {
		var titreModale = this.props.titreEntite;

    var champsEnCours = this.state.operation === "ajout" ?
      this.props.champsAjout : this.props.champsModif;

    // Pour raccourcir les liens vers les messages
    var messagesEntite = this.props.messagesEntite;

    if (this.state.operation == "modification") {
      var champs = (
        <div className="champs-modale">
          <label>{messagesEntite.libelleNom}:
            <input id="modification-organisme-nom" type="text" defaultValue={this.props.organismeAModifier.nom}/><br/>
          </label>
          <label>{messagesEntite.libelleAdresse}:
            <input id="modification-organisme-adresse" type="text" defaultValue={this.props.organismeAModifier.adresse}/><br/>
          </label>
          <label>{messagesEntite.libelleTelephone}:
            <input id="modification-organisme-telephone" type="text" defaultValue={this.props.organismeAModifier.tel}/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="modification-organisme-courriel" type="text" defaultValue={this.props.organismeAModifier.courriel}/><br/>
          </label>
          <label>{messagesEntite.libelleFax}:
            <input id="modification-organisme-fax" type="text" defaultValue={this.props.organismeAModifier.fax}/><br/>
          </label>
          <label>{messagesEntite.libelleSiteWeb}:
            <input id="modification-organisme-siteWeb" type="text" defaultValue={this.props.organismeAModifier.siteWeb}/><br/>
          </label>
          <label>{this.props.messagesEntite.libelleActif}:</label>
          {this.renderActif()}

          <span id="message-erreur" className="hidden"></span>
          <button className="btn btn-primary" onClick={this.modifierOrganisme}>{this.props.messagesCommuns.modifier}</button><br/>
        </div>

      );

    } else {
		  var champs = (
			  <div className="champs-modale">
			    <label>{messagesEntite.libelleNom}:
            <input id="ajout-organisme-nom" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleAdresse}:
            <input id="ajout-organisme-adresse" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleTelephone}:
            <input id="ajout-organisme-telephone" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="ajout-organisme-courriel" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleFax}:
            <input id="ajout-organisme-fax" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleSiteWeb}:
            <input id="ajout-organisme-siteWeb" type="text"/><br/>
          </label>
			    <label>{this.props.messagesEntite.libelleActif}:</label>
			    {this.renderActif()}

          <span id="message-erreur" className="hidden"></span>
          <label>{this.props.messagesEntite.libelleLierOrgRef}
            <select id="ajout-liste-organismes">
              {this.renderListeOrganismes()}
            </select>
          </label>
          <button className="btn btn-primary" onClick={this.ajouterOrganisme}>{this.props.messagesCommuns.ajouter}</button><br/>
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
  renderBoutonAjout = () => {
    if (this.props.utilisateurCourant.role.id <= 2) {
      return (
        <button onClick={this.handleOuvrirModale("ajout")} className="btn btn-primary">
          {this.props.messagesCommuns.boutonAjout}
        </button>
      );
    } else {
      return (
        <button className="btn btn-primary" disabled>
          {this.props.messagesCommuns.boutonAjout}
        </button>
      );
    }
  }


  // Effectuer le rendu du bouton de modification
  renderBoutonModif = () => {
    if (this.props.organismeAModifier && this.props.utilisateurCourant.role.id <= 2) {
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

  // Effectuer le rendu du bouton d'ajout de référents
  renderBoutonAjoutReferents = () => {
    if (this.props.organismeAModifier && this.props.utilisateurCourant.role.id <= 4) {
      return (
        <button onClick={this.props.selectionnerSection("gererReferents")} className="btn btn-primary">
          {this.props.messagesEntite.boutonGererReferents}
        </button>
      );
    } else {
      return (
        <button className="btn btn-primary" disabled>
          {this.props.messagesEntite.boutonGererReferents}
        </button> : ""
      );
    }
  }

  render() {
    return (
      <div>
        <div className="boutons">
          {this.renderBoutonAjout()}
          {this.renderBoutonModif()}
          {this.renderBoutonAjoutReferents()}
        </div>
        {this.renderModale()}
      </div>
    );
  }
}
