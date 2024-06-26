'use client'

import { Card, CardContent, InputLabel,Box,CardHeader, MenuItem, FormControl,  Select } from '@mui/material';

type Props = {
  quality: string
  setQuality: string
  aspectRatio: string
  setAspectRatio: string
  batchSize: string
  setBatchSize: string
}

const ImageFilterComponent = ({quality,setQuality,aspectRatio,setAspectRatio,batchSize,setBatchSize}: Props) => {

  return(
    <Card>
    <CardHeader></CardHeader>

    <CardContent>

      <Box sx={{ display: 'flex', gap: 2}}>
      <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="quality-label">Quality</InputLabel>
          <Select
            labelId="quality-label"
            id="quality"
            value={quality}
            label="Quality"
            onChange={(e) => setQuality(e.target.value)}
          >
            <MenuItem value={'low'}>Low</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'high'}>High</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="aspect-ratio-label">Aspect Ratio</InputLabel>
          <Select
            labelId="aspect-ratio-label"
            id="aspect-ratio"
            value={aspectRatio}
            label="Aspect Ratio"
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <MenuItem value={'16:9'}>16:9</MenuItem>
            <MenuItem value={'4:3'}>4:3</MenuItem>
            <MenuItem value={'1:1'}>1:1</MenuItem>
            <MenuItem value={'2:3'}>2:3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="batch-size-label">Batch Size</InputLabel>
          <Select
            labelId="batch-size-label"
            id="batch-size"
            value={batchSize}
            label="Batch Size"
            onChange={(e) => setBatchSize(e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>


    </CardContent>
  </Card>
  )
}

export default ImageFilterComponent
