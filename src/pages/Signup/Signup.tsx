import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signupService } from '../../services/users';
import { useAppDispatch } from '../../hooks';
import { Link as RouterLink } from 'react-router-dom';
import { setCredentials } from '../../store/slices/authSlice';
import { Alert } from '@mui/material';
import axios from 'axios';

const signupValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('userName is required!')
    .min(2, 'userName is too short - should be 6 chars minimum!')
    .max(50, 'userName is too long - should be 50 chars maximum!!')
    .required('userName is required!'),
  email: yup
    .string()
    .required('email is required')
    .email('Should be valide email address!'),
  password: yup
    .string()
    .required('password is required!')
    .min(6, 'password is too short - should be 6 chars minimum!')
    .max(40, 'password is too long - should be 40 chars maximum!'),
  invitationCode: yup.string().required('invitation code is required!'),
});

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState('');
  const [failMsg, setFailMsg] = useState('');
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      invitationCode: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await signupService(values);
        const { token, userName, email } = data;
        dispatch(setCredentials({ token, userName, email }));
        setFailMsg('');
        setSuccessMsg('Sign up success!');
        // navigate('/', { replace: true });
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setSuccessMsg('');
          setFailMsg(error.response?.data.error);
        }
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userName"
                label="Name"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="invitationCode"
                label="Invitation Code"
                type="text"
                id="invitationCode"
                value={formik.values.invitationCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.invitationCode &&
                  Boolean(formik.errors.invitationCode)
                }
                helperText={
                  formik.touched.invitationCode && formik.errors.invitationCode
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {successMsg && <Alert severity="success">{successMsg}</Alert>}
      {failMsg && <Alert severity="error">{failMsg}</Alert>}
    </Container>
  );
}
