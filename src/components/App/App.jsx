import {useState, useEffect} from 'react';
import React from 'react';
import './App.css';
import GalleryList from '../GalleryList/GalleryList';
import GalleryForm from '../GalleryForm/GalleryForm';
import Axios from 'axios';
import Container from '@mui/material/Container';
import {useSelector} from 'react-redux';

function App() {

    const [moments, setMoments] = useState([]);
    const totalClicksReducer = useSelector(store => store.totalClicksReducer);

    useEffect(()=>{
      getMoments();
    }, [{moments}]); //anytime moments is changed, run getMoments(). moments with no {} inside the [] also works but maybe this injection seems to be faster? (From Dev, moments is set above as an empty array...so I'm guessing when that array changes, it fires.)

    const getMoments=()=>{
      Axios.get('/gallery').then((response)=>{
        setMoments(response.data);
      }).catch((err)=>{
        console.log(err);
        alert('error getting moments');
      })
    }

    //// I realized after the fact in class that I should have created a Body componenet, called in the App.jsx file, and put the GET, useEffect, and GalleryForm/GalleryList components in that Body file.
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gallery of My Life</h1>
          <h2>Total Click on Likes: {totalClicksReducer}</h2>
        </header>
        <div className='form'>
          <GalleryForm moments = {moments}/>
        </div>
        <Container>
          <GalleryList moments = {moments}/>
        </Container>
      </div>
    );
}

export default App;
