 // MUI Imports
 import Grid from '@mui/material/Grid'

 // Components Imports
 import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'


 // Server Action Imports
 import { getServerMode } from '@core/utils/serverHelpers'

 const getData = async () => {
   // Vars
   const res = await fetch(`${process.env.API_URL}/pages/profile`)

   if (!res.ok) {
     throw new Error('Failed to fetch profileData')
   }

   return res.json()
 }

 const Narratone = async () => {
   // Vars
   const data = await getData()
   const serverMode = getServerMode()

   return (
     <Grid container spacing={6}>
       <Grid item xs={12} lg={6}>
         <WebsiteAnalyticsSlider />
       </Grid>
     </Grid>
   )
 }

 export default Narratone
