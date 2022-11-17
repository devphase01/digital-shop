import './styles/Auth.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillApple } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { observer } from "mobx-react-lite";
import { Input } from '../../../components';
import { userStore } from "../../../store";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => navigate('/login'), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    userStore.login({ email, password }).then(() => console.log('Auth Status:', userStore.isAuth));
  };

  return (
    <div className='login'>
      <div className='login__header'>
        <p>Sign in</p>
        <p>or <span onClick={() => navigate('/registration')}>create an account</span></p>
      </div>
      <div className='login__services'>
        <div className='login__services__google'>
          <FcGoogle className='login__services__icon'/>
          <p>Sign in with Google</p>
        </div>

        <div className='login__services__apple'>
          <AiFillApple className='login__services__icon'/>
          <p>Sign in with Apple</p>
        </div>
      </div>

      <div className='login__divider'>
        <div/>
        <p>or</p>
        <div/>
      </div>

      <form className='login__form' onSubmit={handleSubmit}>
        <Input
          id='login__email-field'
          type='text'
          label='Email'
          value={email}
          required={true}
          onChange={((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value))}
        />
        <Input
          id='login__password-field'
          type='password'
          label='Password'
          value={password}
          required={true}
          onChange={((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value))}
        />

        <button type='submit' className='login__form-btn'>
          <div>Sign in</div>
        </button>
      </form>
    </div>
  );
};

export default observer(LoginForm);