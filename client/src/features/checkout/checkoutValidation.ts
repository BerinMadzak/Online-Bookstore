import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        address1: yup.string().required('Address line 1 is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zip: yup.string().required('Zip is required'),
        country: yup.string().required('Country is required')
    }),
    yup.object({
        cardNumber: yup.string().required('Card number is required'),
        ccv: yup.string().required('CCV is required'),
        nameOnCard: yup.string().required('Name on card is required'),
        expirationDate: yup.string().required('Expiration date is required')
    }),
    yup.object()
]