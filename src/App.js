import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import ChatApp from './components/ChatApp';
import { Provider } from 'react-redux'
import { store } from './redux';

function App() {
  const [loginVis, setLoginVis] = useState(true);
  const toggleLoginVis = () => {setLoginVis(!loginVis)}
  
  return (
    <Provider store={store}>
      <div className='w-full h-screen'>
        {
          loginVis &&
          <LoginForm toggleLoginVis={toggleLoginVis} />
        }
        {
          !loginVis &&
          <ChatApp signOut={toggleLoginVis} />
        }
      </div>
    </Provider>
  );
}

export default App;
