<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const lien = ref('');
const router = useRouter();
const errors = reactive({ prochePrenom: '', procheNom: '', procheNaissance: '' });

function clearErrors() { errors.prochePrenom = ''; errors.procheNom = ''; errors.procheNaissance = ''; }

function validate() {
  clearErrors();
  if (!formStore.prochePrenom.trim()) errors.prochePrenom = 'Prénom obligatoire';
  if (!formStore.procheNom.trim()) errors.procheNom = 'Nom obligatoire';
  if (!formStore.procheNaissance) errors.procheNaissance = 'Date de naissance obligatoire';
  return !errors.prochePrenom && !errors.procheNom && !errors.procheNaissance;
}

function onBack() { router.push('/page5'); }
function onNext() { if (!validate()) return; router.push('/page7'); }
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
          <div class="stepInfo">étape 6/9</div>
        </div>

        <p class="desc">
          En répondant à ce formulaire, vous acceptez que vos réponses soient
          enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
        </p>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label>Prénom <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.prochePrenom }"
              v-model="formStore.prochePrenom"
            />
            <p v-if="errors.prochePrenom" class="error">{{ errors.prochePrenom }}</p>
          </div>

          <div class="field">
            <label>Nom <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.procheNom }"
              v-model="formStore.procheNom"
            />
            <p v-if="errors.procheNom" class="error">{{ errors.procheNom }}</p>
          </div>

          <div class="field">
            <label>Date de naissance <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.procheNaissance }"
              type="date"
              v-model="formStore.procheNaissance"
            />
            <div class="hint">Obligatoire</div>
            <p v-if="errors.procheNaissance" class="error">{{ errors.procheNaissance }}</p>
          </div>
          <div class="field">
            <label>Lien avec le proche <span class="req">*</span></label>
            <select v-model="lien" id="proches">
              <option>Ami</option>
              <option>Voisin</option>
              <option>Enfant</option>
              <option>Parent</option>
              <option>Nièce/Neveu</option>
              <option>Tante/Oncle</option>
              <option>Petit-enfant</option>
              <option>Grand-parent</option>
              <option>Autre</option>

            </select>
            <div>
            <input class="input" type="text" v-if="lien === 'Autre'" placeholder="Précisez ici"/>
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
.input-error {
  border-color: red !important;
  color: red;
}
.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  font-family: sans-serif;
}

select {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
  width:200px;
  margin-bottom:10px;
}


input[type="text"] {
  padding: 10px 15px;
  border: 1px solid #4A90E2;
  border-radius: 8px;
  font-size: 14px;
  animation: fadeIn 0.3s ease-in-out;
  width:200px;
}

</style>