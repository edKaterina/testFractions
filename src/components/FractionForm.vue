<template>
  <v-container class="d-flex align-center justify-left flex-wrap">
    <v-row class="col-12">
      <v-row
        v-for="(fraction, i) in fractions"
        :key="i"
        class="col-2 align-center mt-0"
      >
        <v-col class="col-8 input-block px-0">
          <v-icon
            v-if="i >= startCount"
            color="red"
            medium
            class="rounded-circle"
            @click="delFraction(i)"
          >
            fas fa-backspace
          </v-icon>
          <input
            v-model="fraction.numerator"
            outlined
            hide-details
            class="rounded-lg pa-2"
            @input="validate"
            @paste="validate"
          />
          <hr class="my-2" />
          <input
            v-model="fraction.denominator"
            outlined
            hide-details
            class="rounded-lg pa-2"
            @input="validate"
            @paste="validate"
          />
        </v-col>
        <div v-if="i < fractions.length - 1" class="ma-auto">
          <v-icon medium> fas fa-plus </v-icon>
        </div>
      </v-row>
      <v-row class="col-2 align-center mt-0">
        <v-icon medium class="my-auto"> fas fa-equals </v-icon>

        <h1 class="col-2 align-center pa-10 d-flex">
          {{ result }}
        </h1>
      </v-row>
    </v-row>
    <v-row class="col-12">
      <v-btn color="primary" elevation="3" x-large @click="addFraction">
        Добавить дробь
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      startCount: 2,
      maxCount: 5,
      defaultFraction: {
        numerator: 1,
        denominator: 1
      },
      fractions: []
    }
  },
  computed: {
    result() {
      return (
        this.fractions.reduce((result, fraction) => {
          return result + fraction.numerator / fraction.denominator
        }, 0) || ''
      )
    }
  },
  mounted() {
    Array(this.startCount)
      .fill(null)
      .forEach(() => this.addFraction())
  },
  methods: {
    addFraction() {
      if (this.maxCount > this.fractions.length) {
        Vue.set(
          this.fractions,
          this.fractions.length,
          Object.assign({}, this.defaultFraction)
        )
      }
    },
    delFraction(index) {
      this.fractions.splice(index, 1)
    },
    validate() {
      const currentInput = event.target._value
      const validationIsFailed = (value) =>
        RegExp('^[1-9]?[0-9]?$').exec(value) === null

      return this.fractions.map((fraction) => {
        if (validationIsFailed(fraction.numerator)) {
          fraction.numerator = validationIsFailed(currentInput)
            ? 1
            : currentInput
        }
        if (validationIsFailed(fraction.denominator)) {
          fraction.denominator = validationIsFailed(currentInput)
            ? 1
            : currentInput
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.input-block {
  position: relative;
  .v-icon.fa-backspace {
    position: absolute;
    right: 0;
    z-index: 10;
    &::before {
      background: white;
    }
  }
  input {
    outline: none;
    border: 1px solid gray;
    width: 100%;
  }
}
</style>
