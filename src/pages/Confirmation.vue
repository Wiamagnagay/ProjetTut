<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function onHome() {
  router.push('/');
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" class="logo" />
    </header>

    <main class="main">
      <section class="card">
        <div class="iconWrap">
          <div class="checkCircle">✓</div>
        </div>

        <h1>Candidature envoyée !</h1>

        <p class="message">
          Merci pour votre candidature. L'équipe RI2S a bien reçu votre dossier
          et reviendra vers vous dans les meilleurs délais.
        </p>

        <p class="contact">
          Pour toute question, contactez-nous :
          <a href="mailto:contact@ri2s.fr">contact@ri2s.fr</a>
        </p>

        <button class="btn" @click="onHome">Retour à l'accueil</button>
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
  max-width: 620px;
  background: #f7f7f7;
  border: 2px solid #5cab53;
  border-radius: 32px;
  padding: 52px 44px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.iconWrap {
  margin-bottom: 24px;
}

.checkCircle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #69b34c;
  color: white;
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

h1 {
  font-size: 36px;
  color: #25324b;
  margin: 0 0 20px;
  font-weight: 700;
}

.message {
  font-size: 15px;
  color: #3f4b5f;
  line-height: 1.6;
  margin: 0 0 16px;
}

.contact {
  font-size: 14px;
  color: #a52020;
  margin: 0 0 32px;
}

.contact a {
  color: #a52020;
  text-decoration: none;
  font-weight: 600;
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

.btn:hover {
  background: #5a9e3e;
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

@media (max-width: 768px) {
  .topbar {
    flex-direction: column;
    height: auto;
    gap: 10px;
    padding: 18px;
  }

  .card {
    padding: 32px 20px;
  }

  h1 {
    font-size: 28px;
  }
}
</style>