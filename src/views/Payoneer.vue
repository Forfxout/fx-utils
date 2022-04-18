<template>
  <div class="flex justify-center h-screen flex-col w-full pt-6 pb-6">

    <section class="title flex-grow-0">
      <div class="flex flex-col text-center">
        <span class="text-3xl font-semibold">Payoneer Calculator</span>
      </div>
    </section>

    <section class="flex-grow bg-base-200 rounded-lg px-5 py-4 m-4 mt-8 flex flex-col">
      <!-- User Input -->
      <div class="flex-grow-0">
        <!-- Account Balance Input -->
        <div class="form-control">
          <label class="label pt-0">
            <span class="label-text text-lg">Account Balance</span>
          </label> 
          <div class="relative">
            <input v-model="calculator.balance" @focus="clear('balance')" type="text" placeholder="469" class="w-full input text-2xl input-primary input-bordered"> 
            <button class="absolute top-0 right-0 rounded-l-none btn btn-primary text-xl">USD</button>
          </div>
        </div>

        <!-- Account Balance Input -->
        <div class="form-control mt-4">
          <label class="label pt-0">
            <span class="label-text text-lg">Withdrawal Amount</span>
          </label> 
          <div class="relative">
            <input v-model="calculator.withdrawalAmount" @focus="clear('withdrawalAmount')" type="text" placeholder="300" class="w-full input text-2xl input-primary input-bordered"> 
            <button @click="toggleCurrency" class="absolute top-0 right-0 rounded-l-none btn btn-primary text-xl">{{ calculator.currency }}</button>
          </div>
        </div>
      </div>

      <div class="flex-grow"></div>

      <!-- Results -->
      <div class="flex-grow-0 flex flex-col">
        <transition name="fade">
        <div v-if="withdrawalAmount" class="flex justify-between w-full text-2xl bg-base-300 px-4 py-2 rounded-lg">
          <span>Withdraw:</span>
          <span class="text-error">{{ toWithdraw }}$</span>
        </div>
        </transition>
        
        <transition name="fade">
          <div v-if="balance" class="flex justify-between w-full text-2xl bg-base-300 px-4 py-2 rounded-lg mt-2">
            <span>Available:</span>
            <transition name="fade" mode="out-in">
              <span v-if="available > 0" class="text-success">{{ available }}$</span>
              <span v-else class="text-warning">{{ available }}</span>
            </transition>
          </div>
        </transition>

        <!-- Controls -->
        <transition name="fade">
          <div v-if="balance">
            <button
              class="btn bg-base-100 w-full mt-2 text-lg" 
              @click="findMaximumWithdrawalAmount"
            >
              Withdraw All
            </button>
          </div>
        </transition>
      </div>
    </section>

    <section class="app-selector flex-grow-0 px-4">
      <div class="text-center">
        <a href="#welcome" class="btn btn-neutral w-full">Back</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      calculator: {
        balance: 469,
        withdrawalAmount: 300,
        currency: 'USD'
      },
      payoneer: {
        fees: {
          percentage: 0.017,
          fixed: 3.15,
          local: 0.01
        }
      }
    }
  },
  methods: {
    findMaximumWithdrawalAmount () {
      let payoneerFees = this.balance * this.payoneer.fees.percentage + this.payoneer.fees.fixed
      let bankFees = (this.balance - payoneerFees) * this.payoneer.fees.local
      this.calculator.withdrawalAmount = Math.floor(this.balance - payoneerFees - bankFees)
    },
    toggleCurrency () {
      this.calculator.currency = this.calculator.currency == 'BYN' ? 'USD' : 'BYN'
    },
    clear (field) {
      this.calculator[field] = null
    }
  },
  computed: {
    balance () {
      return Number(this.calculator.balance)
    },
    withdrawalAmount () {
      return Number(this.calculator.withdrawalAmount)
    },
    fees () {
      return Number(((this.withdrawalAmount + this.payoneer.fees.local * this.withdrawalAmount) * this.payoneer.fees.percentage + this.payoneer.fees.fixed + this.withdrawalAmount * this.payoneer.fees.local).toFixed(2))
    },
    toWithdraw () {
      return this.withdrawalAmount ? (this.fees + this.withdrawalAmount).toFixed(2) : 0
    },
    available () {
      return (Number(this.balance) - this.toWithdraw).toFixed(2) 
    }
  }
}
</script>