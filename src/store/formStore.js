import { reactive } from 'vue';

export const formStore = reactive({
  prenom: '',
  nom: '',
  fonction: '',
  telephone: '',
  email: '',
//page 2
  entreprise: '',
  adresse: '',
  dateCreation: '',
  siret: '',
  effectif: '',
  structureJuridique: '',
  siteWeb: '',
  autreLieu: '',
  
//page3
  nomSolution: '',
description: '',
problematique: '',
typeInnovation: '',
benefices: '',
caractereInnovant: '',
coconception: '',
implication: '',
comite: '',

//paage5
equipe: '',
accompagnement: '',
tiersLieu: '',
pourquoiRI2S: '',

schemaTechnique: null,
trl: '',
justificationTRL: '',
dispositifMedical: '',
justificationDispositif: '',
classeDispositif: '',
//page7
besoinsAccompagnement: [],
autreBesoin: '',
descriptionBesoins: '',
questionProjet: '',
terrainExperimentation: '',

conclusion: '',
documentsConclusion: [],
idUtilisateurGenere: null,
});