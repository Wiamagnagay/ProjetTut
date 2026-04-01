<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../../store/formStore';

const router = useRouter();
const errors = reactive({ momentContact: '', informationsComplementaires: '' });

function clearErrors() {
  errors.momentContact = '';
  errors.informationsComplementaires = '';
}

function validate() {
  clearErrors();
  if (!formStore.momentContact || formStore.momentContact.length === 0) {
    errors.momentContact = 'Veuillez choisir au moins une disponibilité';
  }
  return !errors.momentContact;
}

function onBack() {
  router.push('/page2');
}

async function onNext() {
  if (!validate()) return;

  const typeAction = formStore.typeAction;
  const idUtilisateur = formStore.idUtilisateurGenere;

  try {
    if (typeAction === 'creation_complete') {
      const payload = {
        utilisateur: {
          nom: formStore.nom.trim().toUpperCase(),
          prenom: formStore.prenom.trim(),
          codePostal: Number(formStore.codePostal),
          dateNaissance: formStore.naissance + 'T00:00:00.000Z',
          consentement: true,
        },
        profilNonPro: {
          participationExpe: 'OUI',
          momentsJournee: JSON.parse(JSON.stringify(formStore.momentContact)),
          emailNonPro: formStore.email.trim(),
          telephoneNonPro: formStore.telephone.replace(/\s/g, '').trim(),
        },
        profilPro: null,
        demandeExpe: null,
      };

      const response = await fetch(
        'https://formulaire-ri2s-1.onrender.com/api/utilisateurs/inscription',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();
      formStore.idUtilisateurGenere = result.idUtilisateur || result.id;
    } 
    else if (typeAction === 'ajout_profil_non_pro') {
      if (!idUtilisateur) throw new Error("ID Utilisateur manquant");

      const payloadNonPro = {
        participationExpe: 'OUI',
        momentsJournee: JSON.parse(JSON.stringify(formStore.momentContact)),
        emailNonPro: formStore.email.trim(),
        telephoneNonPro: formStore.telephone.replace(/\s/g, '').trim(),
      };

      const response = await fetch(
        `https://formulaire-ri2s-1.onrender.com/api/utilisateurs/${idUtilisateur}/profil-non-pro`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadNonPro),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de l'ajout du profil");
    }

    console.log('Profil Non-Pro enregistré avec succès !');
    router.push('/page4');
  } catch (error) {
    console.error('Erreur réseau ou serveur :', error);
    alert("Une erreur est survenue. Vérifiez que les champs correspondent au format attendu.");
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
          <div class="stepInfo">étape 3/9</div>
        </div>
        <h1>Formulaire de Prise de Contact</h1>
        <form class="form" @submit.prevent="onNext">
          <div class="field">
            <label
              >Je préfère être contacté (plusieurs choix possibles) :</label
            >
            <label
              ><input
                type="checkbox"
                value="MATIN"
                v-model="formStore.momentContact"
              />
              Le matin</label
            >
            <label
              ><input
                type="checkbox"
                value="MIDI"
                v-model="formStore.momentContact"
              />
              Le midi</label
            >
            <label
              ><input
                type="checkbox"
                value="APRES_MIDI"
                v-model="formStore.momentContact"
              />
              L'après-midi</label
            >
            <label
              ><input
                type="checkbox"
                value="SOIR"
                v-model="formStore.momentContact"
              />
              Le soir</label
            >

            <p v-if="errors.momentContact" class="error">
              {{ errors.momentContact }}
            </p>
          </div>
          <div class="field">
            <label>Informations complémentaires :</label>
            <input
              class="input"
              :class="{ 'input-error': errors.informationsComplementaires }"
              v-model="formStore.informationsComplementaires"
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
