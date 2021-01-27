import './App.css';
import KakaoMap from './Components/KakaoMap';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import "animate.css/animate.css";

function App() {
  const apiURL = 'http://yabbyark.iptime.org:8001/api';
  const refreshTerm = 13000;

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
