<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

const totalSteps = 8;
const stepNumber = 8;

const isSubmitting = ref(false);
const submitMessage = ref('');
const selectedFiles = ref([]);

const errors = reactive({
  conclusion: '',
});

function clearErrors() {
  errors.conclusion = '';
  submitMessage.value = '';
}

function onFilesChange(event) {
  const newFiles = Array.from(event.target.files || []);

  // Accumuler les fichiers sans doublons (comparaison par nom)
  const existingNames = new Set(selectedFiles.value.map((f) => f.name));
  const toAdd = newFiles.filter((f) => !existingNames.has(f.name));

  selectedFiles.value = [...selectedFiles.value, ...toAdd];
  formStore.documentsConclusion = selectedFiles.value;

  // Reset l'input pour permettre de re-sélectionner le même fichier
  event.target.value = '';
}

function removeFile(index) {
  selectedFiles.value.splice(index, 1);
  formStore.documentsConclusion = [...selectedFiles.value];
}

function validate() {
  clearErrors();
  return !errors.conclusion;
}

async function onSubmit() {
  if (!validate()) return;

  isSubmitting.value = true;
  submitMessage.value = '';

  try {
    const payload = {
      utilisateur: {
        nom:          (formStore.nom || '').trim().toUpperCase(),
        prenom:       (formStore.prenom || '').trim(),
        email:        (formStore.email || '').trim(),
        telephone:    (formStore.telephone || '').replace(/\s/g, '').trim(),
        codePostal:   formStore.codePostal ? Number(formStore.codePostal) : null,
        consentement: true,
      },

      profilIndustriel: {
        // Page 1 — contact
        fonction: formStore.fonction || '',

        // Page 2 — infos entreprise
        entreprise:         formStore.entreprise         || '',
        adresse:            formStore.adresse            || '',
        dateCreation:       formStore.dateCreation
                              ? formStore.dateCreation + 'T00:00:00.000Z'
                              : null,
        siret:              formStore.siret              || '',
        effectif:           formStore.effectif ? Number(formStore.effectif) : null,
        structureJuridique: formStore.structureJuridique || '',
        siteWeb:            formStore.siteWeb            || '',
        autreLieu:          formStore.autreLieu          || '',

        // Page 3 — description solution
        nomSolution:       formStore.nomSolution       || '',
        description:       formStore.description       || '',
        problematique:     formStore.problematique     || '',
        typeInnovation:    formStore.typeInnovation    || '',
        benefices:         formStore.benefices         || '',
        caractereInnovant: formStore.caractereInnovant || '',
        coconception:      formStore.coconception      || '',
        implication:       formStore.implication       || '',
        comite:            formStore.comite            || '',

        // Page 4 — intégration marché
        marche:            formStore.marche            || '',
        modeleEconomique:  formStore.modeleEconomique  || '',
        commercialisation: formStore.commercialisation || '',
        financement:       formStore.financement       || '',
        concurrents:       formStore.concurrents       || '',

        // Page 5 — équipe & écosystème
        equipe:         formStore.equipe         || '',
        accompagnement: formStore.accompagnement || '',
        tiersLieu:      formStore.tiersLieu      || '',
        pourquoiRI2S:   formStore.pourquoiRI2S   || '',

        // Page 6 — technologie / TRL
        trl:                     formStore.trl                     || '',
        justificationTRL:        formStore.justificationTRL        || '',
        dispositifMedical:       formStore.dispositifMedical       || '',
        justificationDispositif: formStore.justificationDispositif || '',
        classeDispositif:        formStore.classeDispositif        || '',

        // Page 7 — besoins d'accompagnement
        besoinsAccompagnement: Array.isArray(formStore.besoinsAccompagnement)
          ? formStore.besoinsAccompagnement
          : [],
        autreBesoin:            formStore.autreBesoin            || '',
        descriptionBesoins:     formStore.descriptionBesoins     || '',
        questionProjet:         formStore.questionProjet         || '',
        terrainExperimentation: formStore.terrainExperimentation || '',

        // Page 8 — conclusion
        conclusion: formStore.conclusion || '',
      },

      profilNonPro: null,
      profilPro:    null,
      demandeExpe:  null,
    };

    // Construction du FormData (JSON + fichiers)
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    // Fichier schéma technique (page 6)
    if (formStore.schemaTechnique instanceof File) {
      formData.append('schemaTechnique', formStore.schemaTechnique);
    }

    // Documents de conclusion — plusieurs fichiers
    if (Array.isArray(formStore.documentsConclusion)) {
      formStore.documentsConclusion.forEach((file) => {
        if (file instanceof File) {
          formData.append('documentsConclusion', file);
        }
      });
    }

    const response = await fetch(
      'https://formulaire-ri2s-1.onrender.com/api/utilisateurs/inscription',
      {
        method: 'POST',
        // Pas de Content-Type manuel : le navigateur gère le boundary multipart
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur serveur :', errorText);
      throw new Error(`Erreur ${response.status} : ${errorText}`);
    }

    const result = await response.json();
    console.log('Candidature soumise, ID :', result.idUtilisateur || result.id);
    formStore.idUtilisateurGenere = result.idUtilisateur || result.id || null;

    router.push('/confirmation');

  } catch (error) {
    console.error('Erreur soumission candidature :', error);
    submitMessage.value = error.message || "Une erreur est survenue lors de l'envoi.";
  } finally {
    isSubmitting.value = false;
  }
}

function onBack() {
  router.push('/page7');
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" class="logo" />
    </header>

    <main class="main">
      <section class="card">
        <div class="cardTop">
          <button class="back" type="button" @click="onBack">← Retour</button>
          <div class="stepInfo">étape {{ stepNumber }}/{{ totalSteps }}</div>
        </div>

        <div class="headCenter">
          <h1>Formulaire de Candidature<br />Entreprise</h1>
          <p class="desc">
            En répondant à ce formulaire, vous acceptez que vos réponses soient
            enregistrées et que vous puissiez être recontacté par l'équipe RI2S.
          </p>
        </div>

        <h2 class="sectionTitle">Conclusion</h2>

        <form class="form" @submit.prevent="onSubmit">

          <!-- Commentaires libres -->
          <div class="field">
            <label class="label">
              Avez-vous des commentaires ou informations supplémentaires dont
              vous voudriez nous faire part ?
            </label>
            <input
              class="input"
              :class="{ 'input-error': errors.conclusion }"
              v-model.trim="formStore.conclusion"
              type="text"
            />
            <p v-if="errors.conclusion" class="error">{{ errors.conclusion }}</p>
          </div>

          <!-- Documents -->
          <div class="field">
            <label class="label">Documents :</label>
            <div class="documentsText">
              <div>• Une démonstration sous forme de vidéo de votre solution</div>
              <div>• Un PowerPoint ou un document présentant votre projet (pdf ou ppt)</div>
              <div>• Autre(s) document(s)</div>
            </div>

            <!-- Zone cliquable pour ajouter des fichiers (cumulatif) -->
            <label for="documents-upload" class="uploadArea">
              <span class="uploadIcon">📄</span>
              <span class="uploadHint">Cliquer pour ajouter des fichiers</span>
            </label>

            <input
              id="documents-upload"
              class="fileInput"
              type="file"
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mov"
              @change="onFilesChange"
            />

            <!-- Liste des fichiers ajoutés avec bouton de suppression -->
            <div v-if="selectedFiles.length" class="fileList">
              <div
                v-for="(file, index) in selectedFiles"
                :key="file.name"
                class="fileItem"
              >
                <span>📎 {{ file.name }}</span>
                <button
                  type="button"
                  class="removeBtn"
                  @click="removeFile(index)"
                  title="Supprimer ce fichier"
                >✕</button>
              </div>
            </div>
          </div>

          <!-- Message retour serveur -->
          <p
            v-if="submitMessage"
            :class="['submitMessage', submitMessage.includes('succès') ? 'success' : 'errorText']"
          >
            {{ submitMessage }}
          </p>

          <div class="bottomRow">
            <p class="help">
              En cas de difficulté merci de nous contacter à cette adresse :
              <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a>
            </p>
            <button class="btn" type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Envoi en cours...' : 'Soumettre ma candidature' }}
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
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 48px;
  border-bottom: 1px solid #e5e5e5;
}

.logo {
  height: 42px;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 1150px;
  background: #f7f7f7;
  border: 2px solid #5cab53;
  border-radius: 32px;
  padding: 40px 44px 30px;
}

.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.back {
  background: #eef4ea;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  color: #6da35e;
  font-size: 14px;
  cursor: pointer;
}

.stepInfo {
  font-size: 24px;
  color: #2f3b52;
}

.headCenter {
  text-align: center;
  margin-bottom: 26px;
}

.headCenter h1 {
  font-size: 52px;
  line-height: 1.05;
  color: #25324b;
  margin: 0 0 22px;
  font-weight: 700;
}

.desc {
  max-width: 860px;
  margin: 0 auto;
  color: #3f4b5f;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;
}

.sectionTitle {
  margin: 0 0 18px;
  color: #25324b;
  font-size: 20px;
  font-weight: 700;
}

.form {
  margin-top: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.label {
  font-size: 13px;
  color: #1c1c1c;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  height: 40px;
  border: 2px solid #9db7bf;
  border-radius: 20px;
  padding: 10px 16px;
  background: white;
  font-size: 14px;
  outline: none;
}

.documentsText {
  font-size: 13px;
  color: #222;
  margin-bottom: 10px;
  line-height: 1.8;
}

/* Zone d'upload cliquable */
.uploadArea {
  width: 100%;
  min-height: 90px;
  border: 2px dashed #9db7bf;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  background: #fafafa;
  transition: border-color 0.2s, background 0.2s;
}

.uploadArea:hover {
  border-color: #5cab53;
  background: #f0faf0;
}

.uploadIcon {
  font-size: 28px;
}

.uploadHint {
  font-size: 13px;
  color: #7a8fa6;
}

.fileInput {
  display: none;
}

/* Liste des fichiers sélectionnés */
.fileList {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fileItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #2f3b52;
  background: #eef4ea;
  padding: 8px 14px;
  border-radius: 10px;
}

.removeBtn {
  background: none;
  border: none;
  color: #a52020;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 0 0 0 10px;
  line-height: 1;
  flex-shrink: 0;
}

.removeBtn:hover {
  color: #c62828;
}

.bottomRow {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.help {
  margin: 0;
  color: #a52020;
  font-size: 12px;
}

.help a {
  color: #a52020;
  text-decoration: none;
}

.btn {
  min-width: 200px;
  height: 48px;
  background: #69b34c;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover:not(:disabled) {
  background: #5a9e3e;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submitMessage {
  margin-top: 8px;
  font-size: 14px;
  padding: 10px 14px;
  border-radius: 10px;
}

.success {
  color: #2e7d32;
  background: #e8f5e9;
}

.errorText {
  color: #c62828;
  background: #ffebee;
}

.footer {
  text-align: center;
  font-size: 13px;
  color: #4c5668;
  padding: 18px 10px 14px;
}

.footer a {
  display: block;
  margin-bottom: 8px;
  color: #3d63c8;
  text-decoration: none;
}

.input-error {
  border-color: red !important;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .topbar {
    flex-direction: column;
    height: auto;
    gap: 10px;
    padding: 18px;
  }

  .card {
    padding: 24px 20px;
  }

  .headCenter h1 {
    font-size: 34px;
  }

  .bottomRow {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>