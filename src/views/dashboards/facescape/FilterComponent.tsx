'use client'

import { Card, CardContent, Typography, MenuItem, FormControl,  Select } from '@mui/material';

type Props = {
  selectedFilterOptions: string
  selectedSubCategories: string

  handleChange: () => void
}


const FilterComponent = ({selectedFilterOptions,selectedSubCategories,handleChange}: Props) => {
  const image_base_path = 'http://localhost:8000/';

  return(
    <Card>

        <CardContent>

        {selectedFilterOptions && selectedFilterOptions.map(selectfilter => (
              <div key={selectfilter.id}> {/* Make sure to include a unique key for each mapped item */}
                <Typography variant='body2' sx={{ fontWeight: 600 }}>Select Item <b>{selectfilter.name}</b></Typography>
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
                      <span style={{ alignItems: 'center' }}>
                        <img
                          src={image_base_path + subCategory.image}
                          alt="Uploaded Preview"
                          width={20}
                          height={20}
                          style={{ borderRadius: '50%', marginRight: '12px' }}
                        />
                        {subCategory.sub_category}
                      </span>
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
            ))}

        </CardContent>
        </Card>

  )

}

export default FilterComponent
