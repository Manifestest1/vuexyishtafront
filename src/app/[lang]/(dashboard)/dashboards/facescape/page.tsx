 // MUI Imports
import Grid from '@mui/material/Grid'

import ProtectedRoute from '@/context/ProtectedRoute'

// Components Imports
import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'
import DragDropImage from '@/views/dashboards/facescape/DragDropImage'


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

const FaceScape = async () => {
  // Vars
  const data = await getData()
  const serverMode = getServerMode()

  return (
    <ProtectedRoute>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <DragDropImage />
        </Grid>
      </Grid>
    </ProtectedRoute>
  )
}

export default FaceScape
