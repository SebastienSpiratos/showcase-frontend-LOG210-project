import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as $ from 'jquery';
import '../../css/Commun.css';
import '../../css/GererEntite.css';

// Mode de sélection des organismes
const selectRowProp = {
  mode: "radio",
  clickToSelect: true
};

export default class ListeOrganismesReferents extends Component {
  constructor(props){
    super(props)

    this.state = {
    };
  }

  // Options de la liste bootstrap
  options = () => {
    // Rendre "this" accessible dans les déclarations de sous-fonctions

    /* istanbul ignore next */
    return({
      onRowClick: (row) => {
        this.props.selectionOrganisme(row)
    }});
  }

  /* istanbul ignore next */
  formatNomOrg(cell, row){
    return row.organisme.nom;
  }

  // Faire le rendu de la liste d'organismes
  renderListeOrganismes = () => {
    return (
      <div className="ListeOrganismesReferents">
        <BootstrapTable
          data={this.props.listeOrganismes}
          selectRow={selectRowProp}
          options={this.options()}
          striped
          hover
          condensed
          pagination
        >
          <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="nom">{this.props.messages.gererOrganismes.libelleNom}</TableHeaderColumn>
          <TableHeaderColumn dataField="adresse" dataAlign="center">{this.props.messages.gererOrganismes.libelleAdresse}</TableHeaderColumn>
          <TableHeaderColumn dataField="tel" dataAlign="center">{this.props.messages.gererOrganismes.libelleTelephone}</TableHeaderColumn>
          <TableHeaderColumn dataField="fax" dataAlign="center">{this.props.messages.gererOrganismes.libelleFax}</TableHeaderColumn>
          <TableHeaderColumn dataField="courriel" dataAlign="center">{this.props.messages.gererOrganismes.libelleCourriel}</TableHeaderColumn>
          <TableHeaderColumn dataField="siteWeb" dataAlign="center">{this.props.messages.gererOrganismes.libelleSiteWeb}</TableHeaderColumn>
          <TableHeaderColumn dataField="estActif" dataAlign="center">{this.props.messages.gererOrganismes.libelleActif}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
    //  <TableHeaderColumn dataField="organisme" dataFormat={this.formatNomOrg} dataAlign="center">Org</TableHeaderColumn>
  }

  render() {
    return (
      <div className="section-liste">
        {this.renderListeOrganismes()}
      </div>
    );
  }
}
