import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import ThemedButton from '../components/ThemedButton';
import '../stylesheets/TestSignup.css';
import SignupBanner1 from '../assets/SignupBanner1.png';

/**
 * Creates signup page
 * @return {HTML} signup page
 */
export default function TestSignup() {
  const [stepNumber, setStepNumber] = useState(1);

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
            <img src={SignupBanner1} />
          </div>
        </div>
        <div className='signup-box-right'>
          <SignupStepOne
            active={stepNumber === 1}
            step={1}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepTwo
            active={stepNumber === 2}
            step={2}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepThree
            active={stepNumber === 3}
            step={3}
            handleNextStep={(e) => handleNextStep(e)}
          />
          <SignupStepFour active={stepNumber === 4} />
        </div>
      </Paper>
      <Paper
        className='stepper-box-container'
        elevation={0}
        sx={{
          width: '40em',
          height: '4em',
          borderRadius: '10px 0 0 10px',
          filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
          color: '#8B95A5',
        }}
      >
        Hello
      </Paper>
    </div>
  );
}

/**
 * Step one of signup
 * @return {JSX}
 */
function SignupStepOne({active, step, handleNextStep}) {
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
          <ThemedInput placeholder={'Bob'} />
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
          <ThemedInput placeholder={'Smith'} />
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
          <div className='text-bold text-blue'>
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
          <ThemedInput placeholder={'bobsmith@ucsc.edu'} />
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
          <ThemedInput placeholder={'1997'} />
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
          <div className='text-bold text-blue'>
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
          <ThemedInput placeholder={'bobsmith@gmail.com'} />
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
          <ThemedInput placeholder={'8+ Characters, 1 Capital Letter'} />
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
          <div className='text-bold text-blue'>
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
function SignupStepFour({active}) {
  return (
    <div
      className='signup-box-right-content'
      style={{display: active ? null : 'none'}}
    >
      <div className='signup-step-four-text gap-vert-large'>
        <div className='text-title text-dark'>
          Verify your email
        </div>
        <div className='text-small text-bold'>
          We just sent you an email to verify your email address. Please
          use the link in the email to activate your account. The link
          will expire in 48 hours.
        </div>
      </div>
      <div className='signup-step-four-text text-small text-bold'>
        If you did not receive the email, please click the button below
        to resend another email.
      </div>
      <div className='gap-vert-large'>
        <ThemedButton
          color={'yellow'}
          variant={'cancel'}
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
 * Themed input
 * @return {JSX}
 */
function ThemedInput({placeholder}) {
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
    >
      <OutlinedInput
        placeholder={placeholder}
        sx={{
          paddingInline: '10px',
          height: '40px',
          width: '100%',
          borderRadius: '15px',
          fontFamily: 'Montserrat',
          fontSize: '0.8rem',
          fontWeight: '600',
        }}
      />
    </Box>
  );
}

// /**
//  * Step one of signup
//  * @return {JSX}
//  */
// function SignupStepOne() {
//   return (
//     <>
//       {/* Sign Up Title */}
//       <div>
//         <div className='text-title text-dark'>
//           Sign Up
//         </div>
//         <div className='text-small text-warning gap-hori-small'>
//           <div className='text-light'>
//             Required
//           </div>
//           <div className='text-bold'>
//             *
//           </div>
//         </div>
//       </div>
//       {/* First and Last Name */}
//       <div className='gap-vert-large'>
//         <div className='gap-vert-small'>
//           <div className='text-small text-bold gap-hori-small'>
//             <div className='text-dark'>
//               First Name
//             </div>
//             <div className='text-warning'>
//               *
//             </div>
//           </div>
//           <ThemedInput placeholder={'Bob'} />
//         </div>
//         <div className='gap-vert-small'>
//           <div className='text-small text-bold gap-hori-small'>
//             <div className='text-dark'>
//               Last Name
//             </div>
//             <div className='text-warning'>
//               *
//             </div>
//           </div>
//           <ThemedInput placeholder={'Smith'} />
//         </div>
//       </div>
//       {/* School Information */}
//       <div className='gap-vert-large'>
//         <div className='gap-vert-small'>
//           <div className='text-small text-bold text-dark'>
//             School Email
//           </div>
//           <ThemedInput placeholder={'bobsmith@ucsc.edu'} />
//         </div>
//         <div className='gap-vert-small'>
//           <div className='text-small text-bold gap-hori-small'>
//             <div className='text-dark'>
//               Year of Graduation
//             </div>
//             <div className='text-warning'>
//               *
//             </div>
//           </div>
//           <ThemedInput placeholder={'1997'} />
//         </div>
//       </div>
//       {/* Next Step Button */}
//       <div className='gap-vert-large'>
//         <div>
//           <ThemedButton
//             color={'yellow'}
//             variant={'themed'}
//           >
//             Next Step
//           </ThemedButton>
//         </div>
//         <div className='text-small gap-hori-small'>
//           <div className='text-light text-dark'>
//             Already have an account?
//           </div>
//           <div className='text-bold text-blue'>
//             Signup
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
