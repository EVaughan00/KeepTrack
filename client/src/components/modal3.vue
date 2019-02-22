<script>
export default {
  name: 'modal3',
  data () {
    return {
      visa: 0,
      mc: 0,
      AmX: 0,
      discover: 0,
      totals: 0
    }
  },
  props: {
  },
  methods: {
    close () {
      this.totals = (parseFloat(this.visa) + parseFloat(this.mc) + parseFloat(this.AmX) + parseFloat(this.discover)).toFixed(2)
      this.$emit('CCTotals', this.visa, this.mc, this.AmX, this.discover, this.totals)
      this.visa = 0
      this.mc = 0
      this.AmX = 0
      this.discover = 0
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
            Credit Cards
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
          <v-text-field
          label="Visa*"
          box
          v-model="visa"
          ></v-text-field>
        </slot>
        <slot>
          <v-text-field
          label="Master Card*"
          box
          v-model="mc"
          ></v-text-field>
        </slot>
        <slot>
          <v-text-field
          label="AmX*"
          box
          v-model="AmX"
          ></v-text-field>
        </slot>
        <slot>
          <v-text-field
          label="Discover*"
          box
          v-model="discover"
          ></v-text-field>
        </slot>
       </section>
       <label class="label1">Credit Card Totals: {{(parseFloat(this.visa) + parseFloat(this.mc) + parseFloat(this.AmX) + parseFloat(this.discover)).toFixed(2)}}</label>
       <footer class="modal-footer">
        <slot name="footer">
          <button
            type="button"
            style="max-height: 57px; width: 100px"
            class="btn-cyan"
            @click="close"
          > Close
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
    width: 30%;
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
  .label1 {
    font-size: 20px;
  }
</style>
