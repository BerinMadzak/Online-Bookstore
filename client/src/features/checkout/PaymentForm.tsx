import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';

import { styled } from '@mui/system';
import CustomInput from './CustomInput';
import { useFormContext } from 'react-hook-form';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const {control} = useFormContext();

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            height: { xs: 300, sm: 350, md: 375 },
            width: '100%',
            borderRadius: '20px',
            border: '1px solid ',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Credit card</Typography>
            <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
          </Box>
          <SimCardRoundedIcon
            sx={{
              fontSize: { xs: 48, sm: 56 },
              transform: 'rotate(90deg)',
              color: 'text.secondary',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <CustomInput name="cardNumber" label="Card Number*" control={control}/>
            </FormGrid>
            <FormGrid sx={{ maxWidth: '20%' }}>
              <CustomInput name="ccv" label="CCV*" control={control}/>
            </FormGrid>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <CustomInput name="nameOnCard" label="Name On Card*" control={control}/>
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <CustomInput name="expirationDate" label="Expiration Date*" control={control}/>
            </FormGrid>
          </Box>
        </Box>
          <FormControlLabel control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
        label="Remember credit card details for next time"
      />
      </Box>
    </Stack>
  );
}
