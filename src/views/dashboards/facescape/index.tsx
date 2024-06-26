'use client'

// ** MUI Imports
import { useCallback,useState,useEffect } from 'react';

import { Grid} from '@mui/material';

// ** MUI Imports
import { useDropzone } from 'react-dropzone';

import FilterComponent from './FilterComponent';
import ImageShowComponent from './ImageShowComponent';
import ImageFilterComponent from './ImageFilterComponent';
import DragDropImage from './DragDropImage';
import MediaCard from './MediaCard';

import {getAllFiltersData,fasescapImageUpload} from '../../../context/api/apiService'

const FaceScapeBasicComponent = () => {

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
        {/* <DragDropImage getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} onDrop={onDrop}/> */}
        <MediaCard></MediaCard>
      </Grid>

      <Grid item xs={12} md={8}>
        <ImageFilterComponent quality={quality} setQuality={setQuality} aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} batchSize={batchSize} setBatchSize={setBatchSize}></ImageFilterComponent>
      </Grid>

      <Grid item xs={12} md={4}>
        <FilterComponent selectedFilterOptions={selectedFilterOptions} selectedSubCategories={selectedSubCategories} handleChange={handleChange}/>
      </Grid>

      <Grid item xs={12} md={8}>
        <ImageShowComponent imagePreview={imagePreview} quality={quality} aspectRatio={aspectRatio}></ImageShowComponent>
      </Grid>
    </Grid>

  )
}

export default FaceScapeBasicComponent
