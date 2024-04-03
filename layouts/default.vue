<template>
  <div>
    <!-- <h1>Default Layout</h1> -->
    <DefaultHeader/>
    <Nuxt />

    <!-- Modal -->
    <v-modal v-slot="payload" name="DeckFormModal">
      <div class="modal_body">
        <!-- {{payload}} -->
        <h2>{{payload && payload.payload ? 'Edit Deck' : 'Create a new Deck'}}</h2>
        <DeckForm :deck="payload.payload" @submit="onSubmit"/>
      </div>
    </v-modal>

    <DefaultFooter/>
  </div>
</template>

<script>
// import axios from 'axios'

import DefaultHeader from '@/components/Header/DefaultHeader'
import DefaultFooter from '@/components/Footer/DefaultFooter'
import DeckForm from '@/components/Decks/DeckForm'

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
    DeckForm
  },

  methods: {
    onSubmit(deckData) {
      if(deckData && !deckData.id) {
        this.$store.dispatch('addDeck', deckData)
          .then(() => {
            this.$modal.close({ name: 'DeckFormModal' })
          })
      } else {
        this.$store.dispatch('editDeck', deckData)
          .then(() => {
            this.$modal.close({ name: 'DeckFormModal' })
            this.$router.push('/decks')
          })
      }
    }
  }
}
</script>
