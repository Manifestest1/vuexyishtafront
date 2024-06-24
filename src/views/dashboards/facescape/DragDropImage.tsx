'use client'

// ** MUI Imports
import { useCallback,useState,useEffect } from 'react';

import Image from 'next/image';

import { TextField,Grid, Card, CardHeader, CardContent, IconButton, Typography, Box, Button, MenuItem, FormControl, InputLabel, Select,Avatar,LinearProgress } from '@mui/material';

// ** MUI Imports
import { useDropzone } from 'react-dropzone';
import SendIcon from '@mui/icons-material/Send';

// ** Types
import type { ThemeColor } from 'src/@core/layouts/types'

import {getAllFiltersData,fasescapImageUpload} from '../../../context/api/apiService'

interface DataType {
  title: string
  imgSrc: string
  amount: string
  subtitle: string
  progress: number
  color: ThemeColor
  imgHeight: number
}

const data: DataType[] = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Zipcar',
    color: 'primary',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const DragDropImage = () => {
    const image_base_path = 'http://localhost:8000/';
    const [quality, setQuality] = useState('low');
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [batchSize, setBatchSize] = useState(1);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Filter Field Defined

    const [selectedFilterOptions, setFilterOptions] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const handleChange = (event) => {
      setSelectedSubCategories(event.target.value);  // event.target.value will be an array of selected values
    };


    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token)
      {
        getAllFiltersData()
              .then(response => {
                  console.log(response.data.filters,"Get All Filters");
                  setFilterOptions(response.data.filters);

              })
              .catch((error) => {
                  if (error.response.status === 401)
                  {
                    // Handle unauthorized access
                  }
              });
      }

  }, []);

    const onDrop = useCallback((acceptedFiles) => {
      console.log(quality,"Quality Check");

        // Handle the uploaded files here
        console.log(acceptedFiles,"Both type");

        const formData = new FormData();

        acceptedFiles.forEach(file => {
            formData.append('file', file);
          });

          formData.append('quality', quality);
          formData.append('aspectRatio', aspectRatio);
          formData.append('batchSize', batchSize);

          if (acceptedFiles.length > 0)
          {
            setImagePreview(URL.createObjectURL(acceptedFiles[0]));
          }

        // fasescapImageUpload(formData)
        // .then(response => {
        //   console.log(response,"User Image Upload");
        //   setImagePreview(URL.createObjectURL(acceptedFiles[0]));

        // })
        // .catch(error => {
        //   console.error('Error updating user status:', error);
        //   // Handle error state or notify user about the error
        // });

      }, [quality, aspectRatio, batchSize]);

      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });



  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={4}>
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
      </Grid>

      <Grid item xs={12} md={8}>
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
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
        {/* <CardHeader title='Select Item Location'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important', fontSize: '1.125rem !important' } }}
          /> */}

        <CardContent>

        {selectedFilterOptions && selectedFilterOptions.map(selectfilter => (
              <div key={selectfilter.category_id}> {/* Make sure to include a unique key for each mapped item */}
                <Typography variant='body2' sx={{ fontWeight: 600 }}>Select Item <b>{selectfilter.category_name}</b></Typography>
                <FormControl fullWidth>
                <Select
                  label="Status"
                  multiple   // Enable multiple selection
                  value={selectedSubCategories}  // Array of selected values
                  onChange={handleChange}
                  defaultValue="Select Category"
    >
                  <MenuItem disabled value="Select Category">Select Sub Category</MenuItem>
                  {selectfilter.sub_categories.map((subCategory, index) => (
                    <MenuItem key={index} value={subCategory.id}>
                      <img
                        src={image_base_path + subCategory.image}
                        alt="Uploaded Preview"
                        width={20}
                        height={20}
                        style={{ borderRadius: '50%', marginRight: '12px' }}
                      />
                      {subCategory.sub_category}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
            ))}

        </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>


        <Box sx={{ mt: 2, display: 'flex',mb: 120 }}>
          {imagePreview ? (
          <img src={imagePreview} alt="Uploaded Preview"  width={400} height={100}  // Fixed width
          height={Math.floor(500 / parseFloat(aspectRatio.split(':')[0]) * parseFloat(aspectRatio.split(':')[1]))}
          quality={quality === 'high' ? 100 : quality === 'medium' ? 75 : 50} />) : (
          <img src="https://dummyimage.com/400x400/000/fff" alt="Dummy Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          )}
        </Box>


        <Box>
          <TextField fullWidth placeholder='Optional Custom Prompt' />
          <Button variant="contained" component="label"  sx={{ mx: 'auto', width:'160px',position:'absolute',right:'7%',marginTop:'8px' }}>Generate <SendIcon sx={{ ml: 4 }}/></Button>
        </Box>
      </Grid>
    </Grid>

  )
}

export default DragDropImage
