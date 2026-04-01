<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 3;

const errors = reactive({
  nomSolution: '',
  description: '',
  problematique: '',
  typeInnovation: '',
  benefices: '',
  caractereInnovant: '',
  coconception: '',
  implication: '',
  comite: ''
});

function clearErrors() {
  errors.nomSolution = '';
  errors.description = '';
  errors.problematique = '';
  errors.typeInnovation = '';
  errors.benefices = '';
  errors.caractereInnovant = '';
  errors.coconception = '';
  errors.implication = '';
  errors.comite = '';
}

function validate() {
  clearErrors();

  if (!formStore.nomSolution?.trim()) {
    errors.nomSolution = 'Le nom de la solution est obligatoire.';
  }

  if (!formStore.description?.trim()) {
    errors.description = 'La description du projet est obligatoire.';
  }

  if (!formStore.problematique?.trim()) {
    errors.problematique = 'Ce champ est obligatoire.';
  }

  if (!formStore.typeInnovation?.trim()) {
    errors.typeInnovation = 'Veuillez choisir un type d’innovation.';
  }

  if (!formStore.benefices?.trim()) {
    errors.benefices = 'Ce champ est obligatoire.';
  }

  if (!formStore.caractereInnovant?.trim()) {
    errors.caractereInnovant = 'Ce champ est obligatoire.';
  }

  if (!formStore.coconception?.trim()) {
    errors.coconception = 'Ce champ est obligatoire.';
  }

  if (!formStore.implication?.trim()) {
    errors.implication = 'Ce champ est obligatoire.';
  }

  if (!formStore.comite?.trim()) {
    errors.comite = 'Ce champ est obligatoire.';
  }

  return (
    !errors.nomSolution &&
    !errors.description &&
    !errors.problematique &&
    !errors.typeInnovation &&
    !errors.benefices &&
    !errors.caractereInnovant &&
    !errors.coconception &&
    !errors.implication &&
    !errors.comite
  );
}

function onBack() {
  router.push('/page2');
}

function onNext() {
  if (!validate()) return;
  router.push('/page4');
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

        <h2 class="sectionTitle">Description de la solution</h2>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label class="label">Nom de la solution<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.nomSolution }"
              v-model.trim="formStore.nomSolution"
              type="text"
            />
            <p v-if="errors.nomSolution" class="error">{{ errors.nomSolution }}</p>
          </div>

          <div class="field">
            <label class="label">Description courte du projet<span class="req">*</span></label>
            <textarea
              class="textarea"
              :class="{ 'input-error': errors.description }"
              v-model.trim="formStore.description"
            ></textarea>
            <p v-if="errors.description" class="error">{{ errors.description }}</p>
          </div>

          <div class="grid">
            <div class="field">
              <label class="label">À quelle problématique répond votre projet ?<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.problematique }"
                v-model.trim="formStore.problematique"
                type="text"
              />
              <p v-if="errors.problematique" class="error">{{ errors.problematique }}</p>
            </div>

            <div class="field">
              <label class="label">Quel est le type d'innovation proposée ?<span class="req">*</span></label>
              <div class="radio-group" :class="{ 'radio-error': errors.typeInnovation }">
                <label class="radio-item">
                  <input type="radio" value="Innovation technologique" v-model="formStore.typeInnovation" />
                  <span>Innovation technologique</span>
                </label>

                <label class="radio-item">
                  <input type="radio" value="Innovation sociale" v-model="formStore.typeInnovation" />
                  <span>Innovation sociale</span>
                </label>

                <label class="radio-item">
                  <input type="radio" value="Innovation organisationnelle" v-model="formStore.typeInnovation" />
                  <span>Innovation organisationnelle</span>
                </label>
              </div>
              <p v-if="errors.typeInnovation" class="error">{{ errors.typeInnovation }}</p>
            </div>

            <div class="field">
              <label class="label">Quels sont les bénéfices attendus de votre solution ?<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.benefices }"
                v-model.trim="formStore.benefices"
                type="text"
              />
              <p v-if="errors.benefices" class="error">{{ errors.benefices }}</p>
            </div>

            <div class="field">
              <label class="label">Quel est le caractère innovant de votre solution ?<span class="req">*</span></label>
              <input
                class="input"
                :class="{ 'input-error': errors.caractereInnovant }"
                v-model.trim="formStore.caractereInnovant"
                type="text"
              />
              <p v-if="errors.caractereInnovant" class="error">{{ errors.caractereInnovant }}</p>
            </div>
          </div>

          <div class="field">
            <label class="label">
              Quelle est la place de la co-conception et de l'évaluation dans le développement de votre projet ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.coconception }"
              v-model.trim="formStore.coconception"
              type="text"
            />
            <p v-if="errors.coconception" class="error">{{ errors.coconception }}</p>
          </div>

          <div class="field">
            <label class="label">
              Des usagers et/ou professionnels de santé ont-ils déjà été impliqués ? À quelles étapes ?<span class="req">*</span>
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.implication }"
              v-model.trim="formStore.implication"
              type="text"
            />
            <p v-if="errors.implication" class="error">{{ errors.implication }}</p>
          </div>

          <div class="field">
            <label class="label">Avez-vous un comité scientifique ?<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.comite }"
              v-model.trim="formStore.comite"
              type="text"
            />
            <p v-if="errors.comite" class="error">{{ errors.comite }}</p>
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

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 34px;
  align-items: start;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
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

.input,
.textarea {
  width: 100%;
  border: 2px solid #9db7bf;
  border-radius: 20px;
  padding: 10px 16px;
  background: white;
  font-size: 14px;
  outline: none;
}

.input {
  height: 40px;
}

.textarea {
  min-height: 86px;
  resize: vertical;
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

  .grid {
    grid-template-columns: 1fr;
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