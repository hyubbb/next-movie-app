## 설명

- Next14, react, recoil, typescript, scss, firebase를 사용하여 만든 영화 검색 사이트


## 내용

- `next/image` 를 활용하여 데이터 로딩속도 절감
    - 로딩속도가 70%이상 절감을 경험
    - blur 기능을 사용하여 이미지가 렌더링되는 동안에 이미지표시
- `Suspense`를 이용하여 비동기 데이터 처리시 Spinner indicator로 로딩상태 처리
- `recoil` 은 검색창 온.오프에 필요한 변수와 로그인정보를 상태관리를 하기위해서 사용
- `firebase` 를 이용하여 회원가입과 `firestore` 를 이용하여 좋아요 기능을 위한 간편 DB사용