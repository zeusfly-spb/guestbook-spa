<template>
<div
    class="container"
>
    <div
        class="register-form"
    >
        <div
            class="title"
        >
            Регистрация
        </div>
        <div
            class="credentials"
        >
            <i 
                class="material-icons small valign"
                title="Имя пользователя"
            >
                person
            </i>
            <input 
                type="text"
                v-model="name"
                placeholder="Имя пользователя"
            />
        </div>
        <div
            class="credentials"
        >
            <i 
                class="material-icons small valign"
                title="email"
            >
                email
            </i>
            <input 
                type="text"
                v-model="email"
                ref="emailInput"
                placeholder="email"
            />
        </div>
        <div
            class="credentials"
        >
            <i
                class="material-icons"
                title="Пароль"
            >
                lock
            </i>
            <input 
                type="password"
                v-model="password"
                placeholder="Пароль"
            >
        </div>
        <div
            class="credentials"
        >
            <i
                class="material-icons"
                title="Повторный ввод пароля"
            >
                vpn_key
            </i>
            <input 
                type="password"
                v-model="c_password"
                placeholder="Повторный ввод пароля"
            >
        </div>
        <div>
            <button
                @click="registerUser"
            >
                Регистрировать
            </button>
        </div>
        <div
            class="footer-register"
        >
            <router-link to="/login">
                Войти
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'RegisterView',
        data: () => ({
            name: '',
            email: '',
            password: '',
            c_password: ''
        }),
        computed: {
            registeredUser () {
                return this.$store.state.registeredUser
            },
            valid () {
                return [this.password, this.c_password, this.name].every(item => item.length > 0) && this.password === this.c_password
            }
        },
        methods: {
            registerUser () {
                if (!this.valid) {
                    return alert('Проверьте правильность заполнения формы')
                }
                this.axios.post('/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    c_password: this.c_password
                })
                    .then(res => {
                        this.$store.commit('SAVE_TOKEN', res.data.token)
                        this.$router.push('/home')
                    })
                    .catch(e => console.dir(e))
            },
        },
        mounted () {
            this.$refs.emailInput.focus()
        }
    }
</script>

<style scoped>
    i {color: rgba(0,0,0,.54);}
    a {
        text-decoration: none;
        font-size: small;
    }
    input {outline:none;}
    .input-error {
        border:2px solid red;
    }    
    .footer-register {
        padding-right: .5em;
        justify-content: flex-end;
        display: inline-flex;
        position: relative;
    }
    .credentials {
        display: inline-flex;
        vertical-align: middle;
        align-items: center;
        margin: .3em;
        justify-content: center;
    }
    .title {
        margin: .5em;
        color: #424242;
    }
    .register-form {
        display: flex;
        flex-direction: column;
        width: 30em;
        height: 13.3em;
        background-color: #E3F2FD;
        box-shadow: 0.4em 0.4em 5px rgba(122,122,122,0.5);
        border-radius: .3em;
        font-family: Roboto;
    }
</style>