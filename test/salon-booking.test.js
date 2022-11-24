import assert from 'assert';
import SalonBooking from '../salon-booking.js';
import pgPromise from 'pg-promise';

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:Jnisto9801@localhost:5432/salon_test";

const config = { 
	connectionString : DATABASE_URL
}

const pgp = pgPromise();
const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`truncate table booking restart identity`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();
        assert.deepEqual([{code: 'ped',id: 1,price: 'R175',type: 'Pedicure'},{code: 'man',id: 2,price: 'R215',type: 'Manicure'},{code: 'mak',id: 3,price: 'R185',type: 'MakeUp'},{code: 'B&L',id: 4,price: 'R240',type: 'Brows&Lashes'}], treatments);
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist("0836547953");
        assert.deepEqual({commission_percentage: 0.13,first_name: 'Zeenat',id: 1,last_name: 'Vontour',phone_number: '0836547953'}, stylist);
    });

    it("should be able to allow a client to make a booking", async function () {
        const client = await booking.findClient("0856457562");
        const stylist = await booking.findStylist("0836547953");
        const treatment = await booking.findTreatment("ped")
        let clientId = client.id
        let stylistId = stylist.id
        let treatmentId = treatment.id

        const booking1 = await booking.makeBooking('2022-03-21','08:17',clientId, treatmentId, stylistId);

        const bookings = await booking.findClientBookings(clientId);
        
        assert.deepEqual([{
            booking_date: new Date('2022-03-20T22:00:00.000Z'),
            booking_time: "08:17:00",
            client_id: 2,
            id: 1,
            stylist_id: 1,
            treatment_id: 1
          }], bookings);
    });

    it("should be able to get client booking(s)", async function () {

        const client1 = await booking.findClient("0856457562");
        // const client2 = await booking.findClient("0832456897");
        
        const treatment1 = await booking.findTreatment("ped");
        // const treatment2 = await booking.findTreatment("man");
        // const date1 = new Date('2022-03-21T22:00:00.000Z');
        const stylist1 = await booking.findStylist("0836547953");

        await booking.makeBooking('2022-03-21','07:17', client1.id,treatment1.id,stylist1.id);
        // await booking.makeBooking(treatment2.id, client2.id, '2022-03-21','06:07');


        const clientBooking = await booking.findClientBookings(client1.id);

        assert.deepEqual([
              {
                booking_date: new Date ('2022-03-20T22:00:00.000Z'),
                booking_time: "07:17:00",
                client_id: 2,
                id: 1,
                stylist_id: 1,
                treatment_id: 1
              }
            ]
      , clientBooking)
    })

    it("should be able to get bookings for a date", async function () {
        const client1 = await booking.findClient("0856457562");

        const treatment1 = await booking.findTreatment("ped");

        const stylist1 = await booking.findStylist("0836547953");

        await booking.makeBooking('2022-03-21','07:17', client1.id,treatment1.id,stylist1.id);
        
        const bookings = await booking.findAllBookings('2022-03-21');

        assert.deepEqual([
              {
                booking_date: new Date('2022-03-20T22:00:00.000Z'),
                booking_time: "07:17:00",
                client_id: 2,
                id: 1,
                stylist_id: 1,
                treatment_id: 1
              }], bookings);

    });

    it("should be able to find the total income for a day", function() {

        assert.equal([], bookings);
    })

    it("should be able to find the most valuable client", function() {
        assert.equal(1, 2);
    })
    it("should be able to find the total commission for a given stylist", function() {
        assert.equal(1, 2);
    })

    after(function () {
        db.$pool.end()
    });

});