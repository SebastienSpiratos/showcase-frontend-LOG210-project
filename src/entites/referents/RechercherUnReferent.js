import React, { Component } from 'react';
import * as $ from 'jquery';
import ListeReferents from './ListeReferents';
import SearchInput, {createFilter} from 'react-search-input'
import ModaleRechercheReferent from './ModaleRechercheReferent';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

const KEYS_TO_FILTERS = ['nom', 'prenom', 'organisme.nom', 'titre', 'tel_cell', 'tel_bureau', 'dossiers.idDossier']

export default class RechercherUnReferent extends Component {
  // props: messages, listeReferents, langue
  constructor(props){
    super(props)

    this.state = {
       searchTerm: "",
       selectionReferent: "",
    };
  }

  // Sélectionne un organisme pour la boîte modale
  selectionReferent = (selection) => {
    if (selection !== this.state.selectionReferent) {
      /* istanbul ignore next */
      this.setState({selectionReferent: selection});
    } else {
      /* istanbul ignore next */
      this.setState({selectionReferent: ""});
    }
  }

  searchUpdated = (term) => {
    /* istanbul ignore next */
    this.setState({searchTerm: term})
  }

  filtrerListe = () => {
    return this.props.listeReferents.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
  }


  render() {
    return (
      <div className="RechercherUnReferent">
        <h2>{this.props.messages.gererReferents.titreRecherche}</h2>
        <SearchInput className="search-input" onChange={this.searchUpdated} placeholder={this.props.messages.commun.recherche}/>
        <ListeReferents messagesEntite={this.props.messages.gererReferents}
                        listeReferents={this.filtrerListe()}
                        selectionReferent={this.selectionReferent}/>
        <ModaleRechercheReferent referent={this.state.selectionReferent}
                                 messages={this.props.messages}/>
      </div>
    );
  }
}
