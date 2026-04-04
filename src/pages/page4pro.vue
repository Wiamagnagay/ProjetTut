<script setup>
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

function onFinish() {
  router.push('/page9'); 
}

function onAddPatient() {
  formStore.idUtilisateurGenere = null;
  formStore.nom = '';
  formStore.prenom = '';
  formStore.email = '';  
  router.push('/page1');
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
          <h1>Inscription réussie !</h1>
        </div>
        
        <p class="desc">
          Votre profil professionnel a été enregistré avec succès. Chaque expérimentation nécessitant un professionnel devra être demandée par vous.
         Que souhaitez-vous faire maintenant ?
        </p>

        <div class="choices">
          <button class="btn-choice" @click="onAddPatient">
            <div class="text">
              <strong class="titre_choix">Inscrire un patient</strong>
              <p>Je souhaite remplir le formulaire pour l'un de mes patients.</p>
            </div>
          </button>

          <button class="btn-choice outline" @click="onFinish">
            <div class="text">
              <strong class="titre_choix">Terminer ici</strong>
              <p>Je ne souhaite pas inscrire de patient pour le moment.</p>
            </div>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.choices {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  font-family:'DM Sans', sans-serif,

}

.btn-choice {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #cee;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family:'DM Sans', sans-serif,
}



.btn-choice.outline {
  border-color: #cee;
}

.icon {
  font-size: 2rem;
}

.text strong {
  display: block;
  font-size: 1.1rem;
  color: #333;
}

.text p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  font-family:'DM Sans', sans-serif,
}

.titre_choix{
  font-family:'DM Sans', sans-serif,

}
</style>