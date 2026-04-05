<script setup>
import { ref, onMounted } from 'vue';
import { formStore } from '../store/formStore';

const statutEnvoi = ref('chargement'); 
let envoiEnCours = false; 

async function inscrireUtilisateur(id_utilisateur, idExpe, role) {
  const url = `https://formulaire-ri2s-1.onrender.com/api/utilisateurs/${id_utilisateur}/inscriptions?idExpe=${idExpe}&role=${role}`;
  const reponse = await fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  });

  if (!reponse.ok) throw new Error(`Impossible d'inscrire le ${role}`);
  console.log(`Demande créée pour le ${role}`);
}

async function validerDossier() {
  if (envoiEnCours) return;
  envoiEnCours = true;

  try {
    const idExpe = Number(formStore.experimentationChoisie);
    let idSenior = null;
    let idAidant = null;

    if (formStore.role.toUpperCase() === 'SENIOR') {
      idSenior = formStore.idUtilisateurGenere;
      idAidant = formStore.idProcheGenere || null;
    } else {
      idAidant = formStore.idUtilisateurGenere;
      idSenior = formStore.idProcheGenere || null;
    }
    const idPro = formStore.idProLie || null;

    if (idSenior) await inscrireUtilisateur(idSenior, idExpe, 'SENIOR');
    if (idAidant) await inscrireUtilisateur(idAidant, idExpe, 'AIDANT');
    if (idPro) await inscrireUtilisateur(idPro, idExpe, 'PRO');

    const payload = {
      idExpe: idExpe,
      idSenior: idSenior,
      idAidant: idAidant,
      idPro: idPro 
    };

    console.log("Envoi à /finaliser-groupe :", payload);

    const responseGroupe = await fetch('https://formulaire-ri2s-1.onrender.com/api/utilisateurs/finaliser-groupe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!responseGroupe.ok) {
      const err = await responseGroupe.text();
      console.error("Erreur finaliser-groupe :", err);
      throw new Error("Erreur lors de la création du dossier de groupe.");
    }

    statutEnvoi.value = 'succes';

  } catch (error) {
    console.error("Échec de la validation finale :", error);
    statutEnvoi.value = 'erreur';
  }
}

onMounted(() => {
  if (formStore.experimentationChoisie && formStore.experimentationChoisie !== 'attente_contact') {
    validerDossier();
  } else {
    statutEnvoi.value = 'succes';
  }
});
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" style="height: 40px" />
    </header>

    <main class="main">
      <section class="card">
        
        <div v-if="statutEnvoi === 'chargement'" style="text-align: center; padding: 2rem;">
          <h2 style="color: #4a90e2;">Création de votre dossier en cours...</h2>
          <p>Veuillez patienter quelques instants.</p>
        </div>

        <div v-else-if="statutEnvoi === 'succes'">
          <div class="cardTop">
            <h1>Merci d'avoir rempli ce formulaire</h1>
            <div class="stepInfo">étape 9/9</div>
          </div>
          <p class="desc">
            Nous vous informons que toutes vos données ont bien été envoyées à l'équipe RI2S et que votre dossier d'expérimentation a été créé avec succès.
          </p>
          <p class="desc">Vous allez être recontacté par l'équipe RI2S très prochainement.</p>
        </div>

        <div v-else-if="statutEnvoi === 'erreur'" style="text-align: center;">
          <h1 style="color: red;">Oups, une erreur est survenue !</h1>
          <p class="desc">
            Vos profils ont bien été créés, mais nous n'avons pas pu valider le dossier d'expérimentation final.
          </p>
        </div>

        <div class="bottomRow" v-if="statutEnvoi !== 'chargement'">
          <p class="help">
            En cas de difficulté merci de nous contacter à cette adresse :
            <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a>
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <a href="#">Mentions légales</a>
      <div>Copyright © 2026 RI2S</div>
    </footer>
  </div>
</template>