import { create } from 'domain';
import React from 'react';
import { useLoginResourceAction } from './resource/login-resource';

const LoginPage: React.FC = () => {

    const { create: login } = useLoginResourceAction();


    const handleLogin = () => {
        login({}, {
          username: "123",
          password: "123"
        })
    }
    return(
      <div>
        <button onClick={ handleLogin }>

        </button>
      </div>
    )
}

export default LoginPage;