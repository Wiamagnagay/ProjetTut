<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({ role: '' });

const titreExperimentation = formStore.nomExperimentation
  ? `Expérimentation ${formStore.nomExperimentation}`
  : 'Expérimentation';

function validate() {
  errors.role = '';
  if (!formStore.role) errors.role = 'Choix obligatoire';
  return !errors.role;
}

function onBack() {
  router.push('/page4');
}

async function inscrireUtilisateur(id_utilisateur, idExpe, role) {
  const url = `https://formulaire-ri2s-1.onrender.com/api/utilisateurs/${id_utilisateur}/inscriptions?idExpe=${idExpe}&role=${role}`;

  try {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!reponse.ok)
      throw new Error(`Erreur lors de la requête : ${reponse.status}`);

    const data = await reponse.json();
    console.log('Inscription réussie', data);
    return data;
  } catch (erreur) {
    console.error("L'inscription a échoué :", erreur);
    return false;
  }
}

async function onNext() {
  if (!validate()) return;

  const id_utilisateur = formStore.idUtilisateurGenere;
  const role = formStore.role.toUpperCase();
  const idExpe = Number(formStore.experimentationChoisie);

  if (!id_utilisateur || !idExpe) {
    errors.role = 'Erreur : Données manquantes (Utilisateur ou Expérience).';
    return;
  }

  const inscriptionOk = await inscrireUtilisateur(id_utilisateur, idExpe, role);

  if (inscriptionOk) {
    if (formStore.idProLie) {
      console.log(
        "Un professionnel accompagne l'inscription, on le relie à l'expérience !"
      );

      await inscrireUtilisateur(formStore.idProLie, idExpe, 'PRO');
    }

    router.push('/page6');
  } else {
    errors.role = "Erreur lors de l'enregistrement";
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
          <button class="back" @click="onBack">← Retour</button>
          <h1>{{ titreExperimentation }}</h1>
          <div class="stepInfo">étape 5/9</div>
        </div>

        <p class="desc">
          En répondant à ce formulaire, vous acceptez que vos réponses soient
          enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
        </p>
        <div class="eta">Temps estimé: 2min</div>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label
              >Dans cette expérimentation {{ formStore.prenom }} aura le rôle de
              : <span class="req">*</span></label
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
            En cas de difficulté merci de nous contacter :
            <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a>
          </p>
          <button class="btn" type="submit" @click.prevent="onNext">
            Continuer
          </button>
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
