<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 5;

const errors = reactive({
  equipe: '',
  accompagnement: '',
  tiersLieu: '',
  pourquoiRI2S: ''
});

function clearErrors() {
  errors.equipe = '';
  errors.accompagnement = '';
  errors.tiersLieu = '';
  errors.pourquoiRI2S = '';
}

function validate() {
  clearErrors();

  if (!formStore.equipe?.trim()) {
    errors.equipe = 'Ce champ est obligatoire.';
  }

  if (!formStore.accompagnement?.trim()) {
    errors.accompagnement = 'Ce champ est obligatoire.';
  }

  if (!formStore.tiersLieu?.trim()) {
    errors.tiersLieu = 'Veuillez choisir une réponse.';
  }

  if (!formStore.pourquoiRI2S?.trim()) {
    errors.pourquoiRI2S = 'Ce champ est obligatoire.';
  }

  return (
    !errors.equipe &&
    !errors.accompagnement &&
    !errors.tiersLieu &&
    !errors.pourquoiRI2S
  );
}

function onBack() {
  router.push('/page4');
}

function onNext() {
  if (!validate()) return;
  router.push('/page6');
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

        <h2 class="sectionTitle">Equipe et écosystème</h2>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label class="label">
              Pouvez-vous présenter votre équipe? (fonction, rôle, profil)<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.equipe }"
              v-model.trim="formStore.equipe"
              type="text"
            />
            <p v-if="errors.equipe" class="error">{{ errors.equipe }}</p>
          </div>

          <div class="field">
            <label class="label">
              Etes-vous actuellement accompagner par un incubateur, un accélérateur,
              un pôle de compétitivité ou autre? Si oui, le(s) quel(s)?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.accompagnement }"
              v-model.trim="formStore.accompagnement"
              type="text"
            />
            <p v-if="errors.accompagnement" class="error">{{ errors.accompagnement }}</p>
          </div>

          <div class="field">
            <label class="label">
              Bénéficiez-vous ou avez-vous bénéficié d'un accompagnement par un autre
              Tiers-lieu d'expérimentation?<span class="req">*</span>
            </label>

            <div class="radio-group" :class="{ 'radio-error': errors.tiersLieu }">
              <label class="radio-item">
                <input type="radio" value="oui" v-model="formStore.tiersLieu" />
                <span>oui</span>
              </label>

              <label class="radio-item">
                <input type="radio" value="non" v-model="formStore.tiersLieu" />
                <span>non</span>
              </label>
            </div>

            <p v-if="errors.tiersLieu" class="error">{{ errors.tiersLieu }}</p>
          </div>

          <div class="field">
            <label class="label">
              Si oui, lequel ? Pourquoi faire appel à RI2S en complément ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.pourquoiRI2S }"
              v-model.trim="formStore.pourquoiRI2S"
              type="text"
            />
            <p v-if="errors.pourquoiRI2S" class="error">{{ errors.pourquoiRI2S }}</p>
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
  margin-bottom: 20px;
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

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #2f3b52;
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

.input-error,
.radio-error {
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