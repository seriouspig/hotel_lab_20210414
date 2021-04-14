<template>
  <div id="app">
    <h1>Hotel Bookings</h1>
    <bookings-form></bookings-form>
    <bookings-list class="booking-list" :bookings="bookings" />
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
    eventBus.$on('booking-updated', (booking) => {
      console.log(booking)
      let index = this.bookings.findIndex((bookingN) => bookingN._id === booking._id)
      this.bookings[index] = booking
      console.log(this.bookings[index])
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
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  /* margin-top: 60px; */
  background-image: url(https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png);
}
.booking-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
