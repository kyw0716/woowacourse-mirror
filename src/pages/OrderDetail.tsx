import { Layout } from '../layout';
import { Style as OrderContentStyle } from '../components/orderPage';
import { Style as OrderPageStyle } from './OrderList';
import { OrderDetailContent } from '../components/orderDetailPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/error/Fallback';
import { errorMessage } from '../constants/errorMessage';
import { OrderProductInfo } from '../recoil/atoms/orderAtom';

export interface OrderDetailType {
  orderId: number;
  orderInfo: OrderProductInfo[];
  originalPrice: number;
  pointToAdd: number;
  usedPoint: number;
}

export const OrderDetail = () => {
  return (
    <Layout>
      <Style.HeaderContainer>
        <Style.Header>주문 내역 상세</Style.Header>
      </Style.HeaderContainer>
      <Style.ContentContainer>
        <ErrorBoundary
          FallbackComponent={() => (
            <Fallback
              error={new Error(errorMessage.ORDER_DETAIL_FETCH_ERROR)}
            />
          )}
        >
          <OrderDetailContent />
        </ErrorBoundary>
      </Style.ContentContainer>
    </Layout>
  );
};

const Style = {
  ...OrderContentStyle,
  ...OrderPageStyle,
};
