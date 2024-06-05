import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import BasicTabs from '../BasicTabs'
import Header from '../Header'



const Layout = (props) => {
  return (
    <div className='layout'>
        <Header />
        <BasicTabs />
    </div>
  );

}

export default Layout