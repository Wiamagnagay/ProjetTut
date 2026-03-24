<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { formStore } from "../../store/formStore";

const router = useRouter();
const errors = reactive({ momentContact: "", informationsComplementaires: "" });

function clearErrors() { errors.momentContact = ""; errors.informationsComplementaires = ""; }

function validate() {
  clearErrors();
  if (!formStore.momentContact || formStore.momentContact.length === 0) {
    errors.momentContact = "Veuillez choisir au moins une disponibilité";
  }
  
  return !errors.momentContact;
}

function onBack() { router.push("/page2"); }
function onNext() { if (!validate()) return; router.push("/page4"); }
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
          <div class="stepInfo">étape 3/9</div>
        </div>
        <h1>Formulaire de Prise de Contact</h1>
        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label>Je préfère être contacté (plusieurs choix possibles) :</label>
            <label><input type="checkbox" value="matin" v-model="formStore.momentContact" /> Le matin</label>
            <label><input type="checkbox" value="midi" v-model="formStore.momentContact" /> Le midi</label>
            <label><input type="checkbox" value="apres-midi" v-model="formStore.momentContact" /> L'après-midi</label>
            <label><input type="checkbox" value="soir" v-model="formStore.momentContact" /> Le soir</label>
            <p v-if="errors.momentContact" class="error">{{ errors.momentContact }}</p>
          </div>
          <div class="field">
            <label>Informations complémentaires :</label>
            <input class="input" :class="{ 'input-error': errors.informationsComplementaires }" v-model="formStore.informationsComplementaires" />
            <div class="hint">Optionnel</div>
            <p v-if="errors.informationsComplementaires" class="error">{{ errors.informationsComplementaires }}</p>
          </div>
          <div class="bottomRow">
            <p class="help">En cas de difficulté merci de nous contacter à cette adresse : <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a></p>
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