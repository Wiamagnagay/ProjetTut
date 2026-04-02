<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const experimentations = ref([]);
const loading = ref(true);
const erreurSelection = ref('');

onMounted(async () => {
  const res = await fetch(
    'https://formulaire-ri2s-1.onrender.com/api/experimentations'
  );
  experimentations.value = await res.json();
  loading.value = false;
});

function selectCard(idExperimentation) {
  formStore.experimentationChoisie = String(idExperimentation);
  erreurSelection.value = '';
}

function onNext() {
  if (!formStore.experimentationChoisie) {
    router.push('/page5');
  } else if (formStore.experimentationChoisie === 'attente_contact') {
    formStore.necessiteAidant = false;
    formStore.necessitePro = false;
    router.push('/page6fin');
  } else {
    const expeSelectionnee = experimentations.value.find(
      (e) => String(e.idExperimentation) === formStore.experimentationChoisie
    );

    if (expeSelectionnee) {
      formStore.necessiteAidant = expeSelectionnee.necessiteAidant;
      formStore.necessitePro = expeSelectionnee.necessitePro;
      formStore.nomExperimentation = expeSelectionnee.nomExperimentation;
    }

    router.push('/page5');
  }
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" style="height: 40px" />
    </header>

    <main class="main">
      <section class="card">
        <div class="cardTop">
          <div class="stepInfo">étape 4/9</div>
        </div>
        <div v-if="formStore.dejaInscrit" class="welcome-back">
          Ravi de vous revoir, {{ formStore.prenom }} !
          <p>
            Votre profil a été reconnu. Vous pouvez directement choisir votre
            expérimentation ci-dessous.
          </p>
        </div>
        <h1>Choix d'une expérimentation</h1>

        <div v-if="loading" class="loading">
          Chargement des expérimentations...
        </div>

        <form v-if="!loading" class="form" @submit.prevent="onNext">
          <div class="cards">
            <div
              v-for="expe in experimentations"
              :key="expe.idExperimentation"
              class="expCard"
              :class="{
                selected:
                  formStore.experimentationChoisie ===
                  String(expe.idExperimentation),
              }"
              @click="selectCard(expe.idExperimentation)"
            >
              <img
                v-if="expe.urlImage"
                :src="expe.urlImage"
                :alt="expe.nomExperimentation"
                style="width: 120px; margin-bottom: 12px"
              />
              <h3>{{ expe.nomExperimentation }}</h3>
              <p class="desc">{{ expe.description }}</p>
              <ul v-if="expe.criteresInclusion?.length" class="ListeCriteres">
                <li v-for="(critere, i) in expe.criteresInclusion" :key="i">
                  {{ critere }}
                </li>
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

          <p v-if="erreurSelection" class="error">{{ erreurSelection }}</p>

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
  text-align: center;
  margin-bottom: 20px;
}
.loading {
  text-align: center;
  color: #888;
  padding: 20px;
}
.cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.expCard {
  flex: 1;
  min-width: 200px;
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
.expCard h3 {
  color: #4caf50;
  margin-bottom: 8px;
}
.expCard .desc {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 8px;
}
.ListeCriteres {
  padding-left: 20px;
  text-align: left;
  font-weight: bold;
  font-size: 0.9rem;
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

.welcome-back {
  color: #2e7d32;
  padding: 0px;
  font-size: 1.5rem;
}

.welcome-back p {
  margin: 5px 0 0 0;
  font-size: 0.85rem;
}
</style>
