import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industrySector, setIndustrySector] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors({});
          return dispatch(
            sessionActions.signup({
            firstName,
            lastName,
            username,
            email,
            companyName,
            industrySector,
            password
            })
          )
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrors(data.errors);
            }
          });
        }
      };

      useEffect(() => {
        let errObj = {}
        if(password.length < 6) {
          errObj.password = "Password must be more than 6 characters"
        }
        if(password !== confirmPassword) errObj.confirmPassword = "Confirm Password field must be the same as the Password field"
        if(username.length < 4) {
          errObj.password = "Username must be more than 4 characters"
        }
        setErrors(errObj)
      }, [password, confirmPassword, username])

      return (
        <div style={{backgroundColor: '#001f3f'}} className='login-modal'>
          <h1>Sign Up</h1>
          <form className='form' onSubmit={handleSubmit}>
            
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {errors.firstName && <p className='errors'>{errors.firstName}</p>}

            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            {errors.lastName && <p className='errors'>{errors.lastName}</p>}

            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            {errors.username && <p className='errors'>{errors.username}</p>}

            <label>
              Company Name
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </label>
            {errors.companyName && <p className='errors'>{errors.companyName}</p>}

            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <p className='errors'>{errors.email}</p>}

            <label>
              Industry Sector
              <input
                type="text"
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                required
              />
            </label>
            {errors.industrySector && <p className='errors'>{errors.industrySector}</p>}

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p className='errors'>{errors.password}</p>}
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
            <button className='signup-btn' type="submit">Sign Up</button>
          </form>
        </div>
      );      
}

export default SignupFormModal;