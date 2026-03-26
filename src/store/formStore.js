import { reactive } from 'vue';

export const formStore = reactive({
  dejaInscrit: false,
  idUtilisateurGenere: null,
  experimentationsListe: [],

  prenom: '',
  nom: '',
  naissance: '',

  telephone: '',
  email: '',
  codePostal: '',
  profilSante: '',

  momentContact: [],
  informationsComplementaires: '',
  experimentationChoisie: '',

  role: '',

  prochePrenom: '',
  procheNom: '',
  procheNaissance: '',

  procheTelephone: '',
  procheEmail: '',
  procheCodePostal: '',

  procheMomentContact: [],
  procheInfosComplementaires: '',
});
