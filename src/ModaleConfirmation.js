import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import './css/Modale.css';
import './css/Commun.css';
import axios from 'axios';


 // Component ModaleConfirmation est utilisé pour ajouter une modale de confirmation
 // dans un autre component et lui donner la permission de faire une opération
 // en lui passant l'operation en prop.
 // PROPS:
 // modaleOuverte: C'est le booléen qui détermine si la modale est ouverte ou non.
 // operation: C'est l'operation qui pourra être exécutée une fois que la confirmation
 //            est faite.
 // messages:  C'est l'objet qui contient les traductions fr et en.
 // handleCacherModale: C'est la fonction qui cache la modale.
export default class ModaleConfirmation extends Component {
  constructor(props) {
  	super(props)

  	this.state = {

  	}
  }

  // Fonction qui apelle l'operation passée en prop à la modale
  handleOperation = () => {
    this.props.operation();
  }

  render() {
    return (
	    <Modal show={this.props.modaleOuverte} onHide={this.props.handleCacherModale}>
	      <Modal.Header closeButton>
	        <Modal.Title>Confirmation</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
          {this.props.messages.commun.messageConfirmation}
	      </Modal.Body>
	      <Modal.Footer>
          <Button className="btn btn-primary"
            onClick={this.handleOperation}>{this.props.messages.commun.confirmer}</Button>
	        <Button onClick={this.props.handleCacherModale}>{this.props.messages.commun.fermer}</Button>
	      </Modal.Footer>
	    </Modal>
	  );
  }
}
