<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ pocheTelephone: '', procheEmail: '', procheCodePostal: '' });

function clearErrors() { errors.pocheTelephone = ''; errors.procheEmail = ''; errors.procheCodePostal = ''; }

function validate() {
  clearErrors();

  const telRegex = /^0[1-9][0-9]{8}$/;
  if (!formStore.pocheTelephone.trim()) {
    errors.pocheTelephone = 'Téléphone obligatoire';
  } else if (!telRegex.test(formStore.pocheTelephone.trim())) {
    errors.pocheTelephone = 'Veuillez vérifier la forme du numéro (ex: 0630789037)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formStore.procheEmail.trim()) {
    errors.procheEmail = 'Email obligatoire';
  } else if (!emailRegex.test(formStore.procheEmail.trim())) {
    errors.procheEmail = 'Veuillez vérifier la forme de l\'email (ex: exemple@gmail.com)';
  }

  const cpRegex = /^[0-9]{5}$/;
  if (!formStore.procheCodePostal.trim()) {
    errors.procheCodePostal = 'Code postal obligatoire';
  } else if (!cpRegex.test(formStore.procheCodePostal.trim())) {
    errors.procheCodePostal = 'Veuillez vérifier le code postal (ex: 75001)';
  }

  return !errors.pocheTelephone && !errors.procheEmail && !errors.procheCodePostal;
}

function onBack() { router.push('/page6'); }
function onNext() { if (!validate()) return; router.push('/page8'); }
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
          <div class="stepInfo">étape 7/9</div>
        </div>

        <p class="desc">
          En répondant à ce formulaire, vous acceptez que vos réponses soient
          enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
        </p>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label>N° de Téléphone <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.pocheTelephone }"
              v-model="formStore.pocheTelephone"
              placeholder="ex: 0630789037"
              maxlength="10"
            />
            <div class="hint">Ne doit pas comporter d'espaces</div>
            <p v-if="errors.pocheTelephone" class="error">{{ errors.pocheTelephone }}</p>
            <p class="caractère">
            ({{ formStore.pocheTelephone.length }} / 10 caractères)
          </p>
          </div>


          



          <div class="field">
            <label>Adresse électronique <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.procheEmail }"
              type="email"
              v-model="formStore.procheEmail"
              placeholder="ex: exemple@gmail.com"
            />
            <p v-if="errors.procheEmail" class="error">{{ errors.procheEmail }}</p>
          </div>

          <div class="field">
            <label>Code postal <span class="req">*</span></label>
            <input
              class="input"
              :class="{ 'input-error': errors.procheCodePostal }"
              v-model="formStore.procheCodePostal"
              placeholder="ex: 81100"
              maxlength="5"
            />
            <p v-if="errors.procheCodePostal" class="error">{{ errors.procheCodePostal }}</p>
            <p class="caractère">
            ({{ formStore.procheCodePostal.length }} / 5 caractères)
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