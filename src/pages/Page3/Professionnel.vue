<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { formStore } from "../../store/formStore";

const router = useRouter();
const errors = reactive({ profession: "", ville: "", zone: "", milieu: "", structure: "", commentConnu: "" });

function clearErrors() {
  errors.profession = ""; errors.ville = ""; errors.zone = "";
  errors.milieu = ""; errors.structure = ""; errors.commentConnu = "";
}

function validate() {
  clearErrors();
  if (!formStore.profession.trim()) errors.profession = "Champ obligatoire";
  if (!formStore.ville.trim()) errors.ville = "Champ obligatoire";
  if (!formStore.zone.trim()) errors.zone = "Champ obligatoire";
  if (!formStore.milieu.trim()) errors.milieu = "Champ obligatoire";
  if (!formStore.structure.trim()) errors.structure = "Champ obligatoire";
  if (!formStore.commentConnu) errors.commentConnu = "Choix obligatoire";
  return !errors.profession && !errors.ville && !errors.zone && !errors.milieu && !errors.structure && !errors.commentConnu;
}

function onBack() { 
  router.push("/page2"); 
}

async function onNext() { 
  if (!validate()) return; 

  const payload = {
    utilisateur: {
      nom: formStore.nom.trim().toUpperCase(),
      prenom: formStore.prenom.trim(),
      email: formStore.email.trim(),
      telephone: formStore.telephone.replace(/\s/g, '').trim(),
      codePostal: Number(formStore.codePostal), 
      dateNaissance: formStore.naissance + "T00:00:00.000Z", 
      consentement: true
    },
    profilNonPro: null, 
    
    profilPro: {
      nomFonction: formStore.profession.trim(), 
      structure: formStore.structure.trim(),
      participationExpe: "OUI" 
    },
    
    profilIndustriel: null,
    demandeExpe: null
  };

  try {
    const response = await fetch('https://formulaire-ri2s-1.onrender.com/api/utilisateurs/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Erreur 400 ou 500");
    }

    const result = await response.json();
    console.log("Inscription PRO ID :", result.idUtilisateur || result.id);
    
    formStore.idUtilisateurGenere = result.idUtilisateur || result.id;

    router.push("/page4"); 

  } catch (error) {
    console.error("Erreur d'inscription PRO :", error);
    alert("erreur");
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
          <h1>Formulaire de Prise de Contact</h1>
          <div class="stepInfo">étape 3/9</div>
        </div>
        <p class="desc">Informations complémentaires</p>
        <form class="form" @submit.prevent="onNext">

          <div class="twoCol">
            <div class="leftCol">
              <div class="field">
                <label>Profession <span class="req">*</span></label>
                <input class="input small" :class="{ 'input-error': errors.profession }" v-model="formStore.profession" />
                <p v-if="errors.profession" class="error">{{ errors.profession }}</p>
              </div>
              <div class="field">
                <label>Dans quelle ville exercez-vous ? <span class="req">*</span></label>
                <input class="input small" :class="{ 'input-error': errors.ville }" v-model="formStore.ville" />
                <p v-if="errors.ville" class="error">{{ errors.ville }}</p>
              </div>
              <div class="field">
                <label>De quelle zone géographique sont issus vos patients ? <span class="req">*</span></label>
                <input class="input small" :class="{ 'input-error': errors.zone }" v-model="formStore.zone" />
                <p v-if="errors.zone" class="error">{{ errors.zone }}</p>
              </div>
              <div class="field">
                <label>Dans quel milieu exercez-vous ? <span class="req">*</span></label>
                <input class="input small" :class="{ 'input-error': errors.milieu }" v-model="formStore.milieu" />
                <p v-if="errors.milieu" class="error">{{ errors.milieu }}</p>
              </div>
              <div class="field">
                <label>Quel est le nom de votre structure ? <span class="req">*</span></label>
                <input class="input small" :class="{ 'input-error': errors.structure }" v-model="formStore.structure" />
                <p v-if="errors.structure" class="error">{{ errors.structure }}</p>
              </div>
              <div class="field">
                <label>Informations complémentaires :</label>
                <input class="input small" v-model="formStore.infosComplementairesPro" />
                <div class="hint">Optionnel</div>
              </div>
            </div>

            <div class="rightCol">
              <div class="field">
                <label>Comment avez-vous connu RI2S ?</label>
                <label><input type="radio" value="structure_partenaire" v-model="formStore.commentConnu" /> Par l'intermédiaire d'une structure partenaire</label>
                <label><input type="radio" value="linkedin" v-model="formStore.commentConnu" /> Vous nous suivez sur LinkedIn.</label>
                <label><input type="radio" value="confrere" v-model="formStore.commentConnu" /> Par l'intermédiaire d'un confrère.</label>
                <label><input type="radio" value="patient" v-model="formStore.commentConnu" /> Par l'intermédiaire d'un de vos patients.</label>
                <label><input type="radio" value="flyer" v-model="formStore.commentConnu" /> Vous avez reçu un flyer, vu une affiche</label>
                <label><input type="radio" value="autre" v-model="formStore.commentConnu" /> Autre (précisez à la question suivante)</label>
                <p v-if="errors.commentConnu" class="error">{{ errors.commentConnu }}</p>
              </div>
            </div>
          </div>

          <div class="bottomRow">
            <p class="help">En cas de difficulté merci de nous contacter à cette adresse : <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a></p>
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
.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
h1 {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
}
.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.leftCol .field {
  margin-bottom: 0.8rem;
}
.input.small {
  width: 80%;
}
.rightCol .field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
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