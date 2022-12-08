import NavBar from './components/NavBar';

const App = (props: any) => {
  return (
    <div className="App">
      <NavBar />

      {props.component}
    </div>
  );
};

export default App;
