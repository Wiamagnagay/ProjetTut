import { reactive } from 'vue'

export const formStore = reactive({
  // Étape 1
  prenom: '',
  nom: '',
  naissance: '',
  // Étape 2
  telephone: '',
  email: '',
  codePostal: '',
  profilSante: '',
  //etape 3 et 4 
  momentContact: [],
  informationsComplementaires: "",
  experimentationChoisie: "",
  //etape 5 
  role: '',
  // étape 6
prochePrenom: '',
procheNom: '',
procheNaissance: '',
// étape 7
pocheTelephone: '',
procheEmail: '',
procheCodePostal: '',
// étape 8
pocheMomentContact: [],
pocheInfosComplementaires: '',
})