import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import ListeUtilisateurs from './ListeUtilisateurs'
import ModaleUtilisateurs from './ModaleUtilisateurs';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

export default class GererUtilisateurs extends Component {
  constructor(props){
    super(props)

    this.state = {
      utilisateurAModifier: ""
    };
  }

  // Sélectionne un utilisateur pour la boîte modale
  selectionUtilisateur = (selection) => {
    if (selection !== this.state.utilisateurAModifier) {
      /* istanbul ignore next */
      this.setState({utilisateurAModifier: selection});
    } else {
      /* istanbul ignore next */
      this.setState({utilisateurAModifier: null});
    }
  }

  render() {
    return (
      <div className="gererUtilisateurs">
        <h2>{this.props.messages.gererUtilisateurs.titre}</h2>
        <ListeUtilisateurs messages={this.props.messages}
                           listeUtilisateurs={this.props.listeUtilisateurs}
                           langue={this.props.langue}
                           selectionUtilisateur={this.selectionUtilisateur}
                           utilisateurCourant={this.props.utilisateurCourant}/>
        <ModaleUtilisateurs messagesEntite={this.props.messages.gererUtilisateurs}
                            messagesCommuns={this.props.messages.commun}
                            langue={this.props.langue}
                            utilisateurAModifier={this.state.utilisateurAModifier}
                            getListeUtilisateurs={this.props.getListeUtilisateurs}
                            utilisateurCourant={this.props.utilisateurCourant}
                            activerRequetesGet={this.props.activerRequetesGet}/>
      </div>
    );
  }
}
