<script>
export default {
  name: 'modal1',
  data () {
    return {
      initial: '',
      tasked: null
    }
  },
  props: {
    task: String
  },
  methods: {
    close () {
      this.tasked = this.task
      this.$emit('initial', this.initial, this.tasked)
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Completing task: {{this.task}}

          <button
            type="button"
            class="btn-close"
            @click="close"
          >
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
          Please Initial
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <v-text-field
            label="initial (ex: EV)"
            box
            v-model="initial"
            ></v-text-field>
            <button
              type="button"
              style="max-height: 57px; width: 100px"
              class="btn-cyan"
              @click="close"
            > Complete
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
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
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #0000FF;
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
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  .btn-cyan {
    color: white;
    background: #0000FF;
    border: 1px solid #0000FF;
    border-radius: 2px;
  }
</style>
