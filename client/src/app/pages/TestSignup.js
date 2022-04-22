import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import SignupBanner from '../assets/SignupBanner.png';
import '../stylesheets/TestSignup.css';

/**
 * Creates signup page
 * @return {HTML} signup page
 */
export default function TestSignup() {
  const [stepNumber, setStepNumber] = useState(0);
  // const [completed, setCompleted] = useState({});

  const steps = ['Name', 'School', 'Email', 'Verification', 'Done'];

  const handleNextStep = (step) => {
    setStepNumber(step);
  };

  return (
    <div className='signup-page-container'>
      <Paper
        className='signup-box-container'
        elevation={0}
        sx={{
          display: 'flex',
          width: '1000px',
          height: '600px',
          borderRadius: '10px 0 0 10px',
          filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
          color: '#8B95A5',
        }}
      >
        <div className='signup-box-left'>
          <div className='signup-box-left-content'>
            <div className='signup-box-left-logo'>
              Logo.
            </div>
            <div className='signup-box-left-headline'>
              Grow your connection with the UCSC community!
            </div>
            <img src={SignupBanner} />
          </div>
        </div>
        <div className='signup-box-right'>
          <SignupStepOne
            active={stepNumber === 0}
            step={0}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepTwo
            active={stepNumber === 1}
            step={1}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepThree
            active={stepNumber === 2}
            step={2}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepFour
            active={stepNumber === 3}
            step={3}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepFive active={stepNumber === 4} />
        </div>
      </Paper>
      <Paper
        className='stepper-box-container'
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingInline: '30px',
          width: '40em',
          height: '4em',
          borderRadius: '10px',
          filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
          color: '#8B95A5',
        }}
      >
        <Box
          sx={{
            'width': '100%',
            '.MuiStepLabel-labelContainer span': {
              fontFamily: 'Montserrat',
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#3C4047',
            },
            '.MuiStepIcon-text': {
              fontFamily: 'Montserrat',
              fontWeight: '700',
              fill: 'white',
            },
            '.MuiStepIcon-root.Mui-active': {
              color: '#FBC02D',
            },
          }}
        >
          <Stepper nonLinear activeStep={stepNumber}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  color='inherit'
                  onClick={() => handleNextStep(index)}
                  disableRipple
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Paper>
    </div>
  );
}

/**
 * Step one of signup
 * @return {JSX}
 */
function SignupStepOne({active, step, handleNextStep}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/testlogin');
  };

  return (
    <div
      className='signup-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div>
        <div className='text-title text-dark'>
          Sign Up
        </div>
        <div className='text-small text-warning gap-hori-small'>
          <div className='text-light'>
            Required
          </div>
          <div className='text-bold'>
            *
          </div>
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              First Name
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput placeholder={'Bob'} type={'text'} />
        </div>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Last Name
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput placeholder={'Smith'} type={'text'} />
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large'>
          <div>
            <ThemedButton
              color={'yellow'}
              variant={'themed'}
              value={step}
              onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
            >
              Next Step
            </ThemedButton>
          </div>
        </div>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Already have an account?
          </div>
          <div
            className='text-bold text-blue'
            onClick={handleNavigate}
            style={{cursor: 'pointer'}}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step two of signup
 * @return {JSX}
 */
function SignupStepTwo({active, step, handleNextStep}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/testlogin');
  };

  return (
    <div
      className='signup-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div>
        <div className='text-title text-dark'>
          Sign Up
        </div>
        <div className='text-small text-warning gap-hori-small'>
          <div className='text-light'>
            Required
          </div>
          <div className='text-bold'>
            *
          </div>
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-vert-small'>
          <div className='text-small text-bold text-dark gap-hori-small'>
            School Email
          </div>
          <ThemedInput placeholder={'bobsmith@ucsc.edu'} type={'text'} />
        </div>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Year of Graduation
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput placeholder={'1997'} type={'text'} />
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Next Step
          </ThemedButton>
        </div>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Already have an account?
          </div>
          <div
            className='text-bold text-blue'
            onClick={handleNavigate}
            style={{cursor: 'pointer'}}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step three of signup
 * @return {JSX}
 */
function SignupStepThree({active, step, handleNextStep}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/testlogin');
  };

  return (
    <div
      className='signup-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div>
        <div className='text-title text-dark'>
          Sign Up
        </div>
        <div className='text-small text-warning gap-hori-small'>
          <div className='text-light'>
            Required
          </div>
          <div className='text-bold'>
            *
          </div>
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Email
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput placeholder={'bobsmith@gmail.com'} type={'text'} />
        </div>
        <div className='gap-vert-small'>
          <div className='text-small text-bold gap-hori-small'>
            <div className='text-dark'>
              Password
            </div>
            <div className='text-warning'>
              *
            </div>
          </div>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
          />
        </div>
      </div>
      <div className='gap-vert-large'>
        <div className='gap-hori-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Create account
          </ThemedButton>
        </div>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Already have an account?
          </div>
          <div
            className='text-bold text-blue'
            onClick={handleNavigate}
            style={{cursor: 'pointer'}}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step four of signup
 * @return {JSX}
 */
function SignupStepFour({active, step, handleNextStep}) {
  return (
    <div
      className='signup-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='signup-step-four-text gap-vert-large'>
        <div className='text-title text-dark'>
          Verify your email
        </div>
        <div className='text-small'>
          We just sent you an email to verify your email address. Please
          use the link in the email to activate your account. The link
          will expire in 48 hours.
        </div>
      </div>
      <div className='signup-step-four-text text-small'>
        If you did not receive the email, please click the button below
        to resend another email.
      </div>
      <div className='gap-vert-large'>
        <ThemedButton
          color={'yellow'}
          variant={'cancel'}
          value={step}
          onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
        >
          Resend Email
        </ThemedButton>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Need help? Contact us at
          </div>
          <div className='text-bold text-blue'>
            tasselsupport@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step five of signup
 * @return {JSX}
 */
function SignupStepFive({active}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/testlogin');
  };

  return (
    <div
      className='login-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='login-step-four-text gap-vert-large'>
        <div className='text-title text-dark'>
          Success!
        </div>
        <div className='text-small' style={{lineHeight: '25px'}}>
         We have successfully created your new account. However, an admin
         must approve your account. You will have access to our site, but
         certain features will be restricted until your account has been
         approved. Look out for an email detailing your account&apos;s approval.
        </div>
      </div>
      <div className='gap-vert-large'>
        <ThemedButton
          color={'yellow'}
          variant={'themed'}
          onClick={handleNavigate}
        >
          Login
        </ThemedButton>
        <div className='text-small gap-hori-small'>
          <div className='text-light text-dark'>
            Need help? Contact us at
          </div>
          <div className='text-bold text-blue'>
            tasselsupport@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
