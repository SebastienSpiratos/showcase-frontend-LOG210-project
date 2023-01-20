import React, { Component } from 'react';
import * as $ from 'jquery';
import ListeOrganismesReferents from './ListeOrganismesReferents';
import ModaleOrganismesReferents from './ModaleOrganismesReferents';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

// Mode de sélection des organismes
var selectRowProp = {
  mode: "radio",
  clickToSelect: true
};

export default class GererOrganismesReferents extends Component {
  constructor(props){
    super(props)

    this.state = {
      organismeAModifier: ""
    };
  }

  // Sélectionne un organisme pour la boîte modale
  selectionOrganisme = (selection) => {
    if (selection !== this.state.organismeAModifier) {
      /* istanbul ignore next */
      this.setState({organismeAModifier: selection});
      this.props.selectionnerOrgReferent(selection);
    } else {
      /* istanbul ignore next */
      this.setState({organismeAModifier: null});
      this.props.selectionnerOrgReferent(null);
    }

  }

  render() {
    return (
      <div className="gererOrganismesReferents">
        <h2>{this.props.messages.gererOrganismes.titreOrgRef}</h2>
        <ListeOrganismesReferents messages={this.props.messages}
                         listeOrganismes={this.props.listeOrganismesReferents}
                         selectionOrganisme={this.selectionOrganisme} />
        <ModaleOrganismesReferents messagesEntite={this.props.messages.gererOrganismes}
                          messagesCommuns={this.props.messages.commun}
                          selectionnerSection={this.props.selectionnerSection}
                          utilisateurCourant={this.props.utilisateurCourant}
                          organismeAModifier={this.state.organismeAModifier}
                          getListeOrganismes={this.props.getListeOrganismes}
                          getListeOrganismesReferents={this.props.getListeOrganismesReferents}
                          listeOrganismes={this.props.listeOrganismes}
                          activerRequetesGet={this.props.activerRequetesGet}/>
      </div>
    );
  }
}
