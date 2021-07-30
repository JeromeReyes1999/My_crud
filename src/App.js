
import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalForm from './components/ModalForm';
import header from './components/Header';
import Contacts from './components/Contacts';
import firebaseDb from './firebase'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [editoradd, setEditOrAdd] = React.useState('Add');


  return (
    <div className="App">
      <Header/>
      <Contacts/>
      <Footer/>
    </div>
    
  );
}

export default App;
