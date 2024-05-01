import { Stack, Typography, Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function UserReview() {
    const methods = useFormContext();
    return (
        <>
            <Stack
                direction="column"
                divider={<Divider flexItem />}
                spacing={2}
                sx={{ my: 2 }}
            >
                <div>
                <Typography fontSize={25} variant="subtitle2" gutterBottom>
                    Shipment details
                </Typography>
                <Typography gutterBottom>{methods.getValues('firstName')} {methods.getValues('lastName')}</Typography>
                <Typography color="text.secondary" gutterBottom>
                    {methods.getValues('address1')}{methods.getValues('address2') !== '' ? ',' : ''} {methods.getValues('address2')}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {methods.getValues('city')} {methods.getValues('state')}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {methods.getValues('zip')} {methods.getValues('country')}
                </Typography>
                </div>
                <div>
                <Typography fontSize={25} variant="subtitle2" gutterBottom>
                    Payment details
                </Typography>
                <Typography gutterBottom>{methods.getValues('cardNumber')} | ccv: {methods.getValues('ccv')}</Typography>
                <Typography gutterBottom>{methods.getValues('nameOnCard')} | exp: {methods.getValues('expirationDate')}</Typography>
                </div>
            </Stack>
        </>
    );
}