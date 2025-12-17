import cron from "cron"
import https from "https"

const job = new cron.CronJob("*/14 * * * *",function(){
    https.get(process.env.API_URI, (res)=>{
        if(res.statusCode === 200){
            console.log("Cron job executed successfully")
        }else{
            console.log("Cron job failed with status code: ", res.statusCode)
        }
    })
})

export default job