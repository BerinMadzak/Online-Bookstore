import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import agent from "../../app/agent";

export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({ mode: 'onTouched' }); 

    function handleErrors(errors: any) {
        if(errors) {
            errors.forEach((error: string) => {
                if(error.includes("Password")) { setError('password', {message: error})}
                else if (error.includes("Email")) { setError('email', {message: error})}
                else if(error.includes("Username")) { setError('username', {message: error})}
            });
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">Register</Typography>
            <Box component="form" 
                onSubmit={handleSubmit(data => agent.Account.register(data).then(() => {
                    navigate('/login');
                }).catch(error => handleErrors(error)))} 
                noValidate sx={{ mt: 1}} 
            >
                <TextField margin="normal" fullWidth label="Username" autoFocus 
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username} helperText={errors?.username?.message as string} 
                />
                <TextField margin="normal" fullWidth label="Email" autoFocus 
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email} helperText={errors?.email?.message as string} 
                />
                <TextField margin="normal" fullWidth label="Password" type="password" 
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'Password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password} helperText={errors.password?.message as string} 
                />
                <Button disabled={!isValid} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2}}>Register</Button>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            <Typography variant="h6" color="secondary" fontSize="1em">Already have an account? Sign in</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}