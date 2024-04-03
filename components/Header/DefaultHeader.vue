<template>
    <header>
        <nav>
            <ul>
                <li>
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/decks">Deck</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/profile">Profile</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/settings">Setting</nuxt-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
header {
    background: #000;
    color: #fff;
    height: 60px;
    nav, ul {
        height: inherit;
    }
    ul {
        align-items: center;
        display: flex;
        justify-content: center;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            margin: 0 1.5rem;
            a {
                color: #fff;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
                &.nuxt-link-exact-active {
                    color: red;
                }
            }
        }
    }
}
</style>