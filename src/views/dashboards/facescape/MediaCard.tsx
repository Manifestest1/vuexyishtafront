import React from 'react';

import { Box, Card, CardHeader, CardContent, Typography, Button, styled } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DropzoneWrapper = styled('div')({
  border: '2px dashed #ddd',
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  cursor: 'pointer',
  '& .note': {
    fontSize: '1.25rem',
    paddingTop: '12px',
    marginBottom: '4px',
  },
  '& .btn': {
    backgroundColor: '#765feb14',
    color: 'var(--primary-color)',
    padding: '4px 9px',
    borderRadius: '4px',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight:100
  },
  '& .fallback': {
    display: 'none',
  },
});

const MediaCard = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  return (
    <Card>
      <CardHeader
        title="Product Image"
        action={
          <Button variant="text" className="fw-medium">
            Add media from URL
          </Button>
        }
      />
      <CardContent>
        <form action="/upload" className="dropzone needsclick" id="dropzone-basic">
          <DropzoneWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            <CloudUploadIcon fontSize="large" color="action" />
            <Typography className="note needsclick">Drag and drop your image here</Typography>
            <Typography variant="body2" color="textSecondary" className="d-block fw-normal mb-2">
              or
            </Typography>
            <Button variant="contained" className="note needsclick btn" id="btnBrowse">
              Browse image
            </Button>
          </DropzoneWrapper>
          {/* <div className="fallback">
            <input name="file" type="file" />
          </div> */}
        </form>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
