<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 2;

const errors = reactive({
  entreprise: '',
  adresse: '',
  dateCreation: '',
  siret: '',
  effectif: '',
  structureJuridique: '',
  siteWeb: '',
  autreLieu: ''
});

const siretRegex = /^\d{14}$/;
const effectifRegex = /^\d+$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

function clearErrors() {
  errors.entreprise = '';
  errors.adresse = '';
  errors.dateCreation = '';
  errors.siret = '';
  errors.effectif = '';
  errors.structureJuridique = '';
  errors.siteWeb = '';
  errors.autreLieu = '';
}

function validate() {
  clearErrors();

  if (!formStore.entreprise?.trim()) {
    errors.entreprise = "Le nom de l'entreprise est obligatoire.";
  }

  if (!formStore.adresse?.trim()) {
    errors.adresse = "L'adresse est obligatoire.";
  }

  if (!formStore.dateCreation?.trim()) {
    errors.dateCreation = 'La date de création est obligatoire.';
  }

  if (formStore.siret?.trim() && !siretRegex.test(formStore.siret.trim())) {
    errors.siret = 'Le SIRET doit contenir 14 chiffres.';
  }

  if (formStore.effectif?.trim() && !effectifRegex.test(formStore.effectif.trim())) {
    errors.effectif = "L'effectif doit être un nombre.";
  }

  if (formStore.siteWeb?.trim() && !urlRegex.test(formStore.siteWeb.trim())) {
    errors.siteWeb = 'Veuillez entrer une URL valide.';
  }

  return (
    !errors.entreprise &&
    !errors.adresse &&
    !errors.dateCreation &&
    !errors.siret &&
    !errors.effectif &&
    !errors.structureJuridique &&
    !errors.siteWeb &&
    !errors.autreLieu
  );
}

function onBack() {
  router.push('/');
}

function onNext() {
  if (!validate()) return;
  router.push('/page3');
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

        <h2 class="sectionTitle">Informations administratives de l’entreprise</h2>

        <form class="form" @submit.prevent="onNext">
          <div class="grid">
            <div class="field">
              <label class="label">Nom de l'entreprise<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.entreprise }"
                v-model.trim="formStore.entreprise"
                type="text"
              />
              <p v-if="errors.entreprise" class="error">{{ errors.entreprise }}</p>
            </div>

            <div class="field small-date">
              <label class="label">Date de création<span class="req">*</span></label>
              <input
                class="input dateInput"
                :class="{ 'input-error': errors.dateCreation }"
                v-model="formStore.dateCreation"
                type="date"
              />
              <div class="hint">Obligatoire</div>
              <p v-if="errors.dateCreation" class="error">{{ errors.dateCreation }}</p>
            </div>

            <div class="field">
              <label class="label">Adresse<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.adresse }"
                v-model.trim="formStore.adresse"
                type="text"
              />
              <p v-if="errors.adresse" class="error">{{ errors.adresse }}</p>
            </div>

            <div class="field">
              <label class="label">Effectif (en ETP)</label>
              <input
                class="input"
                :class="{ 'input-error': errors.effectif }"
                v-model.trim="formStore.effectif"
                type="text"
                inputmode="numeric"
              />
              <p v-if="errors.effectif" class="error">{{ errors.effectif }}</p>
            </div>

            <div class="field">
              <label class="label">SIRET</label>
              <input
                class="input"
                :class="{ 'input-error': errors.siret }"
                v-model.trim="formStore.siret"
                type="text"
                inputmode="numeric"
                maxlength="14"
              />
              <p v-if="errors.siret" class="error">{{ errors.siret }}</p>
            </div>

            <div class="field">
              <label class="label">Site WEB</label>
              <input
                class="input"
                :class="{ 'input-error': errors.siteWeb }"
                v-model.trim="formStore.siteWeb"
                type="text"
                placeholder="https://..."
              />
              <p v-if="errors.siteWeb" class="error">{{ errors.siteWeb }}</p>
            </div>

            <div class="field">
              <label class="label">Structure juridique</label>
              <input
                class="input"
                :class="{ 'input-error': errors.structureJuridique }"
                v-model.trim="formStore.structureJuridique"
                type="text"
              />
              <p v-if="errors.structureJuridique" class="error">{{ errors.structureJuridique }}</p>
            </div>

            <div class="field empty-slot"></div>

            <div class="field full-row">
              <label class="label">Autre lieu utile</label>
              <input
                class="input"
                :class="{ 'input-error': errors.autreLieu }"
                v-model.trim="formStore.autreLieu"
                type="text"
              />
              <p v-if="errors.autreLieu" class="error">{{ errors.autreLieu }}</p>
            </div>
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
  max-width: 950px;
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
  border-radius: 10px;
  padding: 10px 18px;
  color: #6da35e;
  font-size: 14px;
  cursor: pointer;
}

.stepInfo {
  font-size: 22px;
  color: #2f3b52;
}

.headCenter {
  text-align: center;
  margin-bottom: 14px;
}

.headCenter h1 {
  font-size: 52px;
  line-height: 1.02;
  color: #25324b;
  margin: 0 0 18px;
  font-weight: 700;
}

.desc {
  max-width: 640px;
  margin: 0 auto;
  color: #3f4b5f;
  font-size: 15px;
  line-height: 1.45;
  text-align: left;
}

.sectionTitle {
  margin: 10px 0 18px;
  color: #25324b;
  font-size: 21px;
  font-weight: 700;
}

.form {
  margin-top: 8px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 36px;
  align-items: start;
}

.field {
  display: flex;
  flex-direction: column;
}

.full-row {
  grid-column: 1 / 3;
}

.label {
  font-size: 14px;
  color: #1c1c1c;
  margin-bottom: 6px;
}

.req {
  color: #d62828;
  margin-left: 2px;
}

.input {
  width: 100%;
  height: 42px;
  border: 2px solid #9db7bf;
  border-radius: 20px;
  padding: 0 16px;
  background: white;
  font-size: 14px;
  outline: none;
}

.dateInput {
  max-width: 170px;
}

.hint {
  margin-top: 4px;
  font-size: 12px;
  color: #4a4a4a;
}

.bottomRow {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.help {
  margin: 0;
  color: #a52020;
  font-size: 13px;
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

.empty-slot {
  display: block;
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

  .grid {
    grid-template-columns: 1fr;
  }

  .full-row {
    grid-column: auto;
  }

  .empty-slot {
    display: none;
  }

  .bottomRow {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .dateInput {
    max-width: 100%;
  }
}
</style>