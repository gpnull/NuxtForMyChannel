// import axios from 'axios'
import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            decks: [],
            token: null
        },

        mutations: {
            setDecks(state, decks) {
                state.decks = decks
            },
            addDeck(state, newDeck) {
                state.decks.push(newDeck)
            },
            editDeck(state, editDeck) {
                const deckIndex = state.decks.findIndex(deck => deck.id === editDeck.id)

                state.decks[deckIndex] = editDeck
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },

        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get(`${process.env.baseApiUrl}/decks.json`)
                    .then((data) => {
                        const decksArr = []
                        for (const key in data) {
                            decksArr.push({
                                ...data[key],
                                id: key
                            })
                        }

                        vuexContext.commit('setDecks', decksArr)
                    })
                    .catch((e) => {
                        context.error(e);
                    })

                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                        
                //         resolve({ decks: [
                //             {
                //                 _id: 1,
                //                 name: 'Learn English',
                //                 description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
                //                 thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
                //             },
    
                //             {
                //                 _id: 2,
                //                 name: 'Learn Korean',
                //                 description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
                //                 thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
                //             },
    
                //             {
                //                 _id: 3,
                //                 name: 'Learn Chinese',
                //                 description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
                //                 thumbnail: 'https://ejoy-english.com/blog/wp-content/uploads/2018/10/image.png'
                //             }
                //         ]})
                //     }, 1000)
                // })
                // .then((data) => {
                //     vuexContext.commit('setDecks', data.decks)
                // })
            },

            addDeck(vuexContext, deckData) {
                return this.$axios.$post(`${process.env.baseApiUrl}/decks.json?auth=${vuexContext.state.token}`, deckData)
                    .then((data) => {
                        vuexContext.commit('addDeck', {...deckData, id: data.name})
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },

            editDeck(vuexContext, deckData) {
                const deckId = deckData.id
                delete deckData.id

                return this.$axios.$put(`${process.env.baseApiUrl}/decks/${deckId}.json?auth=${vuexContext.state.token}`, deckData)
                    .then((data) => {
                        vuexContext.commit('editDeck', {...data, id: deckId})
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },

            authenticateUser(vuexContext, credentials) {
                return new Promise((resolve, reject) => {
                    // check login or register 
                    let authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`

                    if (!credentials.isLogin) {
                        authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`
                    }

                    // call api to firebase
                    this.$axios.$post(authUrlApi, {
                        email: credentials.email,
                        password: credentials.password,
                        returnSecureToken: true
                    })
                    .then((result) => {
                        console.log(result);
                        vuexContext.commit('setToken', result.idToken)
                        vuexContext.dispatch('setLogoutTimer', result.expriesIn)
                        resolve({ success: true })
                    })
                    .catch((e) => {
                        console.log(e.response);
                        reject(e.response)
                    })
                })
            },

            setLogoutTimer(vuexContext, duration) {
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            }

            // setDecks(vuexContext, decks) {
            //     vuexContext.commit('setDecks', decks)
            // }
        },

        getters: {
            decks(state) {
                return state.decks
            },

            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore