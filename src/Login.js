import React, { Component } from 'react';
import * as $ from 'jquery';
import './css/Commun.css';
import './css/Login.css';

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {

    };
  }

  // Fonction qui selectionne l'utilisateur dans la liste à partir de son nom.
  selectionnerUtilisateur = () => {
    /* istanbul ignore next */
    $("#message-erreur").addClass("hidden");
    /* istanbul ignore next */
    var nomUtilisateur = $("#nomUtilisateur").val();
    for (var i=0;i<this.props.listeUtilisateurs.length;++i) {
      if(this.props.listeUtilisateurs[i].nom === nomUtilisateur) {
        if (this.props.listeUtilisateurs[i].estActif) {
          // On login l'utilisateur trouvé
          /* istanbul ignore next */
          this.props.loginUtilisateur(this.props.listeUtilisateurs[i]);
        }
        else {
          /* istanbul ignore next */
          $("#message-erreur").removeClass("hidden");
          /* istanbul ignore next */
          $("#message-erreur").text(this.props.messages.login.utilisateurDesactive);
        }
        // Quick exit
        /* istanbul ignore next */
        break;
      }
    }
  }

  render() {
    return (
      <div className="login">
          <h2>{this.props.messages.login.titre}</h2>
        <div>
          {this.props.messages.login.libelle}: <input id="nomUtilisateur" type="text" />
        </div>
        <div>
          <button onClick={this.selectionnerUtilisateur} className="btn btn-primary">Login</button><br/>
          <span id="message-erreur" className="hidden"></span>
        </div>
      </div>
    );
  }
}
