<template>
  <div id="app">
    <bookings-form></bookings-form>
    <bookings-list :bookings="bookings" />
  </div>
</template>

<script>
import BookingsForm from './components/BookingsForm.vue'
import BookingsList from './components/BookingsList.vue'
import BookingsService from './services/BookingsService.js'
import { eventBus } from '@/main.js'

export default {
  name: 'app',
  components: {
    'bookings-form': BookingsForm,
    'bookings-list': BookingsList
  },
  data() {
    return{
      bookings: []
    }
  },
  mounted(){
    this.fetchBookings();

    eventBus.$on('booking-added', (booking) => {
      this.bookings.push(booking)
    })
    eventBus.$on('booking-deleted', (id) => {
      let index = this.bookings.findIndex((booking) => booking._id === id)
      this.bookings.splice(index, 1)
    })
  },
  methods: {
    fetchBookings() {
      BookingsService.getBookings()
        .then((bookings) => (this.bookings = bookings))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
