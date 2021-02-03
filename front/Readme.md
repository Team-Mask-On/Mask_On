# Readme

# Front

![Screenshot/demo.gif](Screenshot/demo.gif)

## Filetree

```bash
├── Readme.md : Readme 파일
├── Screemshot
│   └── demo.gif : Readme에 첨부된 데모 gif 이미지
└── kakao : React create-react-app 프로젝트
    ├── patches
    │   └── react-kakao-maps+0.0.1.patch : react-kakao-maps 패치파일
    ├── public
    │   ├── favicon.png : 마스크 ON favicon
    │   └── ...
    ├── src
    │   ├── App.js : 루트컴포넌트
    │   ├── Components : 컴포넌트
    │   │   ├── AverageChart.js : 평균 데이터 차트 컴포넌트
    │   │   ├── CurrentChart.js : 현황 데이터 차트 컴포넌트
    │   │   ├── KakaoMap.js : 카카오맵/검색바를 띄우는 컴포넌트
    │   │   ├── SearchBar.js : 검색바 컴포넌트
    │   │   ├── Sensor.js : 카카오맵 위에 렌더되는 센서 컴포넌트
    │   │   ├── SensorCard.js : 센서 카드 컴포넌트
    │   │   └── SensorModal.js : 센서 상세정보 컴포넌트
    │   └── Dummies : 테스트용 더미데이터 JSON
    │       ├── sensors.json : 센서 더미데이터
    │       ├── average : 평균 더미데이터
    │       │   └── *.json : 각 센서별 평균 더미데이터
    │       └── log : 로그 더미데이터
    │           └── *.json : 각 센서별 로그 더미데이터
    ├── .gitignore
    ├── Dockerfile
    ├── Package-lock.json
    ├── Package.json
    └── yarn.lock
```

## Installation

```bash
> git clone https://github.com/Team-Mask-On/Mask_On.git
> cd front/kakao
> docker build -t front-img .
# 개발서버 열기
> docker run --name front-con \
    -v $(pwd):/app \
    -p 3000:3000 \
    -e REACT_APP_KAKAO_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
    -e REACT_APP_API_URL=http://example:8000 \
    -e REACT_APP_REFRESH_TERM=50000 front-img
# React build하기
> docker run -it \
    -v $(pwd):/app \
    -e REACT_APP_KAKAO_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
    -e REACT_APP_API_URL=http://example:8000 \
    -e REACT_APP_REFRESH_TERM=50000 front-img bash
$ npm run build
```

⚠️ Docker image build시에 package-patch 관련 오류 발생시 [이 글](https://github.com/ds300/patch-package/issues/185)을 참조해주세요.

### Env

- `REACT_APP_KAKAO_APP_KEY` : [Kakaomap API 앱키](https://developers.kakao.com/console/app) 중 JavaScript 키를 기입. ex) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
- `REACT_APP_API_URL` : API 서버의 주소를 기입. ex) http://example:8000/api
- `REACT_APP_REFRESH_TERM` : Sensor정보를 새로고침 할 주기를 ms단위로 기입. ex) 50000

## Tech-Stack
|분류|기술|
|------|---|
|Node|Node 14.15.3|
|React|React 17.0.1|
|API|Kakaomap API|

### NPM Packages

- [Musma/React-kakao-maps](https://github.com/Musma/react-kakao-maps) : 카카오지도 기능을 React Component로 제공
- [patch-package](https://github.com/ds300/patch-package) : NPM Package를 patch할 수 있도록 해줌
- [React-vis](https://github.com/uber/react-vis) : 데이터 시각화 Component
- [React-notifications-component](https://github.com/teodosii/react-notifications-component) : 알림메시지 Component
- [Material-UI](https://github.com/mui-org/material-ui)
- [React-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
- [React-virtualized-auto-sizer](https://github.com/bvaughn/react-virtualized-auto-sizer)
- [axios](https://github.com/axios/axios)
- [animate.css](https://github.com/animate-css/animate.css)
- [styled-components](https://github.com/styled-components/styled-components)