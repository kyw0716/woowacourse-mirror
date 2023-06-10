export const PRICE_UNIT = 1_000;
export const regex = Object.freeze({
  BLANK: /\s/,
  RESTART_COMMAND: /y|n/,
  PRICE_FORMAT: /\B(?=(\d{3})+(?!\d))/g,
});

export const EMPTY_STRING = '';
export const LOTTO_NUMBER_COUNT = 6;

export const lottoNumberRange = Object.freeze({
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
});

export const ranks = Object.freeze({
  FIRST_RANK: 1,
  SECOND_RANK: 2,
  THIRD_RANK: 3,
  FOURTH_RANK: 4,
  FIFTH_RANK: 5,
});

export const profit = Object.freeze({
  FIRST_RANK: 2_000_000_000,
  SECOND_RANK: 30_000_000,
  THIRD_RANK: 1_500_000,
  FOURTH_RANK: 50_000,
  FIFTH_RANK: 5_000,
});

export const profitByRank = Object.freeze([
  profit.FIRST_RANK,
  profit.SECOND_RANK,
  profit.THIRD_RANK,
  profit.FOURTH_RANK,
  profit.FIFTH_RANK,
]);

export const correctCountPerRank = Object.freeze({
  FIRST_RANK: 6,
  SECOND_RANK: 5,
  THIRD_RANK: 5,
  FOURTH_RANK: 4,
  FIFTH_RANK: 3,
});

export const correctCountPerRankForRender = Object.freeze({
  FIRST_RANK: '6개',
  SECOND_RANK: '5개 + 보너스볼',
  THIRD_RANK: '5개',
  FOURTH_RANK: '4개',
  FIFTH_RANK: '3개',
});

export const indexToRankKeyConverter = Object.freeze([
  'FIRST_RANK',
  'SECOND_RANK',
  'THIRD_RANK',
  'FOURTH_RANK',
  'FIFTH_RANK',
]);

export const message = Object.freeze({
  ASK_PURCHASE_PRICE: '> 구입금액을 입력해 주세요.',
  showLottoCount: (lottoCount) => `${lottoCount}개를 구매했습니다.`,
  ASK_WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  ASK_BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  RESULT_HEADER: '\n당첨 통계\n-- -----------------',
  showStatistics: (rank, correctCount) =>
    `${correctCountPerRank[indexToRankKeyConverter[rank - 1]]}개 일치${
      rank === 2 ? ', 보너스 볼 일치' : ''
    } (${profit[indexToRankKeyConverter[rank - 1]]
      .toString()
      .replace(regex.PRICE_FORMAT, ',')}원) - ${correctCount}개`,
  showProfitRate: (profitRate) => `총 수익률은 ${profitRate}%입니다.\n`,
  ASK_RESTART_COMMAND: '> 다시 시작하시겠습니까? (y/n)',
});

export const errorMessage = Object.freeze({
  PURCHASE_PRICE_ERROR: '구매 금액은 1000원 단위로 입력해주세요',
  NUMBER_DUPLICATED_ERROR:
    '당첨 번호와 보너스 번호를 모두 중복되지 않게 입력해주세요.',
  RESTART_COMMAND_ERROR: 'y 또는 n으로만 입력해주세요.',
});
