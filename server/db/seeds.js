use hotel;
db.dropDatabase();

db.bookings.insertMany([
    {
        name: "Malcolm Macdowell",
        email: "malcolm@email.com",
        checkin: true
    },
    {
        name: "Zsolt Bolt",
        email: "zsolt@email.com",
        checkin: false
    },

]);