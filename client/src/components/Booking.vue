<template>
  <div>
      <h3>{{ booking.name }}</h3>
      <p>{{ booking.email }}</p>
      <p v-if="booking.checkin">Checked in: &#9989;</p>
      <p v-if="!booking.checkin">Checked in: &#10060;</p>
      <button v-if="booking.checkin" @click="toggleCheckin">Check Out</button>
      <button v-if="!booking.checkin" @click="toggleCheckin">Check In</button>
      <button @click="deleteBooking">Delete Booking</button>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import BookingsService from '@/services/BookingsService.js'
export default {
    name: 'booking',
    props: ['booking'],
    methods:{
        deleteBooking: function() {
            BookingsService.deleteBooking(this.booking._id)
                .then(() => eventBus.$emit('booking-deleted', this.booking._id))
        },
        toggleCheckin: function() {
            this.booking.checkin = !this.booking.checkin 
            const booking = {
                name:this.booking.name,
                email:this.booking.email,
                checkin: !this.booking.checkin
            }
            // console.log(booking)
            BookingsService.updateBooking(this.booking._id, booking)
            .then(res => eventBus.$emit('booking-updated', res))

        }
    }
}
</script>

<style scoped>
div {
    border: 1px solid rgba(0, 0, 0, 0.199);
    border-radius: 1rem;
    width: 20rem;
    padding: 1rem;
    margin: 1rem auto 1rem auto;
    background-color: rgba(226, 241, 243, 0.514);
    
}

</style>