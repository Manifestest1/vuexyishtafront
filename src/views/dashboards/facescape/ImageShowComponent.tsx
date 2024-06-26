import { TextField,Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  quality: string
  aspectRatio: string
  imagePreview: string
}


const ImageShowComponent = ({imagePreview,quality,aspectRatio}: Props) => {

  return(
    <div>

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

    </div>

  )

}

export default ImageShowComponent
