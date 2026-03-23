<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function onBack() { router.push('/page4'); }
function onSubmit() { alert('Formulaire envoyé avec succès !'); }
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
          <div class="stepInfo">étape 6/6</div>
        </div>

        <div class="centerContent">
          <h1>Merci d'avoir rempli ce formulaire</h1>
          <p class="desc">Vous allez être recontacté par l'équipe RI2S</p>
        </div>

        <div class="bottomRow">
          <p class="help">En cas de difficulté merci de nous contacter à cette adresse : <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a></p>
          <button class="btn" @click="onSubmit">Envoyer le formulaire</button>
        </div>
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
  margin-bottom: 2rem;
}
.centerContent {
  text-align: center;
  padding: 2rem 0;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.desc {
  font-size: 1.1rem;
  color: #555;
}
</style>