<template>
    <div>
        <booking v-for="(booking, index) in bookings" :key="index" :booking="booking" />  
    </div>
</template>

<script>
import Booking from './Booking.vue';

export default {
    name: 'bookings-list',
    props: ['bookings'],
    components: {
        'booking': Booking
    }
}
</script>

<style>

</style>