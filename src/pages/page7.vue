<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 7;

const errors = reactive({
  besoins: '',
  descriptionBesoins: '',
  questionProjet: '',
  terrainExperimentation: ''
});

const besoinsOptions = [
  "Evaluation usage/acceptabilité",
  "Etude clinique",
  "Déploiement et test sur des terrains d’expérimentations hors études cliniques",
  "Evaluation médico-économique",
  "Expertises métiers (si oui à préciser)",
  "Cohorte (séniors, aidant ou professionnels de santé)",
  "Market access",
  "Co-conception",
  "Autre"
];

if (!Array.isArray(formStore.besoinsAccompagnement)) {
  formStore.besoinsAccompagnement = [];
}

function clearErrors() {
  errors.besoins = '';
  errors.descriptionBesoins = '';
  errors.questionProjet = '';
  errors.terrainExperimentation = '';
}

function toggleBesoin(option) {
  const index = formStore.besoinsAccompagnement.indexOf(option);
  if (index === -1) {
    formStore.besoinsAccompagnement.push(option);
  } else {
    formStore.besoinsAccompagnement.splice(index, 1);
  }
}

function isChecked(option) {
  return formStore.besoinsAccompagnement.includes(option);
}

function validate() {
  clearErrors();

  if (!formStore.besoinsAccompagnement.length) {
    errors.besoins = 'Veuillez sélectionner au moins un besoin.';
  }

  if (
    formStore.besoinsAccompagnement.includes('Autre') &&
    !formStore.autreBesoin?.trim()
  ) {
    errors.besoins = 'Veuillez préciser le champ "Autre".';
  }

  if (!formStore.descriptionBesoins?.trim()) {
    errors.descriptionBesoins = 'Ce champ est obligatoire.';
  }

  if (!formStore.questionProjet?.trim()) {
    errors.questionProjet = 'Ce champ est obligatoire.';
  }

  if (!formStore.terrainExperimentation?.trim()) {
    errors.terrainExperimentation = 'Ce champ est obligatoire.';
  }

  return (
    !errors.besoins &&
    !errors.descriptionBesoins &&
    !errors.questionProjet &&
    !errors.terrainExperimentation
  );
}

function onBack() {
  router.push('/page6');
}

function onNext() {
  if (!validate()) return;
  router.push('/page8');
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" class="logo" />
    </header>

    <main class="main">
      <section class="card">
        <div class="cardTop">
          <button class="back" type="button" @click="onBack">← Retour</button>
          <div class="stepInfo">étape {{ stepNumber }}/{{ totalSteps }}</div>
        </div>

        <div class="headCenter">
          <h1>Formulaire de Candidature<br />Entreprise</h1>
          <p class="desc">
            En répondant à ce formulaire, vous acceptez que vos réponses soient
            enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
          </p>
        </div>

        <h2 class="sectionTitle">Technologie et niveau de maturité</h2>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label class="label">
              Quels sont vos besoins d’accompagnement?<span class="req">*</span>
            </label>

            <div class="checkboxGroup" :class="{ 'checkbox-error-box': errors.besoins }">
              <label
                v-for="option in besoinsOptions"
                :key="option"
                class="checkboxItem"
              >
                <input
                  type="checkbox"
                  :checked="isChecked(option)"
                  @change="toggleBesoin(option)"
                />
                <span>{{ option === 'Autre' ? 'Autre: ...' : option }}</span>
              </label>
            </div>

            <input
              v-if="formStore.besoinsAccompagnement.includes('Autre')"
              class="input autreInput"
              v-model.trim="formStore.autreBesoin"
              type="text"
              placeholder="Précisez votre autre besoin"
            />

            <p v-if="errors.besoins" class="error">{{ errors.besoins }}</p>
          </div>

          <div class="field">
            <label class="label">
              Pouvez-vous décrire vos besoins et ce que vous souhaitez réaliser avec RI2S ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.descriptionBesoins }"
              v-model.trim="formStore.descriptionBesoins"
              type="text"
            />
            <p v-if="errors.descriptionBesoins" class="error">{{ errors.descriptionBesoins }}</p>
          </div>

          <div class="field">
            <label class="label">
              À quelle question, problématique ou besoin d’évaluation souhaitez-vous répondre avec ce projet?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.questionProjet }"
              v-model.trim="formStore.questionProjet"
              type="text"
            />
            <p v-if="errors.questionProjet" class="error">{{ errors.questionProjet }}</p>
          </div>

          <div class="field">
            <label class="label">
              Si pertinent: sur quel(s) terrain(s) d’expérimentation souhaitez-vous expérimenter votre solution?
              Auprès de quel public? Quelle est la taille de cohorte souhaitée?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.terrainExperimentation }"
              v-model.trim="formStore.terrainExperimentation"
              type="text"
            />
            <p v-if="errors.terrainExperimentation" class="error">{{ errors.terrainExperimentation }}</p>
          </div>

          <div class="bottomRow">
            <p class="help">
              En cas de difficulté merci de nous contacter à cette adresse :
              <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a>
            </p>
            <button class="btn" type="submit">Continuer</button>
          </div>
        </form>
      </section>
    </main>

    <footer class="footer">
      <a href="#">Mentions légales</a>
      <div>Copyright © 2026 RI2S</div>
    </footer>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 48px;
  border-bottom: 1px solid #e5e5e5;
}

.logo {
  height: 42px;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 1150px;
  background: #f7f7f7;
  border: 2px solid #5cab53;
  border-radius: 32px;
  padding: 40px 44px 30px;
}

.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.back {
  background: #eef4ea;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  color: #6da35e;
  font-size: 14px;
  cursor: pointer;
}

.stepInfo {
  font-size: 24px;
  color: #2f3b52;
}

.headCenter {
  text-align: center;
  margin-bottom: 26px;
}

.headCenter h1 {
  font-size: 52px;
  line-height: 1.05;
  color: #25324b;
  margin: 0 0 22px;
  font-weight: 700;
}

.desc {
  max-width: 860px;
  margin: 0 auto;
  color: #3f4b5f;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;
}

.sectionTitle {
  margin: 0 0 18px;
  color: #25324b;
  font-size: 20px;
  font-weight: 700;
}

.form {
  margin-top: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.label {
  font-size: 13px;
  color: #1c1c1c;
  margin-bottom: 8px;
}

.req {
  color: #d62828;
  margin-left: 2px;
}

.checkboxGroup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.checkboxItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2f3b52;
}

.checkbox-error-box {
  padding: 6px;
  border: 1px solid red;
  border-radius: 10px;
  width: fit-content;
}

.input {
  width: 100%;
  height: 40px;
  border: 2px solid #9db7bf;
  border-radius: 20px;
  padding: 10px 16px;
  background: white;
  font-size: 14px;
  outline: none;
}

.autreInput {
  margin-top: 10px;
}

.bottomRow {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.help {
  margin: 0;
  color: #a52020;
  font-size: 12px;
}

.help a {
  color: #a52020;
  text-decoration: none;
}

.btn {
  min-width: 145px;
  height: 48px;
  background: #69b34c;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.footer {
  text-align: center;
  font-size: 13px;
  color: #4c5668;
  padding: 18px 10px 14px;
}

.footer a {
  display: block;
  margin-bottom: 8px;
  color: #3d63c8;
  text-decoration: none;
}

.input-error {
  border-color: red !important;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .topbar {
    flex-direction: column;
    height: auto;
    gap: 10px;
    padding: 18px;
  }

  .card {
    padding: 24px 20px;
  }

  .headCenter h1 {
    font-size: 34px;
  }

  .bottomRow {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>