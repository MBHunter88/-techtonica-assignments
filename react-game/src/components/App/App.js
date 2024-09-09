//import for Reat and all child components
import React, { useState } from 'react';
import StartMenu from '../StartMenu';
import TownHall from '../TownHall';
import Store from '../Store';
import Cave from '../Cave';
import DragonFight from '../DragonFight';
import Player from '../Player';

//define App component 
const App = () => {

  //define player using Player component and initialeze game modes
  const player = Player();
  const [mode, setMode] = useState('start');

  const changeMode = (newMode) => setMode(newMode);
  const onReturnClick = () => changeMode('townHall'); //add handler to return to previous mode

  return (
    <div>
      {mode === 'start' && <StartMenu onStart={() => changeMode('townHall')} />}
      {mode === 'townHall' && (
        <TownHall
          onEnterCave={() => changeMode('cave')}
          onEnterStore={() => changeMode('store')}
          onEnterDragonFight={() => changeMode('dragonFight')}
          onReturnToStart={() => changeMode('start')}
        />
      )}
      {mode === 'cave' && <Cave {...player} onReturnClick={onReturnClick} />}
      {mode === 'store' && <Store {...player} setMode={setMode} onReturnClick={onReturnClick}/>}
      {mode === 'dragonFight' && <DragonFight {...player} setMode={setMode} onReturnClick={onReturnClick}/>}
    </div>
  );
};

export default App;
