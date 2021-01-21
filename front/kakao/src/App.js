import './App.css';
import KakaoMap from './Components/KakaoMap';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

function App() {
  return (
    <div style={{height: "100%"}}>
      <ReactNotification />
      <KakaoMap></KakaoMap>
    </div>
  )
}

export default App;
