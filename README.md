## 수정할 기능
sdk expired시 재발급처리가 제대로 이뤄지지 않는 것 같음.


# 소개

`TMDB API`를 사용하여 만든 영화 검색 사이트 입니다. 
대표적인 기능으로는 영화 검색과 좋아요 기능이 있습니다.

- 관련포스팅 : <a href="https://velog.io/@hyubbb/Next.jsfirebase-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C%EC%97%90%EC%84%9C-cookie%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%A0%95%EB%B3%B4-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0">서버사이드에서 로그인정보 유지하기</a>
,
<a href="https://velog.io/@hyubbb/useMutation%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90">useMutation를 사용해서 최신데이터로 유지</a>

- 배포페이지 : https://next-movie-app-rosy.vercel.app/

<br>


## 기술스택

- React, Next.js, Tanstack Query, Typescript, Recoil, Scss,
Firebase,  S3, Github Actions



![0422-ezgif com-optimize](https://github.com/hyubbb/nextjs-learn-app/assets/32926006/a1c86bd0-8b6d-4178-a415-2e986a4de620)

<br>


## 아키텍쳐
 <img width="764" alt="6" src="https://github.com/user-attachments/assets/def314ed-1c0f-4015-a020-612aaa445e8d">

 
## 대표 구현 내역 - 좋아요 (낙관적 업데이트)

 
영화 페이지에서 좋아요 버튼을 눌렀을때 동작하는 다이어그램
<img width="750" alt="7" src="https://github.com/user-attachments/assets/e2e77735-4e5d-4dd0-ae65-8e7eb7fb5fce">

 
# 기능

- `use client`를 사용해서 서버사이드와 클라이언트 사이드 구분
- 로그인과 좋아요 기능에 필요한 DB사용을 위해서 `firebase` 를 이용.
    - 로그인에 성공하였을때 토큰의 값을 쿠키에 저장시켜서 회원의 정보를 확인 할 때 사용
    - 쿠키에 저장된 토큰값을 `firebase sdk` 를 이용해서 로그인 된 유저의 정보를 검증 하여 서비스를 이용
- 영화 좋아요 기능
    - 로그인한 유저만 좋아요 기능이 가능.
    - 영화페이지에서 좋아요, 좋아요 취소 가능. 좋아요 페이지에서 컨텐츠 확인가능
    - `Tanstack-Query`의 `useMutation`을 이용해서 서버데이터를 최신화 시키고, 최신화된 데이터를 캐싱해서 사용
    - **middleware**를 사용하여 로그인정보에 따라 **url 접근 제어**
- 영화 검색할때 잦은 fetch를 방지 하기 위하여 디바운싱 처리
    - input custom  hooks를 만들어서 사용.
- `next/image` 를 활용하여 이미지 데이터 로딩속도 절감
    - 로딩속도가 70%이상 절감을 경험
    - placeholder:blur 기능을 사용하여 이미지가 렌더링되는 동안에 이미지제어
- `Suspense`를 이용하여 비동기 데이터 처리시 Spinner indicator로 로딩상태 처리
    - Loading Spinner를 공통 컴포넌트로 분리하여 재사용성을 높임
- `recoil` 을 이용하여 전역데이터의 상태관리
    - 검색창에 필요한 변수와 좋아요페이지, 로그인정보를 상태관리를 하기위해서 사용
- `Tanstack-Query`로 데이터 관리, 서버로부터 비동기 데이터 (로그인, 좋아요)를 받아와서 캐싱처리
    - Optimistic Update를 이용하여 좋아요버튼을 눌렀을때 즉시 반응하여, 사용자 경험을 향상 시켰습니다.
- 반응형 UI
    - `swiper`라이브러리를 이용하여  영화리스트를 캐러셀로 구현

---

## 해결하고자 한 문제


### < 로딩속도 개선을 위한 배포 서버 비교 >

 <img width="374" alt="8" src="https://github.com/user-attachments/assets/1e8c4597-be45-42a5-8e84-03c6c2714b2b">


- 로컬 환경에 비교하여, 현저히 느려진 웹의 환경을 개선하기 위한 비교.
- 배포방식 변경으로 인한 페이지 로딩속도가 최소 `20%` 이상 향상 하였습니다.
- EC2의 속도가 빠른것에 리전의 영향이 크다고 판단됩니다.
- `Netlify`에서 `AWS-EC2`로 서버 변경하였습니다.
