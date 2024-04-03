<template>
    <section class="page">
        <div class="card card-form">
            <div class="card_body">
                <h3 class="text_center">Login</h3>
                <form @submit.prevent="onSubmit">
                    <div class="form_group">
                        <label for="email">Email</label>
                        <input 
                            id="email" 
                            class="form_control" 
                            type="text" 
                            placeholder="example@email.com"
                            v-model="email">
                    </div>

                    <div class="form_group">
                        <label for="password">Password</label>
                        <input 
                            id="password" 
                            class="form_control" 
                            type="password" 
                            placeholder="password"
                            v-model="password">
                    </div>

                    <div class="form_group">
                        <button type="submit" class="btn btn_success btn-submit">Login</button>
                    </div>
                </form>

                <div class="other text_center">
                    <span>Not account? <nuxt-link to="/register" tag="a">Register Now</nuxt-link></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'auth',

    data() {
        return {
            isLogin: true,
            email: '',
            password: ''
        }
    },

    methods: {
        onSubmit() {
            this.$store.dispatch('authenticateUser', {
                email: this.email,
                password: this.password,
                isLogin: this.isLogin
            })
            .then((result) => {
                // console.log(result);
                if(result.success) {
                    this.$router.push('/decks')
                }
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.page {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    .card-form {
        width: 500px;
    }
    .btn-submit {
        width: 100%;
    }
}
</style>