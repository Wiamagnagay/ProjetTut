<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ telephone: "", email: "", codePostal: "", profilSante: "" });

function clearErrors() { errors.telephone = ""; errors.email = ""; errors.codePostal = ""; errors.profilSante = ""; }

function validate() {
  clearErrors();

  const telRegex = /^0[1-9][0-9]{8}$/;
  if (!formStore.telephone.trim()) {
    errors.telephone = "Téléphone obligatoire";
  } else if (!telRegex.test(formStore.telephone.trim())) {
    errors.telephone = "Veuillez vérifier la forme du numéro (ex: 0630789037)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formStore.email.trim()) {
    errors.email = "Email obligatoire";
  } else if (!emailRegex.test(formStore.email.trim())) {
    errors.email = "Veuillez vérifier la forme de l'email (ex: exemple@gmail.com)";
  }

  const cpRegex = /^[0-9]{5}$/;
  if (!formStore.codePostal.trim()) {
    errors.codePostal = "Code postal obligatoire";
  } else if (!cpRegex.test(formStore.codePostal.trim())) {
    errors.codePostal = "Veuillez vérifier le code postal (ex: 75001)";
  }

  if (!formStore.profilSante) errors.profilSante = "Choix obligatoire";

  return !errors.telephone && !errors.email && !errors.codePostal && !errors.profilSante;
}

function onBack() { router.push("/page1"); }
function onNext() {
  if (!validate()) return;
  if (formStore.profilSante === 'pro') {
    router.push('/page3pro');
  } else {
    router.push('/page3');
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
          <button class="back" @click="onBack">← Retour</button>
          <div class="stepInfo">étape 2/9</div>
        </div>
        <h1>Formulaire de Prise de Contact</h1>
        <form class="form" @submit.prevent="onNext">

          <div class="field">
          <label class="label">Numéro de telephone <span class="req">*</span></label>  
            <input
              class="input"
              :class="{ 'input-error': errors.telephone }"
              v-model="formStore.telephone"
              placeholder="ex: 0630789037"
              maxlength="10"
            />
            <p v-if="errors.telephone" class="error">{{ errors.telephone }}</p>
          </div>

          <div class="field">
            <label class="label">Email<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.email }"
              type="email"
              v-model="formStore.email"
              placeholder="ex: exemple@gmail.com"
            />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>

          <div class="field">
          <label class="label">Code Postal<span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.codePostal }"
              v-model="formStore.codePostal"
              placeholder="ex: 75001"
              maxlength="5"
            />
            <p v-if="errors.codePostal" class="error">{{ errors.codePostal }}</p>
          </div>

          <div class="field">
          <label class="label">Je suis<span class="req">*</span></label>
            <label><input type="radio" value="non_pro" v-model="formStore.profilSante"> Non professionnel</label>
            <label><input type="radio" value="pro" v-model="formStore.profilSante"> Professionnel</label>
            <p v-if="errors.profilSante" class="error">{{ errors.profilSante }}</p>
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
.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
h1 {
  text-align: center;

}
</style>