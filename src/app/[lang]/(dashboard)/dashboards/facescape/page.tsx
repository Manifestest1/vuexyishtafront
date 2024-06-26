 // MUI Imports
import Grid from '@mui/material/Grid'

import ProtectedRoute from '@/context/ProtectedRoute'

// Components Imports
import FaceScapeBasicComponent from '@/views/dashboards/facescape'

const FaceScape = async () => {

  return (
    <ProtectedRoute>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <FaceScapeBasicComponent />
        </Grid>
      </Grid>
    </ProtectedRoute>
  )
}

export default FaceScape
