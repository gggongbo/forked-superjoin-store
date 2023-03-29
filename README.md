# **Superjoin Busniess Client**

[![React](https://img.shields.io/badge/react-18-F82F82)](https://ko.reactjs.org/blog/2022/03/29/react-v18.html)
[![Nextjs](https://img.shields.io/badge/nextjs-12-F82F82)](https://nextjs.org)
[![node](https://img.shields.io/badge/node-18-F82F82)](https://nodejs.org/docs/latest-v18.x/api)
[![discussion](https://img.shields.io/badge/discussion-progressing-0ABFD1?logo=github)](https://github.com/superjoins/superjoin-business-client)
[![Jira](https://img.shields.io/badge/jira-blue?logo=jira)](https://superjoin.atlassian.net/jira)
[![Firebase](https://img.shields.io/badge/firebase-gray?logo=firebase)](https://console.firebase.google.com)

## **Contents**

- [**Superjoin Busniess Client**](#superjoin-busniess-client)
  - [**Contents**](#contents)
  - [**Requirements**](#requirements)
  - [**Tools**](#tools)
  - [**Test**](#test)
  - [**Build**](#build)
  - [**Deploy**](#deploy)
  - [**Code Managing**](#code-managing)
    - [**코드 작성시 유의사항**](#코드-작성시-유의사항)
    - [**코드 형상 관리**](#코드-형상-관리)
  - [**Code Structure**](#code-structure)

## **Requirements**

1. React : 18.2.0
2. Node : 18
3. Typescript : 4.7.4
4. Nextjs: 12.2.4
5. Firebase : 9.9.2
6. Firebase Admin: 11.0.1
7. React-redux: 8.0.2
8. Styled-Component : 5.3.5
9. ESLint : 8.21.0
10. Prettier : 2.7.1

## **Tools**

| Tool             | Name                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| IDE              | Visual Studio Code                                                                                       |
| Cooperation      | [Slack](https://slack.com/intl/ko-kr)(업무연락), [Jira](https://superjoin.atlassian.net/jira)(Todo 관리) |
| Design           | [Zeplin](https://zeplin.io)                                                                              |
| Product Managing | [Figma](https://www.figma.com/)                                                                          |
| Code Managing    | [Github](https://github.com/superjoins/superjoin-business-client)                                        |

## **Test**

1. UI 테스트

- `yan dev` 명령어로 로컬 빌드 후 테스트
- localhost:3000에서 로컬 빌드된 소스 확인 가능

2. 서버 테스트

- superjoin-store-firebase 에뮬레이터 실행
- \_app.tsx 에서 `import ../debug.config` 파일 주석 해제

## **Build**

- 아래 순서로 빌드 진행

```bash
yarn lint #코드 검사
yarn build #개발 후 서버에 올릴 때 사용. Product 모드로 로컬에서 빌드
yarn start #yarn build 후 로컬에서 nextjs 시작
yarn export #nextjs로 빌드된 결과를 static html로 쪼개주어 웹서버 세팅이 어려운 Firebase에 배포할 수 있는 상태로 변환해주는 명령어
```

## **Deploy**

1. 맨 처음 배포 방법(파이어베이스 세팅 과정 포함)

```bash
yarn deploy-first

#fireabse init hosting 실행 시 setup 옵션 설정 방법
=== Hosting Setup
? Detected an existing Next.js codebase in the current directory, should we use this? `Yes`
? In which region would you like to host server-side content, if applicable? `asia-east1 (Taiwan)`
? Set up automatic builds and deploys with GitHub? `No`
```

2. 파이어베이스 세팅이 완료된 이후, 배포 방법

```bash
yarn deploy
```

## **Code Managing**

### **코드 작성시 유의사항**

1. 파일 이름 명명은 auth(Authentication 관련 로직 저장), storeUser(로그인한 업체의 기본 정보 저장)과 같은 케이스를 제외하고, pages 하위 페이지이름(makeoffer, offer, reward, support, customer)에 따라 명명
2. 타입정의는 constants/types 안에서 진행
3. pages 하위 폴더에서 ui 관련 로직 작성
4. services 하위 폴더에서 data + useCase 관련 로직 작성
5. pages 하위 컴포넌트에서 SSR 로직 필요한 경우 pages/api/pages 하위 페이지이름 폴더 만들어서 service 폴더 안에 있는 로직 호출
   - 참고 소스 : api/support/askSupport.ts
6. BOM, DOM 객체 사용시 커스텀훅으로 만들어서 사용
   - 참고 소스: hooks/useConfirm.ts, hooks/useInClick.ts

### **코드 형상 관리**

[superjoin-v2 코드 형상 관리 참고](https://github.com/superjoins/superjoin-v2/tree/main/Superjoin#%EC%BD%94%EB%93%9C-%ED%98%95%EC%83%81-%EA%B4%80%EB%A6%AC)

## **Code Structure**

- **components**
  - `basicComponent`
    - Accordion
    - Table
    - Button.tsx
    - CattegoryTag.tsx
    - Checkbox.tsx
    - CheckboxText.tsx
    - Divider.tsx
    - Header.tsx
    - IconButton.tsx
    - InfoText.tsx
    - InputText.tsx
    - Oval.tsx
    - Selectbox.tsx
    - SelectInputText.tsx
    - SubText.tsx
    - SubTextButton.tsx
    - SubTextLink.tsx
    - VerticalSubText.tsx
  - `Icon`
  - `UserInfo` : TopNavbar 오른쪽 업체 프로필 컴포넌트. 로그아웃/비밀번호 초기화 위치
  - `Layout.tsx` : SideNavbar, TopNavbar, pages 폴더 안에 있는 메인 컴포넌트들을 감싸는 컴포넌트
  - `SideNavbar`.tsx
  - `TopNavbar`.tsx
- **constants**
  - `types`
    - category
    - components
    - customer
    - offer
    - redux
    - support
  - category.ts
  - categoryList.ts
  - router.ts
  - tableColumns.ts
- **contexts**
- **hooks**
  - useTableComponent.ts
  - useConfirm.ts
  - useInClick.ts
  - useTheme.ts
- **pages**
  - `api`
    - auth
    - support
  - `customer`
  - `login`
  - `makeoffer`
  - `offer`
  - `reward`
  - `support`
  - `\_app.tsx`
  - `\_document.tsx`
  - `index.tsx`
- **public**
- **resources**
- **services**
  - `auth`
  - `offer`
  - `storeUser`
  - `support`
  - `app.ts`
- **slices**
  - `offer`
  - `storeUser`
- **store**
  - `rootStore`
- **styles**
  - theme
  - global.css
- **utils**
  - dateUtils.ts
  - firebaseUtils.ts
  - stringUtils.ts
