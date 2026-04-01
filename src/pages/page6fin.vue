<script setup>
import { useRouter } from 'vue-router';
import { formStore } from '../store/formStore';

const router = useRouter();

</script>

<template>
  <div class="page">
    <header class="topbar">
      <img src="@/assets/logoRI2S.png" alt="RI2S" style="height: 40px" />
    </header>

    <main class="main">
      <section class="card">
        <div class="cardTop">
          <h1>Merci d'avoir rempli ce formulaire</h1>
          <div class="stepInfo">étape 6/6</div>
        </div>

        <p class="desc">
          Nous vous informons que toutes vos données ont bien été envoyées à l'équipe RI2S.
        </p>
        <p class="desc">Vous allez être recontacté par l'équipe RI2S.</p>

        <div class="bottomRow">
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
