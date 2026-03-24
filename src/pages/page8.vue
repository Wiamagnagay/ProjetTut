<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ pocheMomentContact: '', pocheInfosComplementaires: '' });

function clearErrors() { errors.pocheMomentContact = ''; errors.pocheInfosComplementaires = ''; }

function validate() {
  clearErrors();
  if (!formStore.pocheMomentContact || formStore.pocheMomentContact.length === 0) {
    errors.pocheMomentContact = 'Veuillez choisir au moins une disponibilité';
  }
  return !errors.pocheMomentContact;
}

function onBack() { router.push('/page7'); }
function onNext() { if (!validate()) return; router.push('/page9'); }
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
          <h1>Ajouter un proche</h1>
          <div class="stepInfo">étape 8/9</div>
        </div>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label>Informations complémentaires</label>
            <p class="desc">Il préfère être contacté :</p>
            <label><input type="checkbox" value="matin" v-model="formStore.pocheMomentContact" /> Le matin</label>
            <label><input type="checkbox" value="midi" v-model="formStore.pocheMomentContact" /> Le midi</label>
            <label><input type="checkbox" value="apres-midi" v-model="formStore.pocheMomentContact" /> L'après-midi</label>
            <label><input type="checkbox" value="soir" v-model="formStore.pocheMomentContact" /> Le soir</label>
            <p v-if="errors.pocheMomentContact" class="error">{{ errors.pocheMomentContact }}</p>
          </div>

          <div class="field">
            <label>Informations complémentaires :</label>
            <input
              class="input"
              v-model="formStore.pocheInfosComplementaires"
            />
            <div class="hint">Optionnel</div>
            
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
.input-error {
  border-color: red !important;
  color: red;
}
.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}
</style>