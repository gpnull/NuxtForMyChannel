<template>
    <section>
        <div class="r">
            <div class="ct text_center">
                <!-- <h3>Deck #{{ $route.params.id }}: {{deck.name}}</h3> -->
                <h3>Deck: {{deck.name}}</h3>
                <div class="tool">
                    <button class="btn btn_success">Start now</button>
                    <button class="btn btn_primary" @click.prevent="openModal('CreateCardModal')">Create a card</button>
                    <button class="btn btn_warning" @click.prevent="openModal('DeckFormModal')">Edit Deck</button>
                </div>

                <hr class="divide">
                
                <div class="r">
                    <CardList 
                        v-for="card in cards" 
                        :key="card._id" 
                        :keyword="card.keyword"
                        :picture="card.picture"/>
                </div>

            </div>
        </div>

        <!-- Modal -->
        <v-modal name="CreateCardModal">
            <div class="modal_body">
                <h2>Create a new Card</h2>
                <form action="">
                    <div class="form_group">
                        <label for="">Name:</label>
                        <input class="form_control" type="text" placeholder="Enter name:">
                    </div>

                    <div class="form_group">
                        <label for="">Description:</label>
                        <textarea class="form_control" placeholder="Enter name Card"/>
                    </div>

                    <div class="form_group">
                        <label for="">Thumbnail:</label>
                        <input type="file">
                    </div>

                    <div class="form_group d_flex justify_content_end">
                        <button class="btn btn_danger" @click.prevent="closeModal">Close</button>
                        <button class="btn btn_success ml_3" @click.prevent="createDeck">Create</button>
                    </div>
                </form>
            </div>
        </v-modal>
        
    </section>
</template>

<script>
import axios from 'axios'

import CardList from '@/components/Card/CardList'

export default {
    components: {
        CardList
    },

    head() {
        return {
            title: `Decks ${this.deck.name} | Learning Flash Card Online`
        }
    },

    // validate({params}) {
    //     return /^[0-9]$/.test(params.id)
    // },

    asyncData(context) {
        console.log(context);

        return context.$axios.$get(`${process.env.baseApiUrl}/decks/${context.params.id}.json`)
            .then((data) => {
                return {
                    deck: data
                }
            })
            .catch((e) => {
                context.error(e)
            })

        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve({
        //             deck: {
        //                 _id: 1,
        //                 name: `Learn English by Deck ${context.params.id}`,
        //                 description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        //                 thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
        //             }
        //         })
        //     }, 1000)
        // })
        // .then((data) => {
        //     return data
        // })
        // .catch((e) => {
        //     console.log(e);
        //     context.error(e)
        // })
    },

    data() {
        return {
            cards: [
                {
                    _id: 1,
                    picture: 'https://www.sapo.vn/blog/wp-content/uploads/2018/12/phan-mem-quan-ly-shop-thoi-trang-29.jpg',
                    keyword: 'Shop'
                },
                {
                    _id: 2,
                    picture: 'https://www.sapo.vn/blog/wp-content/uploads/2018/12/phan-mem-quan-ly-shop-thoi-trang-29.jpg',
                    keyword: 'Shop'
                },
                {
                    _id: 3,
                    picture: 'https://www.sapo.vn/blog/wp-content/uploads/2018/12/phan-mem-quan-ly-shop-thoi-trang-29.jpg',
                    keyword: 'Shop'
                },
                {
                    _id: 4,
                    picture: 'https://www.sapo.vn/blog/wp-content/uploads/2018/12/phan-mem-quan-ly-shop-thoi-trang-29.jpg',
                    keyword: 'Shop'
                },
            ]
        }
    },

    methods: {
        openModal(name) {
            if(name === 'CreateCardModal') {
                this.$modal.open({ name: 'CreateCardModal' })
            } else if (name === 'DeckFormModal') {
                this.$modal.open({ name: 'DeckFormModal', payload: {...this.deck, id: this.$route.params.id} })
            }
        },
        closeModal() {
            this.$modal.close({ name: 'CreateCardModal' })
        }
    }
}
</script>

<style lang='scss'>
section {
    padding-top: 3rem;
    .card {
        padding: 1rem;
        img {
            width: 60%;
        }
    }
    .divide {
        margin: 2rem 0;
    }
}

.modal_body {
    background-color: #ffffff;
    padding: 1rem;
}
</style>