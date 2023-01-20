import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import AssociationReferent from './AssociationReferent';
import '../../css/Modale.css';
import '../../css/Commun.css';
import axios from 'axios';

export default class ModaleOrganismes extends Component {
  // props: messagesEntite, messagesCommuns, organismeAModifier
  constructor(props) {
  	super(props)

  	this.state = {
      renderRecherche: true,
  	  operation: "",
  	  modaleOuverte: false
  	}

    this.handleMountRecherche = this.handleMountRecherche.bind(this);
    this.handleUnmountRecherche = this.handleUnmountRecherche.bind(this);
  }

  // Handle pour ouvrir la boîte modale
  handleOuvrirModale = (operation) => (e) => {
    if (!this.state.renderRecherche) {
      this.handleMountRecherche();
    }
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

  // Activer la recherche
  handleMountRecherche = () => {
    /* istanbul ignore next */
    this.setState({renderRecherche: true});
  }

  // Désactiver la recherche
  handleUnmountRecherche = () => {
    /* istanbul ignore next */
    this.setState({renderRecherche: false});
  }

  // Fonction d'ajout d'un référent
  ajouterReferent = () => {
    var data = {
      nom: $("#ajout-referent-nom").val(),
      prenom: $("#ajout-referent-prenom").val(),
      titre: $("#ajout-referent-titre").val(),
      tel_cell: $("#ajout-referent-tel_cell").val(),
      tel_bureau: $("#ajout-referent-tel_bureau").val(),
      fax: $("#ajout-referent-fax").val(),
      courriel: $("#ajout-referent-courriel").val(),
      rapport_fax: $("#ajout-referent-rapport_fax").val(),
      rapport_courriel: $("#ajout-referent-rapport_courriel").val(),
      rapport_papier: $("#ajout-referent-rapport_papier").val()
    };

    if(this.validerChamps(data)) {

      // On cache la modale
      this.handleCacherModale();

      // Executer le post
      /* istanbul ignore next */
      axios.post('api/referent', data)
        .then((response) => {

          // On crée le lien entre le référent et l'organisme référent (meilleur façon de faire?)
          /* istanbul ignore next */
          axios.post('api/referent/lien/' + response.data.id + '/' + this.props.orgReferent.id);
          /* istanbul ignore next */
          this.props.activerRequetesGet();
          // On rafraichit la liste avec une requete au backend (TODO: Observateur)
          /* istanbul ignore next */
          this.props.getListeReferents();
          // La liste des référents associés à un organisme référent est mis à jour
          /* istanbul ignore next */
          this.props.updateReferentsAssocies();
      });
    }
  }

  // Fonction d'association d'un référent
  associerReferent = (referent) => {
    // On cache la modale
    /* istanbul ignore next */
    this.handleCacherModale();
    // On crée l'association entre le référent et l'organisme référent
    /* istanbul ignore next */
    axios.post('api/referent/lien/' + referent.id + '/' + this.props.orgReferent.id);
    // La liste des référents associés à un organisme référent est mis à jour
    /* istanbul ignore next */
    this.props.updateReferentsAssocies();
  }

  // Fonction de modification d'un référent
  modifierReferent = () => {

    var data = {
      id: this.props.referentAModifier.id,
      nom: $("#modification-referent-nom").val(),
      prenom: $("#modification-referent-prenom").val(),
      titre: $("#modification-referent-titre").val(),
      tel_cell: $("#modification-referent-tel_cell").val(),
      tel_bureau: $("#modification-referent-tel_bureau").val(),
      fax: $("#modification-referent-fax").val(),
      courriel: $("#modification-referent-courriel").val(),
      rapport_fax: $("#modification-referent-rapport_fax").val(),
      rapport_courriel: $("#modification-referent-rapport_courriel").val(),
      rapport_papier: $("#modification-referent-rapport_papier").val()
    }

    /* istanbul ignore next */
    if(this.validerChamps(data, this.props.referentAModifier)) {

      // On cache la modale
      /* istanbul ignore next */
      this.handleCacherModale();

      /* istanbul ignore next */
      axios.put('api/referent/'+data.id, data)
        .then((response) => {
          // On rafraichit la liste avec une requete au backend
          this.props.activerRequetesGet();
          this.props.getListeReferents();
      });
    }
    // La liste des référents associés à un organisme référent est mis à jour
    this.props.updateReferentsAssocies();
  }

  // Vérifie qu'un courriel est unique
  estCourrielUnique = (courriel) => {
    // Liste à jour des référents existants
    this.props.getListeReferents();
    // Valeur de vérité à savoir si le courriel est unique
    var estUnique = true;

    // Vrai jusqu'à preuve du contraire
    for (var i=0; i<this.props.listeReferents.length && estUnique; i++) {
      if (this.props.listeReferents[i].courriel === courriel) {
        estUnique = false;
      }
    }

    return estUnique;
  }

  validerChamps = (data, referentActuel) => {

    // Source du regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    /* istanbul ignore next */
    var emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    /* istanbul ignore next */
    if (data.nom === "" || data.nom === null ||
        data.prenom === "" || data.nom === null ||
        data.titre === "" || data.titre === null ||
        data.tel_cell === "" || data.tel_cell === null ||
        // Téléphone de bureau facultatif
        data.fax === "" || data.fax === null ||
        data.courriel === "" || data.courriel === null ||
        data.rapport_fax === "" || data.rapport_fax === null ||
        data.rapport_courriel === "" || data.rapport_courriel === null ||
        data.rapport_papier === "" || data.rapport_papier === null) {
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
    //  Si le courriel est unique et si le courriel n'est pas celui du référent, sachant que le référent existe
    else if (!this.estCourrielUnique(data.courriel) && 
      (typeof referentActuel === "undefined" || 
        (typeof referentActuel !== "undefined" && data.courriel !== referentActuel.courriel)
      )){

      /* istanbul ignore next */
      $("#message-erreur").removeClass("hidden");
      /* istanbul ignore next */
      $("#message-erreur").text(this.props.messagesCommuns.erreurCourrielExistant);
      return false;
    }
    else
      return true;
  }

  // Effectuer le rendu de la section "actif" de l'entité.
  renderRapport = (type, valeur) => {
    if (this.state.operation === "ajout"){
      return (<select id={"ajout-referent-" + type} defaultValue="0">
        <option value="1">{this.props.messagesCommuns.oui}</option>
        <option value="0">{this.props.messagesCommuns.non}</option>
      </select>);
    } else if (this.state.operation === "modification"){
      return (<select id={"modification-referent-" + type} defaultValue={valeur}>
        <option value="1">{this.props.messagesCommuns.oui}</option>
        <option value="0">{this.props.messagesCommuns.non}</option>
      </select>);
    }
    return null;
  }

  // Effectuer le rendu de la boîte modale
  renderModale = (etat) => {
		var titreModale = this.props.titreEntite;

    // Pour raccourcir les liens vers les messages
    var messagesEntite = this.props.messagesEntite;

    if (this.state.operation == "modification") {
      var champs = (
        <div className="champs-modale">
          <label>{messagesEntite.libelleNom}:
            <input id="modification-referent-nom" type="text" defaultValue={this.props.referentAModifier.nom}/><br/>
          </label>
          <label>{messagesEntite.libellePrenom}:
            <input id="modification-referent-prenom" type="text" defaultValue={this.props.referentAModifier.prenom}/><br/>
          </label>
          <label>{messagesEntite.libelleTitre}:
            <input id="modification-referent-titre" type="text" defaultValue={this.props.referentAModifier.titre}/><br/>
          </label>
          <label>{messagesEntite.libelleTelephone}:
            <input id="modification-referent-tel_cell" type="text" defaultValue={this.props.referentAModifier.tel_cell}/><br/>
          </label>
          <label>{messagesEntite.libelleTelBureau}:
            <input id="modification-referent-tel_bureau" type="text" defaultValue={this.props.referentAModifier.tel_bureau}/><br/>
          </label>
          <label>{messagesEntite.libelleFax}:
            <input id="modification-referent-fax" type="text" defaultValue={this.props.referentAModifier.fax}/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="modification-referent-courriel" type="text" defaultValue={this.props.referentAModifier.courriel}/><br/>
          </label>

          <label>{this.props.messagesEntite.libelleRapportFax}:</label>
          {this.renderRapport("rapport_fax", this.props.referentAModifier.rapport_fax)}
          <label>{this.props.messagesEntite.libelleRapportCourriel}:</label>
          {this.renderRapport("rapport_courriel", this.props.referentAModifier.rapport_courriel)}
          <label>{this.props.messagesEntite.libelleRapportPapier}:</label>
          {this.renderRapport("rapport_papier", this.props.referentAModifier.rapport_papier)}
          <br/>
          <button className="btn btn-primary" onClick={this.modifierReferent}>{this.props.messagesCommuns.modifier}</button><br/>
          <span id="message-erreur" className="hidden"></span>
        </div>
      );
    } else if (this.state.operation == "ajout") {
		  var champs = (
			  <div className="champs-modale">
          <label>{messagesEntite.libelleNom}:
            <input id="ajout-referent-nom" type="text"/><br/>
          </label>
          <label>{messagesEntite.libellePrenom}:
            <input id="ajout-referent-prenom" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleTitre}:
            <input id="ajout-referent-titre" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleTelephone}:
            <input id="ajout-referent-tel_cell" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleTelBureau}:
            <input id="ajout-referent-tel_bureau" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleFax}:
            <input id="ajout-referent-fax" type="text"/><br/>
          </label>
          <label>{messagesEntite.libelleCourriel}:
            <input id="ajout-referent-courriel" type="text"/><br/>
          </label>

          <label>{this.props.messagesEntite.libelleRapportFax}:</label>
          {this.renderRapport("rapport_fax", null)}
          <label>{this.props.messagesEntite.libelleRapportCourriel}:</label>
          {this.renderRapport("rapport_courriel", null)}
          <label>{this.props.messagesEntite.libelleRapportPapier}:</label>
          {this.renderRapport("rapport_papier", null)}

          <button className="btn btn-primary" onClick={this.ajouterReferent}>{this.props.messagesCommuns.ajouter}</button><br/>
          <span id="message-erreur" className="hidden"></span>
        </div>
		  );
    } else {
      var champs = (
        <div className="champs-modale">
          {this.state.renderRecherche ?
          <AssociationReferent titre={this.props.messagesEntite.titreAssociation}
                               messagesEntite={this.props.messagesEntite}
                               messagesCommuns={this.props.messagesCommuns}
                               unmount={this.handleUnmountRecherche}
                               orgReferent={this.props.orgReferent}
                               listeReferentsAssocies={this.props.listeReferentsAssocies}
                               associerReferent={this.associerReferent}/> : ""}
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
  renderBoutonModif = () => {
    if (this.props.referentAModifier) {
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
          <button onClick={this.props.selectionnerSection("gererOrganismesReferents")} className="btn btn-light">
            {this.props.messagesCommuns.boutonRetour}
          </button>
          <button onClick={this.handleOuvrirModale("ajout")} className="btn btn-primary">
            {this.props.messagesCommuns.boutonAjout}
          </button>
          <button onClick={this.handleOuvrirModale("association")} className="btn btn-primary">
            {this.props.messagesCommuns.boutonAssociation}
          </button>
          {this.renderBoutonModif()}
        </div>
        {this.renderModale()}
      </div>
    );
  }
}
