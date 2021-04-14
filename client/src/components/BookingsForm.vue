<template>
    <form v-on:submit="addBooking" method="post" >
        <h2>Add a booking</h2>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required/>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required/>
        </div>
        <div>
            <input type="checkbox" id="checkin" v-model="checkin" value="true">
            <label for="checkin">Checked in</label>
        </div>
        <input type="submit" value="Submit">
    </form>
  
</template>

<script>
import {eventBus} from '@/main.js'
import BookingsService from '@/services/BookingsService.js'
export default {
    name: 'booking-form',
    data() {
        return {
            name: '',
            email: '',
            checkin: false
        }
    },
    methods: {
        addBooking(event) {
            event.preventDefault()
            const booking = {
                name: this.name,
                email: this.email,
                checkin: this.checkin
            }
            BookingsService.postBooking(booking)
            .then(res => eventBus.$emit('booking-added', res))
        }
    }

}
</script>

<style>

</style>