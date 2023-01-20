import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FormateurRole from './FormateurRole';
import * as $ from 'jquery';
import '../../css/Commun.css';
import '../../css/GererEntite.css';
import axios from 'axios';

// Mode de sélection des organismes
const selectRowProp = {
  mode: "radio",
  clickToSelect: true
};

export default class ListeUtilisateurs extends Component {
  constructor(props){
    super(props)

    this.state = {
    };
  }

  // Options de la liste bootstrap
  options() {
    // Rendre "this" accessible dans les déclarations de sous-fonctions
    var self = this

    return({
      onRowClick: function(row) {
        self.props.selectionUtilisateur(row)
    }});
  }

  formateurRole = (cell, row) => {
    return (
      <FormateurRole role={cell}
                    langue={this.props.langue} />
    );
  }

  // Fonction qui filtre la liste d'utilisateurs à gérer pour qu'elle
  // exclue l'utilisateur courant.
  filtrerListeUtilisateurs = () => {
    var listeInitiale = this.props.listeUtilisateurs;
    var listeFinale = [];
    for (var i=0; i<listeInitiale.length; ++i) {
      if(listeInitiale[i].id != this.props.utilisateurCourant.id)
        listeFinale.push(listeInitiale[i]);
    }
    return listeFinale;
  }

  render() {
    return (
      <div className="listeUtilisateurs">
        <BootstrapTable
          data={this.filtrerListeUtilisateurs()}
          selectRow={selectRowProp}
          options={this.options()}
          striped
          hover
          condensed
          pagination
        >
          <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="nom" dataAlign="center">{this.props.messages.gererUtilisateurs.libelleNom}</TableHeaderColumn>
          <TableHeaderColumn dataField="courriel" dataAlign="center">{this.props.messages.gererUtilisateurs.libelleCourriel}</TableHeaderColumn>
          <TableHeaderColumn dataField="role" dataAlign="center" dataFormat={this.formateurRole}>{this.props.messages.gererUtilisateurs.libelleRole}</TableHeaderColumn>
          <TableHeaderColumn dataField="estActif" dataAlign="center">{this.props.messages.gererUtilisateurs.libelleActif}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
