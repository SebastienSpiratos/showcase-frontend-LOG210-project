import React, { Component } from 'react';
import './css/Commun.css';
import './css/App.css';
import messagesFr from "./translations/fr.json";
import messagesEn from "./translations/en.json";
import * as $ from 'jquery';
import Login from './Login';
import Accueil from './Accueil';
import Navigation from './Navigation';
import GererUtilisateurs from './entites/utilisateurs/GererUtilisateurs';
import GererOrganismes from './entites/organismes/GererOrganismes';
import GererOrganismesReferents from './entites/organismesReferents/GererOrganismesReferents';
import GererReferents from './entites/referents/GererReferents';
import RechercherUnReferent from './entites/referents/RechercherUnReferent';
import GererProfil from './GererProfil';
import axios from 'axios';

// JSON pour la liste d'utilisateurs par défaut
const listeUtilisateursParDefaut = [
  {
    id: 1,
    nom: "directeur",
    courriel: "directeur@admin.com",
    role: {id: 1, fr:"directeur", en:"director"},
    estActif: 1
  },
  {
    id: 2,
    nom: "coordonnateur",
    courriel: "coordonnateur@admin.com",
    role: {id: 2, fr:"coordonnateur", en:"coordinator"},
    estActif: 1
  },
  {
    id: 3,
    nom: "intervenant",
    courriel: "intervenant@admin.com",
    role: {id: 3, fr:"intervenant", en:"speaker"},
    estActif: 1
  },
  {
    id: 4,
    nom: "employe",
    courriel: "employe@admin.com",
    role: {id: 4, fr:"employe", en:"employee"},
    estActif: 1
  },
];

// JSON pour la liste d'organismes par défaut
const listeOrganismesParDefaut = [
  {
    id: 1,
    nom: "Illuminati",
    adresse: "Domaine des Vaux de Cernay, 78720 Cernay-la-ville, France",
    telephone: "(666) 1234-5678",
    courriel: "rothschild@illuminati.com",
    fax: "+44 1-2222 8888",
    estActif: 1
  },
  {
    id: 2,
    nom: "Télétubbies",
    adresse: "Planète Mars",
    telephone: "(123) 765-4321",
    courriel: "tinkywinky@teletubies.io",
    fax: "+44 1-2222 8888",
    estActif: 1
  }
];

// JSON pour la liste d'organismes referents par défaut
const listeOrganismesReferentsParDefaut = [
  {
    id: 1,
    nom: "Org Ref 1",
    adresse: "111 Beauchemin, Montreal, Qc, J5F2H7",
    tel: "123-777-8888",
    fax: "+44 1-2222 8888",
    courriel: "orgRef1@test.com",
    siteWeb: "www.orgRef1.com",
    estActif: 1,
    organisme: {
      id: 2,
      nom: "Télétubbies",
      adresse: "Planète Mars",
      telephone: "(123) 765-4321",
      courriel: "tinkywinky@teletubies.io",
      fax: "+44 1-2222 8888",
      estActif: 1
    },
    referents: [
      {
        id: 1,
        nom: "Reférent",
        prenom: "1",
        titre: "Buddha",
        telephone: "321-765-4321",
        telBureau: "321-777-8888",
        fax: "+44 1-4569 3217",
        courriel: "referent1@test.com",
        rapportFax: 1,
        rapportCourriel: 1,
        rapportPapier: 0
      }
    ]
  }
];

// JSON pour la liste d'organismes referents par défaut
const listeReferentsParDefaut = [
  {
    id: 1,
    nom: "Reférent",
    prenom: "1",
    titre: "Buddha",
    tel_cell: "321-765-4321",
    tel_bureau: "321-777-8888",
    fax: "+44 1-4569 3217",
    courriel: "referent1@test.com",
    rapport_fax: 1,
    rapport_courriel: 1,
    rapport_papier: 0
  },
  {
    id: 2,
    nom: "Reférent",
    prenom: "2",
    titre: "Le Grand Manitou",
    tel_cell: "243-765-3548",
    tel_bureau: "579-219-2341",
    fax: "+44 1-4569 2117",
    courriel: "referent2@test.com",
    rapport_fax: 0,
    rapport_courriel: 0,
    rapport_papier: 1
  }
];

const listeRolesDefaut = [
    {id: 1, fr:"directeur", en:"director"},
    {id: 2, fr:"coordonnateur", en:"coordinator"},
    {id: 3, fr:"intervenant", en:"speaker"},
    {id: 4, fr:"employe", en:"empoyee"}
];

// State initial de l'app
const stateInitial = {
  langue: "fr",
  messages: messagesFr,
  listeUtilisateurs: [],
  listeOrganismes: [],
  listeOrganismesReferents: [],
  listeReferents: [],
  listeRoles: [],
  utilisateurCourant: {
    id: -1,
    nom: "",
    courriel: "",
    role: {id: 0, fr:"", en:""},
    estActif: 0
  },
  orgReferentEnCours: "",
  section: "",
  effectuerRequetesGet: false,
};

export default class App extends Component {
  constructor(){
    super()

    // On set le state initial de l'app avec la constante créé plus haut
    this.state = stateInitial;

    this.selectionnerOrgReferent = this.selectionnerOrgReferent.bind(this);
  }

  // Fonction du cycle de vie du component qui est exécutée quand il a fini
  // de se loader
  componentDidMount = () => {
    // On cherche la liste d'utilisateurs
    this.getListeUtilisateurs();
    // On cherche la liste d'organismes
    this.getListeOrganismes();
    // On cherche la liste d'organismes referents
    this.getListeOrganismesReferents();
    // On cherche la liste de referents
    this.getListeReferents();
    // On cherche la liste de roles
    this.getRoles();
  }

  // Désactiver les requêtes get et utiliser les informations de la cache
  desactiverRequetesGet = () => {
    /* istanbul ignore next */
    this.setState({ effectuerRequetesGet: false });
  }

  // Activer les requêtes get
  activerRequetesGet = () => {
    /* istanbul ignore next */
    this.setState({ effectuerRequetesGet: true });
  }

  // Fonction qui change le json utilisé basé sur la langue selectionnée
  setMessagesSelonLangue = () => {
    if(this.state.langue === "fr")
    /* istanbul ignore next */
      this.setState({messages: messagesFr});
    if(this.state.langue === "en")
    /* istanbul ignore next */
      this.setState({messages: messagesEn});
  }

  // Fonction qui change la langue dans le state de l'application
  changerLangue = () => {
    // Cacher le message d'erreur si il est affiché
    $("#message-erreur").addClass("hidden");

    if (this.state.langue === "fr")
    /* istanbul ignore next */
      this.setState({langue: "en"}, () =>
      this.setMessagesSelonLangue());
    if (this.state.langue === "en")
    /* istanbul ignore next */
      this.setState({langue: "fr"}, () =>
      this.setMessagesSelonLangue());
  }

  // Fonction qui charge la liste d'utilisateurs
  getListeUtilisateurs = () => {
    if(sessionStorage.getItem("utilisateurs") === null || this.state.effectuerRequetesGet === true) {
      axios.get('/api/usager')
        .then((response) => {
          // On set la liste d'utilisateurs
          /* istanbul ignore next */
          console.log("Requete backend pour utilisateurs...");
          /* istanbul ignore next */
          this.setState({listeUtilisateurs: response.data});
          /* istanbul ignore next */
          sessionStorage.setItem("utilisateurs", JSON.stringify(response.data));
          /* istanbul ignore next */
          this.desactiverRequetesGet();
      })
        // Catch l'erreur au besoin
        .catch((error) => {
          /* istanbul ignore next */
          this.setState({listeUtilisateurs: listeUtilisateursParDefaut });
      });
    }
    else {
      /* istanbul ignore next */
      console.log("Recherche des utilisateurs dans la cache locale...");
      /* istanbul ignore next */
      this.setState({listeUtilisateurs: JSON.parse(sessionStorage.utilisateurs)});
    }
  }

  // Fonction qui charge la liste d'organismes
  getListeOrganismes = () => {
    if(sessionStorage.getItem("organismes") === null || this.state.effectuerRequetesGet === true) {
      axios.get('/api/organisme')
        .then((response) => {
          // On set la liste d'utilisateurs
          /* istanbul ignore next */
          console.log("Requete backend pour organismes...");
          /* istanbul ignore next */
          this.setState({listeOrganismes: response.data});
          /* istanbul ignore next */
          sessionStorage.setItem("organismes", JSON.stringify(response.data));
          /* istanbul ignore next */
          this.desactiverRequetesGet();
      })
        // Catch l'erreur au besoin
      .catch((error) => {
        /* istanbul ignore next */
        this.setState({listeOrganismes: listeOrganismesParDefaut });
      });
    }
    else {
      /* istanbul ignore next */
      console.log("Recherche des organismes dans la cache locale...");
      /* istanbul ignore next */
      this.setState({listeOrganismes: JSON.parse(sessionStorage.getItem("organismes"))});
    }
  }

  // Fonction qui charge la liste d'organismes referents
  getListeOrganismesReferents = () => {
    if(sessionStorage.getItem("organismesReferents") === null || this.state.effectuerRequetesGet === true) {
      axios.get('/api/organismereferent')
        .then((response) => {
          // On set la liste d'utilisateurs
          /* istanbul ignore next */
          console.log("Requete backend pour organismes referents...");
          /* istanbul ignore next */
          this.setState({listeOrganismesReferents: response.data});
          /* istanbul ignore next */
          sessionStorage.setItem("organismesReferents", JSON.stringify(response.data));
          /* istanbul ignore next */
          this.desactiverRequetesGet();
      })
        // Catch l'erreur au besoin
      .catch((error) => {
        /* istanbul ignore next */
        this.setState({listeOrganismesReferents: listeOrganismesReferentsParDefaut });
      });
    }
    else {
      /* istanbul ignore next */
      console.log("Recherche des organismes referents dans la cache locale...");
      /* istanbul ignore next */
      this.setState({listeOrganismesReferents: JSON.parse(sessionStorage.getItem("organismesReferents"))});
    }
  }

  // Fonction qui charge la liste de référents
  getListeReferents = () => {
    if(sessionStorage.getItem("referents") === null || this.state.effectuerRequetesGet === true) {
      axios.get('/api/referent')
        .then((response) => {
          // On set la liste d'utilisateurs
          //console.log("Requete backend pour referents...");
          this.setState({listeReferents: response.data});
          /* istanbul ignore next */
          sessionStorage.setItem("referents", JSON.stringify(response.data));
          /* istanbul ignore next */
          this.desactiverRequetesGet();
      })
        // Catch l'erreur au besoin
      .catch((error) => {
        /* istanbul ignore next */
        this.setState({listeReferents: listeReferentsParDefaut });
      });
    }
    else {
      /* istanbul ignore next */
      console.log("Recherche des referents dans la cache locale...");
      /* istanbul ignore next */
      this.setState({listeReferents: JSON.parse(sessionStorage.getItem("referents"))});
    }
  }

  // Cherche la liste de roles au backend
  getRoles = () => {
    if(sessionStorage.getItem("roles") === null || this.state.effectuerRequetesGet === true) {
      var listeRoles = [];

      axios.get('/api/role')
        .then((response) => {
          /* istanbul ignore next */
          console.log("Requete backend pour roles...");
          listeRoles = response.data;
          /* istanbul ignore next */
          this.setState({listeRoles: listeRoles});
          /* istanbul ignore next */
          sessionStorage.setItem("roles", JSON.stringify(response.data));
          /* istanbul ignore next */
          this.desactiverRequetesGet();
      })
        .catch((error) => {
          /* istanbul ignore next */
          this.setState({listeRoles: listeRolesDefaut});
      })
    }
    else {
      /* istanbul ignore next */
      console.log("Recherche des roles dans la cache locale...");
      /* istanbul ignore next */
      this.setState({listeRoles: JSON.parse(sessionStorage.getItem("roles"))});
    }
  }

  // Fonction qui recoit un utilisateur en paramètre et qui le set dans le state
  // comme utilisateurCourant.
  loginUtilisateur = (utilisateur) => {
    /* istanbul ignore next */
    this.setState({utilisateurCourant: utilisateur});
  }

  // Fonction qui met à jour les infos de l'utilisateur courant en cas de
  // modification de profil
  updateUtilisateurCourant = (utilisateur) => {
    /* istanbul ignore next */
    this.getListeUtilisateurs();
    /* istanbul ignore next */
    this.setState({utilisateurCourant: utilisateur});
  }

  // Fonction qui recoit une section en paramètre et qui la set dans le state
  selectionnerSection = (section) => (e) => {
    /* istanbul ignore next */
    this.setState({section: section});
  }

  // Fonction qui recoit un organisme référent en cours en paramètre et qui la set dans le state
  selectionnerOrgReferent = (orgReferent) => {
    /* istanbul ignore next */
    this.setState({orgReferentEnCours: orgReferent});
  }

  // Fonction qui render la section login si aucun utilisateur courant
  // n'est choisi
  renderSectionLogin = () => {
    if(this.state.utilisateurCourant.id === -1)
      return <Login messages={this.state.messages}
                    listeUtilisateurs={this.state.listeUtilisateurs}
                    loginUtilisateur={this.loginUtilisateur}/>;
    else
      return "";
  }

  renderSectionAccueil = () => {
    if(this.state.utilisateurCourant.id !== -1 && this.state.section === "")
      return <Accueil messages={this.state.messages}
                      selectionnerSection={this.selectionnerSection}
                      utilisateurCourant={this.state.utilisateurCourant} />;
    else
      return "";
  }

  renderNavigation = () => {
    if(this.state.utilisateurCourant.id !== -1)
      return <Navigation messages={this.state.messages}
                      selectionnerSection={this.selectionnerSection}
                      utilisateurCourant={this.state.utilisateurCourant} />;
    else
      return "";
  }

  // Fonction qui render la section gererUtilisateurs si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererUtilisateurs = () => {
    if(this.state.utilisateurCourant.id !== -1 &&
       (this.state.utilisateurCourant.role.id === 1 ||
       this.state.utilisateurCourant.role.id === 2) &&
       this.state.section === "gererUtilisateurs")
      return <GererUtilisateurs messages={this.state.messages}
                         listeUtilisateurs={this.state.listeUtilisateurs}
                         langue={this.state.langue}
                         getListeUtilisateurs={this.getListeUtilisateurs}
                         utilisateurCourant={this.state.utilisateurCourant}
                         activerRequetesGet={this.activerRequetesGet}/>;
    else
      return "";
  }

  // Fonction qui render la section gererProfil si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererProfil = () => {
    if(this.state.utilisateurCourant.id !== -1 &&
       this.state.section === "gererProfil")
      return <GererProfil messages={this.state.messages}
                         utilisateurCourant={this.state.utilisateurCourant}
                         langue={this.state.langue}
                         updateUtilisateurCourant={this.updateUtilisateurCourant}/>;
    else
      return "";
  }

  // Fonction qui render la section gererOrganismes si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererOrganismes = () => {
    if(this.state.utilisateurCourant.role.id === 1 && this.state.section === "gererOrganismes")
      return <GererOrganismes messages={this.state.messages}
                         listeOrganismes={this.state.listeOrganismes}
                         langue={this.state.langue}
                         getListeOrganismes={this.getListeOrganismes}
                         activerRequetesGet={this.activerRequetesGet} />;
    else
      return "";
  }

  // Fonction qui render la section gererOrganismesReferents si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererOrganismesReferents = () => {
    if(this.state.utilisateurCourant.role.id <= 4 && this.state.section === "gererOrganismesReferents")
      return <GererOrganismesReferents messages={this.state.messages}
                         utilisateurCourant={this.state.utilisateurCourant}
                         selectionnerSection={this.selectionnerSection}
                         selectionnerOrgReferent={this.selectionnerOrgReferent}
                         listeOrganismes={this.state.listeOrganismes}
                         listeOrganismesReferents={this.state.listeOrganismesReferents}
                         langue={this.state.langue}
                         getListeOrganismes={this.getListeOrganismes}
                         getListeOrganismesReferents={this.getListeOrganismesReferents}
                         activerRequetesGet={this.activerRequetesGet}/>;
    else
      return "";
  }

  // Fonction qui render la section gererReferents si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererReferents = () => {
    if(this.state.utilisateurCourant.role.id <= 4 && this.state.section === "gererReferents")
      return <GererReferents messages={this.state.messages}
                         utilisateurCourant={this.state.utilisateurCourant}
                         selectionnerSection={this.selectionnerSection}
                         orgReferent={this.state.orgReferentEnCours}
                         listeReferents={this.state.listeReferents}
                         getListeReferents={this.getListeReferents}
                         langue={this.state.langue}
                         activerRequetesGet={this.activerRequetesGet}/>;
    else
      return "";
  }

  // Fonction qui render la section rechercherReferent si un utilisateur courant
  // est choisi et si cette section est choisie
  renderSectionGererRechercherUnReferent = () => {
    if(this.state.utilisateurCourant.role.id <= 4 && this.state.section === "rechercherReferent")
      return <RechercherUnReferent messages={this.state.messages}
                         listeReferents={this.state.listeReferents}
                         langue={this.state.langue} />;
    else
      return "";
  }

  render() {
    var utilisateurCourant = (this.state.utilisateurCourant.id !== -1) ?
      this.state.messages.app.libelleUtilisateur+": "+this.state.utilisateurCourant.nom :
      "";
    var lienProfile = (this.state.utilisateurCourant.id !== -1) ?
       <a onClick={this.selectionnerSection("gererProfil")}>{this.state.messages.profil.lienInitial}</a> :
      "";
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-section-gauche">
            <h1 className="App-title">{this.state.messages.app.titre}</h1>
            <button className="btn btn-primary"
              onClick={this.changerLangue}>{this.state.messages.app.boutonLangue}
            </button>
          </div>
          <div className="header-section-centre">
          </div>
          <div className="header-section-droite">
            {utilisateurCourant}<br/>
            {lienProfile}
          </div>
        </header>
        <div className="components">
          <div className="navigation">
            {this.renderNavigation()}
          </div>
          <div className="sections">
            {this.renderSectionLogin()}
            {this.renderSectionAccueil()}
            {this.renderSectionGererUtilisateurs()}
            {this.renderSectionGererOrganismes()}
            {this.renderSectionGererOrganismesReferents()}
            {this.renderSectionGererReferents()}
            {this.renderSectionGererRechercherUnReferent()}
            {this.renderSectionGererProfil()}
          </div>
        </div>
      </div>
    );
  }
}
