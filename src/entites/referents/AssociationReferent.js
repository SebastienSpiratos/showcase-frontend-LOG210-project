import React, { Component } from 'react';
import * as $ from 'jquery';
import ListeReferents from './ListeReferents';
import ModaleReferents from './ModaleReferents';
import '../../css/Commun.css';
import '../../css/GererEntite.css';
import axios from 'axios';

// Mode de sélection des organismes
var selectRowProp = {
  mode: "radio",
  clickToSelect: true,
  associationsPossibles: []
};

export default class AssociationReferent extends Component {
  constructor(props){
    super(props)

    this.state = {
      referentCourant: ""
    };
  }

  // Terminer la recherche
  terminerRecherche = () => {
    this.updateAssociationsPossibles();
    this.props.associerReferent(this.state.referentCourant);
    this.props.unmount();
  }

  // Sélectionne un organisme pour la boîte modale
  selectionReferent = (selection) => {
    if (selection !== this.state.referentCourant) {
      /* istanbul ignore next */
      this.setState({referentCourant: selection});
    } else {
      /* istanbul ignore next */
      this.setState({referentCourant: null});
    }
  }

  // Liste d'associations de référents possibles avec l'organisme référent en cours
  updateAssociationsPossibles = () => {
    var liste = [];
    var self = this;

    /* istanbul ignore next */
    axios.get('api/referent/parReferent/' + self.props.orgReferent.id)
      .then((response) => {
        const tailleListe = self.props.listeReferents.length;
        for (var i = 0; i <= tailleListe - 1; i++) {
          var correspondanceTrouvee = false;
          for (var j = 0; j <= response.data.length - 1; j++) {
            if (self.props.listeReferents[i].id === response.data[j].idReferent) {
              correspondanceTrouvee = true;
            }
          }
          if (!correspondanceTrouvee) {
            liste[liste.length] = self.props.listeReferents[i];
          }
        }
        /* istanbul ignore next */
        self.setState({associationsPossibles: liste});
    })
    // Catch l'erreur au besoin (il faut attendre le timeout)
    .catch((error) => {
      // Données locales
      var liste = [];
      for (var i = 0; i <= this.props.listeReferents.length - 1; i++) {
        var correspondanceTrouvee = false;
        for (var j = 0; j <= this.props.orgReferent.referents.length - 1; j++) {
          if (this.props.listeReferents[i].id === this.props.orgReferent.referents[j].id) {
            correspondanceTrouvee = true;
          }
        }
        if (!correspondanceTrouvee) {
          liste[liste.length] = this.props.listeReferents[i];
        }
      }
      /* istanbul ignore next */
      this.setState({associationsPossibles: liste});
    });
  }

  // Effectuer le rendu du bouton de modification
  renderBoutonAssociation = () => {
    if (this.state.referentCourant) {
      return (
        <button onClick={this.terminerRecherche()} className="btn btn-primary">
          {this.props.messagesCommuns.boutonAssociation}
        </button>
      );
    } else {
      return (
      <button className="btn btn-primary" disabled>
        {this.props.messagesCommuns.boutonAssociation}
      </button>
      );
    }
  }

  render() {
    return (
      <div className="rechercheReferent">
        <h2>{this.props.titre}</h2>
        <ListeReferents titre={this.props.messagesEntite.titreAssociation}
                        messagesEntite={this.props.messagesEntite}
                        listeReferents={this.state.associationsPossibles}
                        selectionReferent={this.selectionReferent} />
        {this.renderBoutonAssociation()}
      </div>
    );
  }
}
