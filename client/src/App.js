import './css/App.css';
import './css/Card.css';
import GameContainer from './containers/GameContainer';

function App() {
  return (
    <div className='app-container'>
      <h1 className='title' >Junkyard BlackJack</h1>
      <GameContainer/>
    </div>
  );
}

export default App;
