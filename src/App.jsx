// Por ahora, dejaremos los contextos y componentes como placeholders.
// En los siguientes pasos los implementaremos.

// import { AuthProvider } from './context/AuthContext';
// import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <div className="app">
      <h1 className="text-3xl font-bold text-center my-8 text-white">TaskBoard App</h1>
      <Board />
    </div>
  );
}

export default App;
