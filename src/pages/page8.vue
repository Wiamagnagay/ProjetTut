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

async function onNext() {
  if (!validate()) return;

  const idProcheExistant = formStore.idProcheGenere; 

  try {
    if (!idProcheExistant) {
      const payload = {
        utilisateur: {
          nom: formStore.procheNom.trim().toUpperCase(),
          prenom: formStore.prochePrenom.trim(),
          codePostal: Number(formStore.procheCodePostal),
          dateNaissance: formStore.procheNaissance + 'T00:00:00.000Z',
          consentement: true,
        },
        profilNonPro: {
          participationExpe: 'OUI',
          momentsJournee: JSON.parse(JSON.stringify(formStore.procheMomentContact)),
          telephoneNonPro: formStore.procheTelephone.replace(/\s/g, '').trim(),
          emailNonPro: formStore.procheEmail.trim(),
        },
        profilPro: null,
        demandeExpe: null,
      };

      const response = await fetch('https://formulaire-ri2s-1.onrender.com/api/utilisateurs/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      formStore.idProcheGenere = result.idUtilisateur || result.id;
    } 
    
    else {
      const payloadNonPro = {
        idUtilisateur: idProcheExistant, 
        participationExpe: 'OUI',
        momentsJournee: JSON.parse(JSON.stringify(formStore.procheMomentContact)),
        telephoneNonPro: formStore.procheTelephone ? formStore.procheTelephone.replace(/\s/g, '').trim() : '',
        emailNonPro: formStore.procheEmail ? formStore.procheEmail.trim() : '',
      };

      const response = await fetch(`https://formulaire-ri2s-1.onrender.com/api/utilisateurs/${idProcheExistant}/profil-non-pro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadNonPro),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'upgrade du proche en Non-Pro");
      }
    }

    router.push('/page9');

  } catch (error) {
    console.error('Erreur lors du traitement du proche :', error);
    alert("Une erreur est survenue. Vérifiez si l'email n'est pas déjà utilisé.");
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
