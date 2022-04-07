import './App.css';

import Board from "./Pages/Board";
import FakeData from "./FakeData/Data.json";
import "font-awesome/css/font-awesome.min.css";

function App() {

  if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
    localStorage.setItem('kanbanData', JSON.stringify(FakeData));
  }
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
