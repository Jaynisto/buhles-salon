
export default function salonBooking(db){



    async function findAllTreatments(){
        const avalableTreatments = await db.manyOrNone(`select * from treatment;`)
        return avalableTreatments;

    }
    async function findStylist(phoneNumber){
        const userData = await db.oneOrNone(`select * from stylist where phone_number = $1;`, [phoneNumber])
        return userData;
    }

    async function findClient(phoneNumber){
        const userData = await db.oneOrNone(`select * from client where phone_number = $1;`, [phoneNumber])
        return userData;
    }

    async function findTreatment(code){
        const userData = await db.oneOrNone(`select * from treatment where code = $1;`, [code])
        return userData;

    }                    
    
    async function makeBooking(date, time, clientId, treatmentId, stylistId){
        await db.none(`insert into booking (booking_date, booking_time, client_id, treatment_id, stylist_id ) 
            values ($1, $2 ,$3, $4, $5);`, 
            [date, time, clientId, treatmentId, stylistId])
    }

    async function findClientBookings(clientId){
        const userData = await db.manyOrNone(`select * from booking where client_id = $1;`, [clientId])
        return userData;

    }

    async function findAllBookings(date){
        const userData = await db.manyOrNone(`select * from booking where booking_date = $1;`, [date])
        return userData;
    }

    async function totalIncomeForDay(date){
        const userData = await db.manyOrNone(`select count(*) from booking;`, [date])
        return userData;
    }
    


    return {
        findAllTreatments,
        findStylist,
        makeBooking,
        findClient,
        findClientBookings,
        findTreatment,
        findAllBookings,
        totalIncomeForDay


    }
}  