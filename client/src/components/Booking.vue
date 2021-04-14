<template>
  <div>
      <h3>{{ booking.name }}</h3>
      <p>{{ booking.email }}</p>
      <p>{{ booking.checkin }}</p>
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
        }
    }
}
</script>

<style scoped>
div {
    border: 1px solid black;
}
</style>