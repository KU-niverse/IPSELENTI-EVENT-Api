# [asku.wiki](http://asku.wiki) - 입실렌티 이벤트 프로젝트

ASKu의 입실렌티 이벤트 프로젝트는 [asku.wiki](http://asku.wiki) 메인 위키 프로젝트 홍보를 위해 사이드 프로젝트로 3월 25일부터 6월 7일까지 진행되었습니다. 

당일 공연 라인업이 공개되는 고려대학교 축제인 ‘입실렌티’의 특성에 맞추어 연예인을 예측하고 가상의 포인트를 베팅하는 이벤트 페이지와, ‘입실렌티’와 관련된 정보를 담고 있는 위키 페이지로 구성되어 있습니다.

# 1. 기획 의도

간단한 기능을 가진 사이드 프로젝트로 추후 진행될 ASKu 메인 프로젝트를 홍보하고, 개발의 기본 과정을 익히기 위해 진행되었습니다.

## 1) 문제 정의

- 교내 위키 서비스에 포함할 정보를 아카이빙 하기 위해 팀과 서비스를 홍보할 수단이 필요
- 축제에 대한 정보가 에브리타임, 고파스 등 여러 커뮤니티에 산발적으로 흩어져 있음
- 고려대학교 축제의 경우 타 학교와 달리 축하 공연 라인업이 사전에 공개되지 않음
- 라이벌인 연세대학교의 라인업과 비교되며, 주로 연세대학교 축제 이후에 진행되기 때문에 라인업에 대한 관심이 높음

## 2) 솔루션

- 축제 기간 축하공연 라인업을 예측하여 회원가입, 출석, 위키 문서 작성 등으로 획득한 포인트를 축제에 올 것으로 예상되는 연예인에게 베팅하는 시스템
- 베팅할 포인트를 얻기 위해 ‘입실렌티’ 문서를 수정하도록 유도하여 위키 문서 기능의 기초적인 부분을 구현
- 주요 연예인의 일정 등을 공유하기 위한 댓글 창 구현

# 2. 성과

![image](https://github.com/KU-niverse/IPSELENTI-EVENT-Api/assets/78073229/8d7f56b1-4eb6-45c9-b1c8-4db34c5c3ee4)
![image](https://github.com/KU-niverse/IPSELENTI-EVENT-Api/assets/78073229/7a0e5bf0-2d7a-4cf7-af17-82c6262e7c13)

배포일인 5월 23일부터 입실렌티 당일인 5월 26일까지 총 유저수 356명, 방문자수 총 2604명, 이벤트 발생 총 31000회의 유의미한 성과를 거뒀습니다.

# 3. 팀 소개

## 1) Lead

- [최영섭](https://github.com/youngsupchoi) : 서비스 기획, 프론트/백엔드/AI 개발

## 2) Front

- [김미강](https://github.com/mkngkm): 프론트 리더, 프론트 개발
- [조성민](https://github.com/noviceo): 서비스 기획, 프론트 개발
- [정다현](https://github.com/dhyun22): 프론트 개발

## 3) Back

- [김수인](https://github.com/starcat37): 백엔드 리더, 백엔드 개발
- [임재민](https://github.com/jaemin8852): 서비스 기획, 백엔드 개발

## 4) AI

- [양현진](https://github.com/HyeonJin-Yang): AI 리더, AI 개발
- [최지현](https://github.com/Jihyun-Choi): AI 개발, PM
- [원다혜](https://github.com/dahyewon): AI 개발, 마케팅

## 5) Design

- [정지원](https://www.instagram.com/520.10000/): 디자인, 마케팅

# 4. 프로젝트 기간

- 2023년 3월 25일 ~ 2023년 6월 7일
- 배포: 2023년 5월 23일

# 5. 아키텍쳐

![image](https://github.com/KU-niverse/IPSELENTI-EVENT-Api/assets/78073229/ef189fd1-e621-4f20-9ed0-22c9c9da31eb)


# 6. 백엔드

## 1) 사용 기술

| 분류 | 기술 |
| --- | --- |
| Language | javascript(Node.js) |
| Framework | express |
| DB | mysql |
| Server | ncp classic |
| proxy, 무중단배포 | nginx |
| 버전 관리 | github |

## 2) ERD

![ERD](https://github.com/KU-niverse/IPSELENTI-EVENT-Api/assets/78073229/d246dfda-3217-45cc-9631-1165fb7ef55a)

## 3) 기능설명

### (1) User

- 유저가 학번(아이디), 이름, 비밀번호, 전화번호를 입력해 회원가입을 하고, 로그인과 로그아웃을 할 수 있습니다.
- 회원가입 시 추천인 학번을 입력해 추천인과 가입자가 포인트를 획득할 수 있습니다
- 별도 오픈채팅으로 비밀번호 변경 요청이 있을 시, 비밀번호 변경을 진행할 수 있습니다.

### (2) Mypage

- 로그인한 유저의 유저 정보를 확인할 수 있습니다.
- 유저의 잔여 포인트, 베팅 포인트를 확인할 수 있습니다.
- 유저의 위키 활동내역과 그에 따른 획득 포인트를 확인할 수 있습니다.
- 유저가 베팅한 내역를 확인할 수 있습니다.

### (3) Wiki

- 입실렌티 위키 문서 페이지를 조회할 수 있습니다.
- 전체 문서를 수정하거나, 섹션별로 수정할 수 있습니다.
- 위키 수정 내역을 조회할 수 있고, 특정 버전의 수정 내역으로 롤백할 수 있습니다.

### (4) Comment

- 라인업 예측 페이지의 하단에서 라인업에 관한 댓글을 작성하고 조회할 수 있습니다.
- 댓글에 좋아요를 누를 수 있습니다. 자신의 댓글에 좋아요를 누를 수 있으며, 중복으로 누를 수 없습니다.
- 전체 댓글 보기 페이지에서는 댓글을 최신순/인기순으로 정렬할 수 있습니다.

### (5) Event

- 새로운 연예인 등록을 요청할 수 있습니다.
- 현재 베팅된 연예인 목록과 전체 베팅 포인트 값, 순위를 조회할 수 있습니다.
- 특정 연예인의 베팅 포인트 값을 조회할 수 있습니다.
- 특정 연예인에서 포인트 값을 입력하여 베팅을 할 수 있습니다.

## 4) API 설계

[Notion](https://034179.notion.site/cc933859a0ca4ba5b13f537556051056?v=c166dc1df5464b4db70511a503c48bec)
