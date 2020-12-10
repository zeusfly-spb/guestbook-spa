<template>
 <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
        >
            Новая заметка
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
        <textarea cols="50" rows="5"
          v-model="text"
          ref='textarea'
          @keyup.esc="close"
        />
        <div
        class="blue-text clickable"
          @click="$refs.fileInput.click()"
        >
          Добавить файл
        </div>
        <input type="file"
            name="file_name"
            ref="fileInput"
            accept="*/*"
            @change="loadFile"
            style="display: none"
        >
        </section>
        <footer class="modal-footer">
            <div>
                <button
                    type="button"
                    class="ns-button mr-1"
                    @click="close"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    class="ns-button bg-green"
                    :disabled="!valid"
                    @click="createPost"
                >
                    Добавить
                </button>
            </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
    export default {
        name: 'Modal',
        props: {
          note: Object
        },
        data: () => ({
          fileReader: null,
          file: null,
          text: ''            
        }),
        computed: {
          authUser () {
            return this.$store.state.authUser
          },
          valid () {
            return this.text.length > 0
          },
          dialog () {
            return this.$store.state.dialog
          }
        },
        created () {
          this.fileReader = new FileReader()
          this.fileReader.onload = (e)=> {
              this.$refs.fileInput = e.target.result
          }
        },
        methods: {
            loadFile () {
              this.fileReader.readAsDataURL(this.$refs.fileInput.files[0])              
              this.file = this.$refs.fileInput.files[0]
            },
            createPost () {
                let data = new FormData
                data.append('text', this.tex)
                data.append('user_id',this.authUser.id)
                if (this.file) {
                  data.append('file', this.file)
                }
                this.axios.post('/api/create_post', data)
                  .then((res) => {
                    this.$emit('addPost', res.data)
                    this.close()
                  })
                  .catch(e => console.error(e))
            },
            resetInputs () {
              this.text = ''
            },
            close () {
                this.text = ''
                this.$emit('close')
            },
            addNote () {
              if (!this.authUser) {return}
                this.$store.dispatch('addNote', {
                  text: this.text, 
                  user_id: this.authUser.id
                }).then(this.close())
            }
        }
    }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    border-radius: .5em;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .update-header {
      padding: .7em;
      background-color:   #47a7f5;
      border-bottom: 1px solid #eeeeee;
      color: white;
      justify-content: space-between;
  }

  .modal-header {
    background-color:  #4AAE9B;
    border-bottom: 1px solid #eeeeee;
    color: white;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .btn-blue {
      color: white;
      background: #47a7f5;
      border: 1px solid #47a7f5;
      border-radius: 2px;
   }

  .btn-white {
    color: black;
    background: white;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>