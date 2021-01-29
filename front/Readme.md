# Front
![Alt text](Screenshot/demo.gif)


React를 이용해 작성되었습니다. 

[Kakao map API](https://apis.map.kakao.com/)를 [Musma/React-kakao-maps](https://github.com/Musma/react-kakao-maps)를 통해 사용하였습니다.

각 센서(라즈베리파이)가 제공하는 데이터의 통계자료는 [React-vis](https://github.com/uber/react-vis)를 통해 시각화 하였습니다.

## Install
```
$ git clone https://github.com/Team-Mask-On/Mask_On.git
$ cd front/kakao
$ docker build -t kakao-img .
$ docker-compose up
```

## Tech-Stack
+ Environment : Docker
+ [Kakao map API](https://apis.map.kakao.com/)
+ [React](https://github.com/facebook/react)
    + [Material-UI](https://github.com/mui-org/material-ui)  
    + [React-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
    + [React-vis](https://github.com/uber/react-vis)
    + [Musma/React-kakao-maps](https://github.com/Musma/react-kakao-maps)
    + [React-notifications-component](https://github.com/teodosii/react-notifications-component)
    + [React-virtualized-auto-sizer](https://github.com/bvaughn/react-virtualized-auto-sizer)

## Todo
- [x] 지도 API를 통한 지도 표시
- [x] 지도 상에 지정된 위치에 센서 표시
- [x] 센서 정보 표시
- [x] 센서 로그 표시
- [x] 센서 평균 표시
- [x] 사용자 위치기반 좌표 설정 
- [x] 검색 기능 구현
- [x] 단위 시간마다 정보 최신화
