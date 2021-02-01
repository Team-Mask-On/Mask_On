import './App.css';
import KakaoMap from './Components/KakaoMap';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import "animate.css/animate.css";

function App() {
  const apiURL = 'http://3.35.82.17:8000/api';
  const refreshTerm = 30000;

  return (
    <div style={{height: "100%"}}>
      <ReactNotification />
      <KakaoMap 
        apiURL={apiURL} 
        refreshTerm={refreshTerm}
      ></KakaoMap>
    </div>
  )
}

export default App;
