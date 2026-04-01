<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 6;

const selectedFileName = ref('');

const errors = reactive({
  trl: '',
  justificationTRL: '',
  dispositifMedical: '',
  justificationDispositif: '',
  classeDispositif: '',
});

function clearErrors() {
  errors.trl = '';
  errors.justificationTRL = '';
  errors.dispositifMedical = '';
  errors.justificationDispositif = '';
  errors.classeDispositif = '';
}

function onFileChange(event) {
  const file = event.target.files?.[0] || null;
  formStore.schemaTechnique = file;
  selectedFileName.value = file ? file.name : '';
}

function validate() {
  clearErrors();

  if (!formStore.trl) {
    errors.trl = 'Veuillez sélectionner un niveau TRL.';
  }

  if (!formStore.justificationTRL?.trim()) {
    errors.justificationTRL = 'Ce champ est obligatoire.';
  }

  if (!formStore.dispositifMedical?.trim()) {
    errors.dispositifMedical = 'Veuillez choisir une réponse.';
  }

  if (!formStore.justificationDispositif?.trim()) {
    errors.justificationDispositif = 'Ce champ est obligatoire.';
  }

  if (
    formStore.dispositifMedical === 'oui' &&
    !formStore.classeDispositif?.trim()
  ) {
    errors.classeDispositif = 'Veuillez préciser la classe.';
  }

  return (
    !errors.trl &&
    !errors.justificationTRL &&
    !errors.dispositifMedical &&
    !errors.justificationDispositif &&
    !errors.classeDispositif
  );
}

function onBack() {
  router.push('/page5');
}

function onNext() {
  if (!validate()) return;
  router.push('/page7');
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logo.png" alt="RI2S" class="logo" />
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
            <label class="label uploadLabel">
              Si pertinent, joindre un schéma technique de la solution.
            </label>

            <div class="uploadWrapper">
              <label
                for="schema-upload"
                class="uploadButton"
                title="Ajouter un fichier"
              >
                📄
              </label>
              <input
                id="schema-upload"
                class="fileInput"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                @change="onFileChange"
              />
              <span v-if="selectedFileName" class="fileName">{{
                selectedFileName
              }}</span>
            </div>
          </div>

          <div class="field">
            <label class="label">
              Quel est le TRL de votre solution ?<span class="req">*</span>
            </label>

            <div class="trlGrid" :class="{ 'radio-error-box': errors.trl }">
              <label class="radioItem"
                ><input type="radio" value="1" v-model="formStore.trl" />
                <span>1</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="4" v-model="formStore.trl" />
                <span>4</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="7" v-model="formStore.trl" />
                <span>7</span></label
              >

              <label class="radioItem"
                ><input type="radio" value="2" v-model="formStore.trl" />
                <span>2</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="5" v-model="formStore.trl" />
                <span>5</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="8" v-model="formStore.trl" />
                <span>8</span></label
              >

              <label class="radioItem"
                ><input type="radio" value="3" v-model="formStore.trl" />
                <span>3</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="6" v-model="formStore.trl" />
                <span>6</span></label
              >
              <label class="radioItem"
                ><input type="radio" value="9" v-model="formStore.trl" />
                <span>9</span></label
              >
            </div>
            <p v-if="errors.trl" class="error">{{ errors.trl }}</p>
          </div>

          <div class="field">
            <label class="label">
              Pouvez-vous le justifier? Où en êtes-vous?<span class="req"
                >*</span
              >
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.justificationTRL }"
              v-model.trim="formStore.justificationTRL"
              type="text"
            />
            <p v-if="errors.justificationTRL" class="error">
              {{ errors.justificationTRL }}
            </p>
          </div>

          <div class="field">
            <label class="label">
              La technologie proposée répond-elle à la définition d’un
              dispositif médical?<span class="req">*</span>
            </label>

            <div
              class="radioGroup"
              :class="{ 'radio-error-box': errors.dispositifMedical }"
            >
              <label class="radioItemVertical">
                <input
                  type="radio"
                  value="oui"
                  v-model="formStore.dispositifMedical"
                />
                <span>oui</span>
              </label>

              <label class="radioItemVertical">
                <input
                  type="radio"
                  value="non"
                  v-model="formStore.dispositifMedical"
                />
                <span>non</span>
              </label>
            </div>
            <p v-if="errors.dispositifMedical" class="error">
              {{ errors.dispositifMedical }}
            </p>
          </div>

          <div class="field">
            <label class="label">Justifier la réponse</label>
            <input
              class="input"
              :class="{ 'input-error': errors.justificationDispositif }"
              v-model.trim="formStore.justificationDispositif"
              type="text"
            />
            <p v-if="errors.justificationDispositif" class="error">
              {{ errors.justificationDispositif }}
            </p>
          </div>

          <div class="field">
            <label class="label">
              Si oui, de quelle classe?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.classeDispositif }"
              v-model.trim="formStore.classeDispositif"
              type="text"
              :disabled="formStore.dispositifMedical !== 'oui'"
            />
            <p v-if="errors.classeDispositif" class="error">
              {{ errors.classeDispositif }}
            </p>
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
  margin: 0 0 10px;
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

.uploadLabel {
  margin-bottom: 6px;
}

.req {
  color: #d62828;
  margin-left: 2px;
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

.input:disabled {
  background: #eeeeee;
  cursor: not-allowed;
}

.uploadWrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fileInput {
  display: none;
}

.uploadButton {
  width: 38px;
  height: 38px;
  border: 2px solid #2f2f2f;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
  background: white;
}

.fileName {
  font-size: 13px;
  color: #2f3b52;
  word-break: break-all;
}

.trlGrid {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  gap: 12px 28px;
  margin-top: 4px;
  max-width: 360px;
}

.radioGroup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.radioItem,
.radioItemVertical {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2f3b52;
}

.radio-error-box {
  padding: 6px;
  border: 1px solid red;
  border-radius: 10px;
  width: fit-content;
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

  .trlGrid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 100%;
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
