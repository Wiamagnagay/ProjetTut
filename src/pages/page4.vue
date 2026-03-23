<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ experimentationChoisie: '' });

function clearErrors() {
  errors.experimentationChoisie = '';
}

function validate() {
  clearErrors();
  if (!formStore.experimentationChoisie)
    errors.experimentationChoisie = 'Veuillez sélectionner une expérimentation';
  return !errors.experimentationChoisie;
}

function onBack() {
  router.push('/page3');
}
function selectCard(value) {
  formStore.experimentationChoisie = value;
}
function onNext() {
  if (!validate()) return;
  router.push('/page5');
}
</script>

<template>
  <div class="page">
  <header class="topbar">
  <img src="@/assets/logoRI2S.png" alt="RI2S" style="height:40px" />
</header>

    <main class="main">
      <section class="card">
        <div class="cardTop">
          <button class="back" @click="onBack">← Retour</button>
          <div class="stepInfo">étape 4/9</div>
        </div>
        <h1>Choix d'une expérimentation</h1>
        <form class="form" @submit.prevent="onNext">
          <div class="cards">
            <div
              class="expCard"
              :class="{
                selected: formStore.experimentationChoisie === 'telegrafik',
              }"
              @click="selectCard('telegrafik')"
            >
              <img
                src="@/assets/Telegrafik.png"
                alt="Telegrafik"
                style="width: 120px"
              />
              <ul class="ListeCriteres">
                <li>Senior de plus de 70 ans</li>
                <li>Senior vivant seul(e)</li>
                <li>Avec aidant</li>
                <li>Senior suivi par un professionnel de santé de proximité</li>
                <li>Senior vivant dans le Sud du Tarn</li>
              </ul>
            </div>

            <div
              class="expCard"
              :class="{
                selected: formStore.experimentationChoisie === 'presage',
              }"
              @click="selectCard('presage')"
            >
              <img
                src="@/assets/Presage.png"
                alt="Présage"
                style="width: 120px"
              />
              <ul class="ListeCriteres">
                <li>Senior de plus de 75 ans</li>
                <li>Avec un aidant professionnel ou familial</li>
                <li>Senior suivi par un médecin traitant</li>
                <li>Senior vivant dans le Sud du Tarn</li>
              </ul>
            </div>

            <div
              class="expCard simpleChoice"
              :class="{
                selected:
                  formStore.experimentationChoisie === 'attente_contact',
              }"
              @click="selectCard('attente_contact')"
            >
              <p>Je ne sais pas. J'attends que RI2S me contacte.</p>
            </div>
          </div>

          <p v-if="errors.experimentationChoisie" class="error">
            {{ errors.experimentationChoisie }}
          </p>

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
h1 {
  text-align : center;
  margin-bottom: 20px;
}

.cards {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.expCard {
  flex: 1;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s;
}

.expCard:hover {
  border-color: #4caf50;
}

.expCard.selected {
  border-color: #4caf50;
  background-color: #f0fff0;
}

.expCard img {
  width: 120px;
  margin-bottom: 12px;
}

.expCard h3 {
  color: #4caf50;
  margin-bottom: 8px;
}

.expCard ul {
  text-align: left;
  font-size: 0.85rem;
}

.simpleChoice {
  display: flex;
  align-items: center;
  justify-content: center;
}

.simpleChoice p {
  color: #4caf50;
  font-weight: bold;
  font-size: 1rem;
}

.ListeCriteres {
  padding-left: 20px;
  text-align: left;
  font-weight: bold;
  font-size: 1rem;

}
</style>
