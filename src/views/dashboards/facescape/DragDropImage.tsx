'use client'

import {  Card, CardHeader, CardContent,Typography, Box, Button } from '@mui/material';

const DragDropImage = ({getRootProps,getInputProps,isDragActive,onDrop}) => {

  return (
        <Card>
          <CardHeader
            title='Product Image'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <Typography size='small' aria-label='settings' className='card-more-options' sx={{ color: 'var(--primary-color)' }}>
                Add Media From Url
              </Typography>
            }
          />
          <CardContent sx={{ pt: 2.25 }}>
            <Box {...getRootProps()} sx={{mb: 1.5, display: 'flex',alignItems: 'center',justifyContent: 'center',borderRadius: '4px',padding: '20px',cursor: 'pointer',}}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '1.125rem !important', textAlign: 'center' }}>
                  Drop the image here...
                </Typography>
              ) : (
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '1.125rem !important', textAlign: 'center' }}>
                  Drag and drop your image here.
                </Typography>
              )}
            </Box>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center' }}>
              or
            </Typography>
            <Button variant="contained" component="label"  sx={{ mt: 2, display: 'block', mx: 'auto', width:'160px' }}>Browse Image
              <input type="file" hidden accept="image/*" onChange={(e) => {const files = e.target.files;

                  if (files.length > 0)
                  {
                    onDrop(Array.from(files));
                  }
                }}/>
            </Button>
          </CardContent>
        </Card>

  )
}

export default DragDropImage
