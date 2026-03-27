<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const totalSteps = 9;
const stepNumber = 1;

const errors = reactive({ prenom: '', nom: '', naissance: '' });

const progressPercent = computed(() => Math.round((stepNumber / totalSteps) * 100));

function clearErrors() { 
  errors.prenom = ''; 
  errors.nom = ''; 
  errors.naissance = ''; 
}

const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;

function validate() {
  clearErrors();
  if (!formStore.prenom.trim()) {
    errors.prenom = 'Le prénom est obligatoire.';
  } else if (!nameRegex.test(formStore.prenom.trim())) {
    errors.prenom = 'Le prénom ne doit contenir que des lettres et espaces.';
  }
  if (!formStore.nom.trim()) {
    errors.nom = 'Le nom est obligatoire.';
  } else if (!nameRegex.test(formStore.nom.trim())) {
    errors.nom = 'Le nom ne doit contenir que des lettres et espaces.';
  }
  if (!formStore.naissance) errors.naissance = 'La date de naissance est obligatoire.';
  
  return !errors.prenom && !errors.nom && !errors.naissance;
}

async function onNext() {
  if (!validate()) return;

  const nomClean = formStore.nom.trim().toUpperCase(); 
  const prenomClean = formStore.prenom.trim(); 
  const dateClean = formStore.naissance; 

  const url = `https://formulaire-ri2s-1.onrender.com/api/utilisateurs/verification?nom=${encodeURIComponent(nomClean)}&prenom=${encodeURIComponent(prenomClean)}&dateNaissance=${dateClean}`;
  

  try {
    const response = await fetch(url);
    const data = await response.json(); 
    

    let userExiste = false;

    if (data === true || data === "true") {
      userExiste = true;
    } else if (data && typeof data === 'object' && data.existe === true) {
      userExiste = true;
    } else if (data && typeof data === 'object' && String(data.existe) === "true") {
      userExiste = true;
    }

    if (userExiste) {
      formStore.dejaInscrit = true;
      router.push('/page4'); 
    } else {
      formStore.dejaInscrit = false;
      router.push('/page2');
    }

  } catch (error) {
    console.error("Erreur lors du fetch :", error);
    router.push('/page2');
  }
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
          <button class="back" disabled>← Retour</button>
          <div class="stepInfo">étape {{ stepNumber }}/{{ totalSteps }}</div>
        </div>
        <div class="headCenter">
          <h1>Formulaire de Prise de Contact</h1>
          <p class="desc">En répondant à ce formulaire, vous acceptez que vos réponses soient enregistrées et que vous puissiez être recontacté par l'équipe RI2S.</p>
          <div class="eta">Temps estimé : 2 min</div>
        </div>
        
        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label class="label">Prénom<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.prenom }"
              v-model.trim="formStore.prenom"
            />
            <p v-if="errors.prenom" class="error">{{ errors.prenom }}</p>
          </div>
          <div class="field">
            <label class="label">Nom<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.nom }"
              v-model.trim="formStore.nom"
            />
            <p v-if="errors.nom" class="error">{{ errors.nom }}</p>
          </div>
          <div class="field">
            <label class="label">Date de naissance<span class="req">*</span></label>
            <input class="input date" type="date" v-model="formStore.naissance" />
            <div class="hint">Obligatoire</div>
            <p v-if="errors.naissance" class="error">{{ errors.naissance }}</p>
          </div>
          <div class="bottomRow">
            <p class="help">En cas de difficulté merci de nous contacter : <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a></p>
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