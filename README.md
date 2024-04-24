
# 소개
---
Nextjs, firebase를 사용하여 만든 영화 검색 사이트입니다.
기능으로는 영화 검색과 좋아요기능이 있습니다.

- 회고포스팅 : <a href="https://velog.io/@hyubbb/Next.jsfirebase-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C%EC%97%90%EC%84%9C-cookie%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%A0%95%EB%B3%B4-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0">서버사이드에서 로그인정보 유지하기</a>
- 배포페이지 : https://next-movie-app-rosy.vercel.app/


# 스택
---
#### React, Next.js, Typescript, Firebase, Scss, Recoil


![0422-ezgif com-optimize](https://github.com/hyubbb/nextjs-learn-app/assets/32926006/a1c86bd0-8b6d-4178-a415-2e986a4de620)


## 내용

- `next/image` 를 활용하여 데이터 로딩속도 절감
    - 로딩속도가 70%이상 절감을 경험
    - blur 기능을 사용하여 이미지가 렌더링되는 동안에 이미지표시
- `Suspense`를 이용하여 비동기 데이터 처리시 Spinner indicator로 로딩상태 처리
- `recoil` 은 검색창 온.오프에 필요한 변수와 로그인정보를 상태관리를 하기위해서 사용
- `firebase` 를 이용하여 회원가입과 `firestore` 를 이용하여 좋아요 기능을 위한 간편 DB사용
- `firebase sdk`를 이용하여 유저데이터 검증
