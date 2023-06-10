- [x] restaurants 클래스 추상화

  - [x] 음식점 리스트에 새로운 음식점을 추가하는 기능
  - [x] 음식점 리스트를 이름순으로 정렬하는 기능
  - [x] 음식점 리스트를 거리순으로 정렬하는 기능
  - [x] 음식점 리스트를 카테고리별로 필터링하는 기능

<br>

- [x] 새로고침시 초기화되지 않는 기능(localstorage 활용)

<br>

- [x] 화면 구현
  - [x] 기본 구조
  - [x] 컴포넌트 분리
    - [x] SelectBox 컴포넌트
    - [x] RestaurantCard 컴포넌트
      - [x] params: Restaurant 정보
    - [x] RestaurantList 컴포넌트
      - [x] params: RestaurantCard[]
    - [x] Modal 컴포넌트
      - [x] 토글기능
      - [x] 새로운 음식점 등록 기능
    - [x] Header 컴포넌트
  - [x] 카테고리 선택시 해당 카테고리로 필터링된 결과를 보여주는 기능
  - [x] 이름순/거리순 선택시 해당 기준으로 정렬한 결과를 보여주는 기능

<br>

- [x] 음식점 추가 모달
  - [x] 취소하기 버튼 누르면 음식점 추가 모달이 사라지는 기능
    - [x] esc
    - [x] 배경 클릭
  - [x] 필수정보 입력 후 추가하기 버튼 누르면 새로운 음식점 추가하는 기능
    - [x] 카테고리, 이름, 거리 (필수정보)
    - [x] 설명, 참고링크 (추가정보)