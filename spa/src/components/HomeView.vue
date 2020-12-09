<template>
    <div>
        <div>
            <div
                class="home-header"
            >
                
                <span class="user-name">{{ userName }}</span>
                <i
                    class="material-icons exit-icon clickable"
                    title="Выход"
                    @click="logOut"
                >
                    exit_to_app
                </i>
            </div>
            <div
                class="work-place"
            >
                <button
                    class="ns-button blue ripple"
                    @click="showDialog"
                >
                    Добавить заметку
                </button>
            </div>
            <modal             
                v-show="dialog"
                @close="hideDialog"
            />
        </div>
    </div>
</template>
<script>
    import Modal from './Modal'
    export default {
        data: () => ({
            data: null,
            dialog: false
        }),
        computed: {
            userName () {
                return this.user && this.user.name || ''
            },
            user () {
                return this.$store.state.authUser || null
            }
        },
        methods: {
            hideDialog () {
                this.dialog = false
            },
            showDialog () {
                this.dialog = true
            },
            getData () {
                this.axios.post('/api/details')
                    .then(res => this.data = res.data.success)
                    .catch(e => console.dir(e))
            },
            logOut () {
                this.$store.dispatch('logOut')
                this.$router.push('/login')
            }
        },
        mounted () {
            this.getData()
        },
        components: {
            Modal
        }
    }
</script>
<style scoped>
  .work-place {
        margin-top: 1em;
    }
    i {color: rgba(0,0,0,.54);}
    a {
        text-decoration: none;
        font-size: small;
    }
    input {outline:none;}
    .exit-icon {
        color: #FF6F00;
    }
    .user-name {
        color: #1565C0;
        font-weight: bold;
    }
    .home-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 1em;
        padding-right: 1em;
        height: 4em;
        background-color: #f5f5f5;
        box-shadow: 0.4em 0.4em 5px rgba(122,122,122,0.5);
        border-radius: .3em;
    }    
</style>