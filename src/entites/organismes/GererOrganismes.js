import React, { Component } from 'react';
import * as $ from 'jquery';
import ListeOrganismes from './ListeOrganismes';
import ModaleOrganismes from './ModaleOrganismes';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

// Mode de sélection des organismes
var selectRowProp = {
  mode: "radio",
  clickToSelect: true
};

export default class GererOrganismes extends Component {
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
    } else {
      /* istanbul ignore next */
      this.setState({organismeAModifier: null});
    }
  }

  render() {
    return (
      <div className="gererOrganismes">
        <h2>{this.props.messages.gererOrganismes.titre}</h2>
        <ListeOrganismes messages={this.props.messages}
                         listeOrganismes={this.props.listeOrganismes}
                         selectionOrganisme={this.selectionOrganisme} />
        <ModaleOrganismes messagesEntite={this.props.messages.gererOrganismes}
                          messagesCommuns={this.props.messages.commun}
                          organismeAModifier={this.state.organismeAModifier}
                          getListeOrganismes={this.props.getListeOrganismes}
                          activerRequetesGet={this.props.activerRequetesGet}/>
      </div>
    );
  }
}
