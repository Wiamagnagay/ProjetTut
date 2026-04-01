<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 1;

const errors = reactive({
  prenom: '',
  nom: '',
  codePostal: '',
  telephone: '',
  email: ''
});

const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
const phoneRegex = /^(0|\+33)[1-9][0-9]{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalRegex = /^[0-9]{5}$/;

function clearErrors() {
  errors.prenom = '';
  errors.nom = '';
  errors.codePostal = '';
  errors.telephone = '';
  errors.email = '';
}

function validate() {
  clearErrors();

  if (!formStore.prenom?.trim()) {
    errors.prenom = 'Le prénom est obligatoire.';
  } else if (!nameRegex.test(formStore.prenom.trim())) {
    errors.prenom = 'Le prénom ne doit contenir que des lettres.';
  }

  if (!formStore.nom?.trim()) {
    errors.nom = 'Le nom est obligatoire.';
  } else if (!nameRegex.test(formStore.nom.trim())) {
    errors.nom = 'Le nom ne doit contenir que des lettres.';
  }

  if (!formStore.codePostal?.trim()) {
    errors.codePostal = 'Le code postal est obligatoire.';
  } else if (!postalRegex.test(formStore.codePostal.trim())) {
    errors.codePostal = 'Le code postal doit contenir 5 chiffres.';
  }

  if (!formStore.telephone?.trim()) {
    errors.telephone = 'Le numéro de téléphone est obligatoire.';
  } else {
    const tel = formStore.telephone.replace(/\s+/g, '');
    if (!phoneRegex.test(tel)) {
      errors.telephone = 'Veuillez entrer un numéro valide.';
    }
  }

  if (!formStore.email?.trim()) {
    errors.email = "L'adresse électronique est obligatoire.";
  } else if (!emailRegex.test(formStore.email.trim())) {
    errors.email = 'Veuillez entrer une adresse email valide.';
  }

  return (
    !errors.prenom &&
    !errors.nom &&
    !errors.codePostal &&
    !errors.telephone &&
    !errors.email
  );
}

function onBack() {
  router.push('/');
}

function onNext() {
  if (!validate()) return;
  router.push('/page2');
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
          <div class="eta">Temps estimé : 2 min</div>
        </div>

        <form class="form" @submit.prevent="onNext">
          <div class="grid">
            <div class="field">
              <label class="label">Prénom<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.prenom }"
                v-model.trim="formStore.prenom"
                type="text"
              />
              <p v-if="errors.prenom" class="error">{{ errors.prenom }}</p>
            </div>

            <div class="field">
              <label class="label">N° de Téléphone<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.telephone }"
                v-model.trim="formStore.telephone"
                type="tel"
                inputmode="numeric"
                placeholder="ex: 06xxxxxxxx ou 05xxxxxxxx"
              />
              <div class="hint">Ne doit pas comporter d'espaces</div>
              <p v-if="errors.telephone" class="error">{{ errors.telephone }}</p>
            </div>

            <div class="field">
              <label class="label">Nom<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.nom }"
                v-model.trim="formStore.nom"
                type="text"
              />
              <p v-if="errors.nom" class="error">{{ errors.nom }}</p>
            </div>

            <div class="field">
              <label class="label">Adresse électronique<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.email }"
                v-model.trim="formStore.email"
                type="email"
                placeholder=".......@............"
              />
              <p v-if="errors.email" class="error">{{ errors.email }}</p>
            </div>

            <div class="field full-width">
              <label class="label">Code postal<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.codePostal }"
                v-model.trim="formStore.codePostal"
                type="text"
                inputmode="numeric"
                maxlength="5"
                placeholder="ex. 81100"
              />
              <p v-if="errors.codePostal" class="error">{{ errors.codePostal }}</p>
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
  font-size: 24px;
  color: #2f3b52;
}

.headCenter {
  text-align: center;
  margin-bottom: 32px;
}

.headCenter h1 {
  font-size: 52px;
  line-height: 1.05;
  color: #25324b;
  margin: 0 0 22px;
  font-weight: 700;
}

.desc {
  max-width: 620px;
  margin: 0 auto 6px;
  color: #3f4b5f;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;
}

.eta {
  max-width: 620px;
  margin: 0 auto;
  font-size: 14px;
  color: #3f4b5f;
  text-align: left;
}

.form {
  margin-top: 18px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 40px;
}

.field {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: 1 / 2;
}

.label {
  font-size: 15px;
  color: #1c1c1c;
  margin-bottom: 6px;
}

.req {
  color: #d62828;
  margin-left: 2px;
}

.input {
  width: 100%;
  height: 44px;
  border: 2px solid #9db7bf;
  border-radius: 20px;
  padding: 0 16px;
  background: white;
  font-size: 14px;
  outline: none;
}

.input::placeholder {
  color: #b7b7b7;
}

.hint {
  margin-top: 4px;
  font-size: 12px;
  color: #4a4a4a;
}

.bottomRow {
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.help {
  margin: 0;
  color: #a52020;
  font-size: 14px;
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

  .grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
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