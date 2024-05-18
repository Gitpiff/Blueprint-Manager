import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});

      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

    const demoUser = (e) => {
      e.preventDefault();

      return dispatch(
          sessionActions.login(
              {
                  credential: "Demo-Lition",
                  password: "password"
              }
          )
      )
      .then(closeModal)
    };
  

    return (
        <div style={{backgroundColor: '#001f3f'}} className='login-modal'>
          <h1>Log In</h1>
          <form className='form' onSubmit={handleSubmit}>
            <label>
              Username or Email:  
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password: 
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.credential && <p className='errors'>{errors.credential}</p>}
            <div className='login-btns'>
              <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
              <button type="submit" onClick={demoUser}>Log In As Demo User</button>
            </div>
          </form>
        </div>
    );
}

export default LoginFormModal;