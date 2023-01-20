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
  referentsAssocies: []
};

export default class GererReferents extends Component {
  constructor(props){
    super(props)

    this.state = {
      referentAModifier: ""
    };
  }

  componentDidMount = () => {
    this.updateReferentsAssocies();
  }

  // Sélectionne un organisme pour la boîte modale
  selectionReferent = (selection) => {
    if (selection !== this.state.referentAModifier) {
      /* istanbul ignore next */
      this.setState({referentAModifier: selection});
    } else {
      /* istanbul ignore next */
      this.setState({referentAModifier: null});
    }
  }

  // Liste des référents associés à l'organisme référent en cours
  updateReferentsAssocies = () => {
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
          if (correspondanceTrouvee) {
            liste[liste.length] = self.props.listeReferents[i];
          }
        }
        /* istanbul ignore next */
        self.setState({referentsAssocies: liste});
    })
    // Catch l'erreur au besoin (il faut attendre le timeout)
    .catch((error) => {
      // Données locales
      var liste = [];
      for (var i = 0; i <= self.props.listeReferents.length - 1; i++) {
        var correspondanceTrouvee = false;
        for (var j = 0; j <= self.props.orgReferent.referents.length - 1; j++) {
          if (self.props.listeReferents[i].id === self.props.orgReferent.referents[j].id) {
            correspondanceTrouvee = true;
          }
        }
        if (correspondanceTrouvee) {
          liste[liste.length] = self.props.listeReferents[i];
        }
      }
      /* istanbul ignore next */
      self.setState({referentsAssocies: liste});
    });
  }

  render() {
    return (
      <div className="gererReferents">
        <h2>{this.props.messages.gererReferents.titre} - {this.props.orgReferent.nom}</h2>
        <ListeReferents messagesEntite={this.props.messages.gererReferents}
                        listeReferents={this.state.referentsAssocies}
                        selectionReferent={this.selectionReferent} />
        <ModaleReferents messagesEntite={this.props.messages.gererReferents}
                         messagesCommuns={this.props.messages.commun}
                         selectionnerSection={this.props.selectionnerSection}
                         referentAModifier={this.state.referentAModifier}
                         updateReferentsAssocies={this.updateReferentsAssocies}
                         orgReferent={this.props.orgReferent}
                         getListeReferents={this.props.getListeReferents}
                         listeReferents={this.props.listeReferents}
                         listeReferentsAssocies={this.state.referentsAssocies}
                         activerRequetesGet={this.props.activerRequetesGet}/>
      </div>
    );
  }
}
