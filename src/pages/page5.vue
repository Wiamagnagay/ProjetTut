<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ role: '' });

const titreExperimentation = computed(() => {
  if (formStore.experimentationChoisie === 'telegrafik')
    return 'Expérimentation Telegrafik';
  if (formStore.experimentationChoisie === 'presage')
    return 'Expérimentation Présage';
  return 'Expérimentation';
});

function validate() {
  errors.role = '';
  if (!formStore.role) errors.role = 'Choix obligatoire';
  return !errors.role;
}

function onBack() {
  router.push('/page4');
}
function onNext() {
  if (!validate()) return;
  router.push('/page6');
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
          <h1>{{ titreExperimentation }}</h1>
          <div class="stepInfo">étape 6/9</div>
        </div>

        <p class="desc">
          En répondant à ce formulaire, vous acceptez que vos réponses soient
          enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
        </p>
        <div class="eta">Temps estimé: 2min</div>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label
              >Dans cette expérimentation j'aurai le rôle de :
              <span class="req">*</span></label
            >
            <label
              ><input type="radio" value="senior" v-model="formStore.role" />
              Senior</label
            >
            <label
              ><input type="radio" value="aidant" v-model="formStore.role" />
              Aidant</label
            >
            <p v-if="errors.role" class="error">{{ errors.role }}</p>
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
