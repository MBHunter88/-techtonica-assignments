import React, { useState, useContext } from 'react'
import { AppContext } from '../helpers/Context';

function EndScreen() {
  const {score, setScore} = useContext(AppContext)


  return (
    <>
      <div>
      <h1>End Menu</h1>
      </div>
    </>
  )
}

export default EndScreen;