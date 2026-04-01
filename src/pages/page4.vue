<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 4;

const errors = reactive({
  marche: '',
  modeleEconomique: '',
  commercialisation: '',
  financement: '',
  concurrents: '',
});

function clearErrors() {
  errors.marche = '';
  errors.modeleEconomique = '';
  errors.commercialisation = '';
  errors.financement = '';
  errors.concurrents = '';
}

function validate() {
  clearErrors();

  if (!formStore.marche?.trim()) {
    errors.marche = 'Ce champ est obligatoire.';
  }

  if (!formStore.modeleEconomique?.trim()) {
    errors.modeleEconomique = 'Ce champ est obligatoire.';
  }

  if (!formStore.commercialisation?.trim()) {
    errors.commercialisation = 'Ce champ est obligatoire.';
  }

  if (!formStore.financement?.trim()) {
    errors.financement = 'Ce champ est obligatoire.';
  }

  if (!formStore.concurrents?.trim()) {
    errors.concurrents = 'Ce champ est obligatoire.';
  }

  return (
    !errors.marche &&
    !errors.modeleEconomique &&
    !errors.commercialisation &&
    !errors.financement &&
    !errors.concurrents
  );
}

function onBack() {
  router.push('/page3');
}

function onNext() {
  if (!validate()) return;
  router.push('/page5');
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

        <h2 class="sectionTitle">Intégration au marché</h2>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label class="label">
              Quel est votre marché cible ou vos pistes de réflexion à ce sujet
              ? Quel est le volume d'utilisateur estimé ?<span class="req"
                >*</span
              >
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.marche }"
              v-model.trim="formStore.marche"
              type="text"
            />
            <p v-if="errors.marche" class="error">{{ errors.marche }}</p>
          </div>

          <div class="field">
            <label class="label">
              Quel est votre modèle économique ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.modeleEconomique }"
              v-model.trim="formStore.modeleEconomique"
              type="text"
            />
            <p v-if="errors.modeleEconomique" class="error">
              {{ errors.modeleEconomique }}
            </p>
          </div>

          <div class="field">
            <label class="label">
              Votre solution est-elle déjà commercialisée ? Si oui, précisez le
              nombre et type de clients. Utilisée hors commercialisation ?<span
                class="req"
                >*</span
              >
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.commercialisation }"
              v-model.trim="formStore.commercialisation"
              type="text"
            />
            <p v-if="errors.commercialisation" class="error">
              {{ errors.commercialisation }}
            </p>
          </div>

          <div class="field">
            <label class="label">
              Actuellement, comment votre entreprise est-elle financée et
              comment le sera-t-elle à moyen terme ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.financement }"
              v-model.trim="formStore.financement"
              type="text"
            />
            <p v-if="errors.financement" class="error">
              {{ errors.financement }}
            </p>
          </div>

          <div class="field">
            <label class="label">
              Quels sont vos principaux concurrents et en quoi votre solution se
              distingue-t-elle ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.concurrents }"
              v-model.trim="formStore.concurrents"
              type="text"
            />
            <p v-if="errors.concurrents" class="error">
              {{ errors.concurrents }}
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
  margin-bottom: 14px;
}

.label {
  font-size: 13px;
  color: #1c1c1c;
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
