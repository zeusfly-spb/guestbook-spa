<template>
    <div>
        <div>Вход</div>
        <p><label>E-mail<br><input type="email" v-model="email" class="ip1"></label></p>
        <p><label>Пароль<br><input type="password" v-model="password" class="ip2" @keyup.enter="logIn"></label>
        <p><button  @click.prevent="logIn">Войти</button></p>
    </div>
</template>
<script>
    export default {
        data: () => ({
            name: '',
            email: '',
            password: ''
        }),
        methods: {
            logIn () {
                this.$store.dispatch('logIn', {email: this.email, password: this.password})
                    .then(() => {
                        this.$router.push('/home')
                    })
                    .catch(() => this.email = this.password = '')
            }
        }
    }
</script>