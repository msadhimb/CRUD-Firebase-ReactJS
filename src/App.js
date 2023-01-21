import logo from "./logo.svg";
import "./App.css";
import ListData from "./components/pages/ListData/ListData";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="container mt-5 mb-5">
        <ListData />
      </div>
    </div>
  );
}

export default App;
