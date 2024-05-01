import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { useFormContext } from 'react-hook-form';
import CustomInput from './CustomInput';
import { Checkbox, FormControlLabel } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const {control} = useFormContext();
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <CustomInput
          control={control}
          name='firstName'
          label='First Name*'
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <CustomInput
          control={control}
          name='lastName'
          label='Last Name*'
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <CustomInput
          control={control}
          name='address1'
          label='Address Line 1*'
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <CustomInput
          control={control}
          name='address2'
          label='Address Line 2'
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <CustomInput
          control={control}
          name='city'
          label='City*'
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <CustomInput
          control={control}
          name='state'
          label='State*'
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <CustomInput
          control={control}
          name='zip'
          label='Zip*'
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <CustomInput
          control={control}
          name='country'
          label='Country*'
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}