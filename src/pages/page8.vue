<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();
const errors = reactive({
  procheMomentContact: '',
  procheInfosComplementaires: '',
});

function clearErrors() {
  errors.procheMomentContact = '';
  errors.procheInfosComplementaires = '';
}

function validate() {
  clearErrors();
  if (
    !formStore.procheMomentContact ||
    formStore.procheMomentContact.length === 0
  ) {
    errors.procheMomentContact = 'Veuillez choisir au moins une disponibilité';
  }
  return !errors.procheMomentContact;
}

function onBack() {
  router.push('/page7');
}

async function inscrireUtilisateur(id_utilisateur, idExpe, role) {
  const url = `https://formulaire-ri2s-1.onrender.com/api/utilisateurs/${id_utilisateur}/inscriptions?idExpe=${idExpe}&role=${role}`;
  try {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
    return await reponse.json();
  } catch (erreur) {
    console.error("Échec de la liaison à l'expérience :", erreur);
    return false;
  }
}

async function inscrireProcheAExp() {
  const idExpe = Number(formStore.experimentationChoisie);
  const rolePrincipal = formStore.role.toUpperCase();
  const roleProche = rolePrincipal === 'SENIOR' ? 'AIDANT' : 'SENIOR';

  const id_proche = formStore.idProcheGenere; 

  if (!id_proche) {
    console.error("Impossible d'inscrire le proche : ID manquant !");
    return false;
  }

  const inscriptionOk = await inscrireUtilisateur(id_proche, idExpe, roleProche);

  if (inscriptionOk !== false) {
    console.log("Le proche a bien été relié à l'expérience !");
    return true;
  } else {
    console.error("Échec de la liaison du proche à l'expérience.");
    return false;
  }
}

async function onNext() {
  if (!validate()) return;

  const payload = {
    utilisateur: {
      nom: formStore.procheNom.trim().toUpperCase(),
      prenom: formStore.prochePrenom.trim(),
      email: formStore.procheEmail.trim(),
      telephone: formStore.procheTelephone.replace(/\s/g, '').trim(),
      codePostal: Number(formStore.procheCodePostal),
      dateNaissance: formStore.procheNaissance + 'T00:00:00.000Z',
      consentement: true,
    },
    profilNonPro: {
      participationExpe: 'OUI',
      momentsJournee: JSON.parse(JSON.stringify(formStore.procheMomentContact)),
    },
    profilPro: null,
    demandeExpe: null,
  };

  console.log('Envoi du proche :', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(
      'https://formulaire-ri2s-1.onrender.com/api/utilisateurs/inscription',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      console.error('Erreur serveur proche :', errorMsg);
      alert("Le serveur a refusé l'inscription du proche.");
      return;
    }

    const result = await response.json();
    console.log('Inscription proche ID:', result.idUtilisateur || result.id);

    formStore.idProcheGenere = result.idUtilisateur || result.id;
    
    const expeLiee = await inscrireProcheAExp();

    if (expeLiee) {
      router.push('/page9');
    } else {
      alert("Le proche a été créé, mais n'a pas pu être relié à l'expérience.");
    }

  } catch (error) {
    console.error(, error);
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
          <h1>Ajouter un proche</h1>
          <div class="stepInfo">étape 8/9</div>
        </div>

        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label>Informations complémentaires</label>
            <p class="desc">Il préfère être contacté :</p>
            <label
              ><input
                type="checkbox"
                value="MATIN"
                v-model="formStore.procheMomentContact"
              />
              Le matin</label
            >
            <label
              ><input
                type="checkbox"
                value="MIDI"
                v-model="formStore.procheMomentContact"
              />
              Le midi</label
            >
            <label
              ><input
                type="checkbox"
                value="APRES_MIDI"
                v-model="formStore.procheMomentContact"
              />
              L'après-midi</label
            >
            <label
              ><input
                type="checkbox"
                value="SOIR"
                v-model="formStore.procheMomentContact"
              />
              Le soir</label
            >
            <p v-if="errors.procheMomentContact" class="error">
              {{ errors.procheMomentContact }}
            </p>
          </div>

          <div class="field">
            <label>Informations complémentaires :</label>
            <input
              class="input"
              v-model="formStore.procheInfosComplementaires"
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
