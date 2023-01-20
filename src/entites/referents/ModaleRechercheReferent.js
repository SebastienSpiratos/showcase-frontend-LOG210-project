import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import '../../css/Modale.css';
import '../../css/Commun.css';
import axios from 'axios';

export default class ModaleOrganismes extends Component {
  // props: referent, messages
  constructor(props) {
  	super(props)

  	this.state = {
  	  modaleOuverte: false
  	}
  }

  // Handle pour ouvrir la boîte modale
  handleOuvrirModale = (operation) => (e) => {
    /* istanbul ignore next */
    this.setState({
      modaleOuverte: true
    })
  }

  // Handle pour cacher la boîte modale
  handleCacherModale = () => {
    /* istanbul ignore next */
    this.setState({
      modaleOuverte: false
    })
  }

  // Effectuer le rendu de la section rapport de l'entité.
  renderRapport = (valeur) => {
    if (valeur == 1)
      return (<div>{this.props.messages.commun.oui}</div>);
    else
      return (<div>{this.props.messages.commun.non}</div>);
  }

  // Effectuer le rendu de la boîte modale
  renderModale = () => {
		var titreModale = this.props.messages.gererReferents.titreModaleVisualiser;

    // Pour raccourcir les liens vers les messages
    var messagesEntite = this.props.messages.gererReferents;

    var champs = (
      <div className="champs-modale">
        <label>{messagesEntite.libelleNom}:
          <input id="referent-nom" type="text" defaultValue={this.props.referent.nom} disabled/><br/>
        </label>
        <label>{messagesEntite.libellePrenom}:
          <input id="referent-prenom" type="text" defaultValue={this.props.referent.prenom} disabled/><br/>
        </label>
        <label>{messagesEntite.libelleTitre}:
          <input id="referent-titre" type="text" defaultValue={this.props.referent.titre} disabled/><br/>
        </label>
        <label>{messagesEntite.libelleTelephone}:
          <input id="referent-telephone" type="text" defaultValue={this.props.referent.tel_cell} disabled/><br/>
        </label>
        <label>{messagesEntite.libelleTelBureau}:
          <input id="referent-tel_bureau" type="text" defaultValue={this.props.referent.tel_bureau} disabled/><br/>
        </label>
        <label>{messagesEntite.libelleFax}:
          <input id="referent-fax" type="text" defaultValue={this.props.referent.fax} disabled/><br/>
        </label>
        <label>{messagesEntite.libelleCourriel}:
          <input id="referent-courriel" type="text" defaultValue={this.props.referent.courriel} disabled/><br/>
        </label>

        <label>{messagesEntite.libelleRapportFax}:</label>
        {this.renderRapport(this.props.referent.rapport_fax)}
        <label>{messagesEntite.libelleRapportCourriel}:</label>
        {this.renderRapport(this.props.referent.rapport_courriel)}
        <label>{messagesEntite.libelleRapportPapier}:</label>
        {this.renderRapport(this.props.referent.rapport_papier)}
        <br/>
      </div>
    );

	  return (
	    <Modal show={this.state.modaleOuverte} onHide={this.handleCacherModale}>
	      <Modal.Header closeButton>
	        <Modal.Title>{titreModale}</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        {champs}
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={this.handleCacherModale}>{messagesEntite.boutonFermeture}</Button>
	      </Modal.Footer>
	    </Modal>
	  );
  }

  // Effectuer le rendu du bouton de visualisation
  renderBouton = () => {
    if (this.props.referent) {
      return (
        <button onClick={this.handleOuvrirModale()} className="btn btn-primary">
          {this.props.messages.commun.voir}
        </button>
      );
    } else {
      return (
      <button className="btn btn-primary" disabled>
        {this.props.messages.commun.voir}
      </button>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="boutons">
          {this.renderBouton()}
        </div>
        {this.renderModale()}
      </div>
    );
  }
}
