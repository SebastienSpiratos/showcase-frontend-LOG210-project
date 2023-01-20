import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as $ from 'jquery';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

// Mode de sélection des référents
const selectRowProp = {
  mode: "radio",
  clickToSelect: true
};

export default class ListeReferents extends Component {
  constructor(props){
    super(props)

    this.state = {
    };
  }

  // Options de la liste bootstrap
  options = () => {
    // Rendre "this" accessible dans les déclarations de sous-fonctions

    return({
      onRowClick: (row) => {
        this.props.selectionReferent(row)
    }});
  }

  // Faire le rendu de la liste d'organismes
  renderListeReferents = () => {
    return (
      <div className="ListeReferents">
        <BootstrapTable
          data={this.props.listeReferents}
          selectRow={selectRowProp}
          options={this.options()}
          striped
          hover
          condensed
          pagination
        >
          <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="nom">{this.props.messagesEntite.libelleNom}</TableHeaderColumn>
          <TableHeaderColumn dataField="prenom" dataAlign="center">{this.props.messagesEntite.libellePrenom}</TableHeaderColumn>
          <TableHeaderColumn dataField="titre" dataAlign="center">{this.props.messagesEntite.libelleTitre}</TableHeaderColumn>
          <TableHeaderColumn dataField="tel_cell" dataAlign="center">{this.props.messagesEntite.libelleTelephone}</TableHeaderColumn>
          <TableHeaderColumn dataField="tel_bureau" dataAlign="center">{this.props.messagesEntite.libelleTelBureau}</TableHeaderColumn>
          <TableHeaderColumn dataField="fax" dataAlign="center">{this.props.messagesEntite.libelleFax}</TableHeaderColumn>
          <TableHeaderColumn dataField="courriel" dataAlign="center">{this.props.messagesEntite.libelleCourriel}</TableHeaderColumn>
          <TableHeaderColumn dataField="rapport_fax" dataAlign="center">{this.props.messagesEntite.libelleRapportFax}</TableHeaderColumn>
          <TableHeaderColumn dataField="rapport_courriel" dataAlign="center">{this.props.messagesEntite.libelleRapportCourriel}</TableHeaderColumn>
          <TableHeaderColumn dataField="rapport_papier" dataAlign="center">{this.props.messagesEntite.libelleRapportPapier}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

  render() {
    return (
      <div className="section-liste">
        {this.renderListeReferents()}
      </div>
    );
  }
}
