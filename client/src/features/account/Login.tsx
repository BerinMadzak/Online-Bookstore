import agent from "../../app/agent";
import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

export default function Login() {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({ mode: 'onTouched' }); 

    async function submitForm(data: FieldValues){
        try{
            await agent.Account.login(data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1}} >
                <TextField margin="normal" fullWidth label="Username" autoFocus 
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username} helperText={errors?.username?.message as string} 
                />
                <TextField margin="normal" fullWidth label="Password" type="password" 
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password} helperText={errors.password?.message as string} 
                />
                <Button disabled={!isValid} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2}}>Sign In</Button>
                <Grid container>
                    <Grid item>
                        <Link to='/register'>
                            <Typography variant="h6" color="secondary" fontSize="1em">Don't have an account? Sign up</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}