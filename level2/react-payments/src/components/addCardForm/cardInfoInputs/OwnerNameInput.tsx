import { InputWrapper } from './template/InputWrapper';
import { ErrorMessage, Input } from './template/Input';
import styled from 'styled-components';
import { useErrorMessage } from '../../../hooks/useError';
import {
  useCardInfoActionContext,
  useCardInfoValueContext,
} from '../../../hooks/cardInfoContext';

interface Props {
  viewNextInput: () => void;
}

export const ownerNameInputValidator = (input: string | string[]) => {
  if (typeof input === 'object') throw new Error('입력 객체 에러');

  if (input.length === 0) return;

  if (/\s{2,}/.test(input))
    throw new Error('공백은 두번 연속 사용할 수 없습니다.');

  if (!/^[A-Z\s]+$/.test(input))
    throw new Error('이름은 영문으로만 입력 가능합니다.');
};

export const OwnerNameInput = ({ viewNextInput }: Props) => {
  const { ownerName } = useCardInfoValueContext();
  const { setOwnerName } = useCardInfoActionContext();

  const error = useErrorMessage(ownerName, ownerNameInputValidator);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerName(e.target.value.toUpperCase());
  };

  const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.key !== 'Enter') return;
    if (error !== null) return;

    e.preventDefault();
    viewNextInput();
  };

  return (
    <div>
      <Style.Label>
        <Style.Title>카드 소유자 이름(선택)</Style.Title>
        <Style.NameLength>{ownerName.length}/20</Style.NameLength>
      </Style.Label>
      <InputWrapper width={318}>
        <Input
          value={ownerName}
          width={'318'}
          minLength={1}
          maxLength={20}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          onChange={handleInputChange}
          onKeyDown={handlePressKey}
        />
      </InputWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </div>
  );
};

const Style = {
  Label: styled.div`
    width: 318px;

    display: flex;
    justify-content: space-between;

    font-size: 12px;
  `,
  NameLength: styled.span`
    color: #2f2f2f;
  `,
  Title: styled.span`
    color: #2f2f2f;
  `,
};
