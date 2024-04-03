<template>
    <form @submit.prevent="onSave">
        <div class="form_group">
            <label for="">Name:</label>
            <input 
                class="form_control" 
                type="text" 
                placeholder="Enter name:"
                v-model="editedDeck.name">
        </div>

        <div class="form_group">
            <label for="">Description:</label>
            <textarea 
                class="form_control" 
                placeholder="Enter name deck"
                v-model="editedDeck.description"/>
        </div>

        <div class="form_group">
            <label for="">Thumbnail:</label>
            <input 
                class="form_control" 
                type="text" 
                placeholder="https://example.com/foo.png"
                v-model="editedDeck.thumbnail">
        </div>

        <div class="form_group d_flex justify_content_end">
            <button class="btn btn_danger" @click.prevent="closeModal">Close</button>
            <button class="btn btn_success ml_3" type="submit">{{editedDeck && editedDeck.id ? 'Edit' : 'Create'}}</button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        deck: {
            type: Object,
            required: false,
            default: () => ({
                name: '',
                description: '',
                thumbnail: ''
            })
        }
    },

    data() {
        return {
            editedDeck: this.deck ? {...this.deck} : {
                name: '',
                description: '',
                thumbnail: ''
            }
        }
    },

    methods: {
        closeModal() {
            this.$modal.close({ name: 'DeckFormModal' })
        },
        onSave() {
            this.$emit('submit', this.editedDeck)
            this.$modal.close({ name: 'CreateDeckModal' })
            // location.reload()
        }
    }
}
</script>

<style>

</style>