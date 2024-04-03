<template>
    <div>
        <div class="ct">
            <div class="d_flex justify_content_between my_3">
                <h3>List of Decks:</h3>
                <button class="btn btn_success" @click.prevent="openModal">Create a Deck</button>
            </div>

            <ul class="decks-list">
                <DeckList 
                    v-for="deck in decks" 
                    :key="deck._id" 
                    :id="deck.id"
                    :name="deck.name" 
                    :description="deck.description" 
                    :thumbnail="deck.thumbnail"/>
            </ul>
        </div>
    </div>
</template>

<script>
import DeckList from '@/components/Decks/DeckList'

export default {
    // asyncData(context) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve({
    //                 decks: [
    //                     {
    //                         _id: 1,
    //                         name: 'Learn English',
    //                         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    //                         thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
    //                     },

    //                     {
    //                         _id: 2,
    //                         name: 'Learn Korean',
    //                         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    //                         thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
    //                     },

    //                     {
    //                         _id: 3,
    //                         name: 'Learn Chinese',
    //                         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
    //                         thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
    //                     }
    //                 ]
    //             })
    //         }, 1000)
    //     })
    //     .then((data) => {
    //         return data
    //     })
    //     .catch((e) => {
    //         // console.log(e);
    //         context.error(e)
    //     })
    // },

    // created() {
    //     this.$store.dispatch('setDecks', this.decks)
    //     console.log(this.$store.getters.decks);
    // },

    middleware: 'auth',

    head: {
        title: 'My Decks | Learning Flash Card Online'
    },

    computed: {
        decks() {
            return this.$store.getters.decks
        }
    },

    components: {
        DeckList
    },
    
    methods: {
        openModal() {
            this.$modal.open({ name: 'DeckFormModal' })
        },
    }
}
</script>

<style lang='scss'>
.decks-list {
    li {
        margin-bottom: 1rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .deck {
        display: block;
    }
    .deck-card {
        display: flex;
        flex-direction: row;
        height: 250px;
        img {
            width: 250px;
            height: auto;
        }
    }
}

.modal_body {
    background-color: #ffffff;
    padding: 1rem;
}
</style>