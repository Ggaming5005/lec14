import styled from "styled-components";
import { useCart } from "../ProductContext";

const ConfirmBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 50%;
  border-radius: 9px;
  background: var(--color-white);
  padding: 2rem 3.2rem;
  overflow-y: auto;
  z-index: 1000;
  @media (max-width: 768px) {
    width: 70%;
  }

  h2 {
    font-size: 3rem;
    color: var(--color-rose-900);
    line-height: 1.6;
  }

  span {
    font-size: 1.2rem;
    color: var(--color-rose-300);
  }

  ul {
    list-style: none;
    margin-top: 2rem;

    img {
      width: 6rem;
      height: auto;
    }
  }
`;

const OrderList = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: var(--color-rose-50);
`;

const ConfirmIcon = styled.img`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const OrderDescription = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const OrderPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    font-size: 1.4rem;
    color: var(--color-rose-900);
    font-weight: 500;
  }
`;

const PriceList = styled.div`
  display: flex;
  gap: 1.8rem;

  span:first-child {
    color: var(--color-red);
    font-weight: 500;
    font-size: 1.4rem;
  }

  span:last-child {
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

const TotalPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-rose-900);
`;

const TotalOrderPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-rose-50);
  padding: 1rem 0;
  margin-bottom: 1rem;
  p {
    font-size: 1.2rem;
  }
  span {
    font-size: 2rem;
    color: var(--color-rose-900);
    font-weight: 700;
  }
`;

const NewOrder = styled.div`
  padding: 1.2rem;
  font-size: 1.4rem;
  background-color: var(--color-red);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  border-radius: 3rem;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: var(--color-red-dark);
  }
`;

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

function ConfirmOrder() {
  const { cart, dispatch } = useCart();
  const totalPrice = cart.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );

  function handleNewOrder() {
    dispatch({ type: "Order/new" });
  }
  return (
    <ConfirmBox>
      <ConfirmIcon
        src="/assets/images/icon-order-confirmed.svg"
        alt="confirmed icon"
      />
      <h2>Order Confirmed</h2>
      <span>We hope you enjoy your food!</span>
      <ul>
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>
      <TotalOrderPrice>
        <p>Total Order</p>
        <span>{formatCurrency(totalPrice)}</span>
      </TotalOrderPrice>
      <NewOrder onClick={handleNewOrder}>Start new order</NewOrder>
    </ConfirmBox>
  );
}

function OrderItem({ item }) {
  return (
    <OrderList>
      <OrderDescription>
        <img src={item.image.thumbnail} />
        <OrderPrice>
          <p>{item.name}</p>
          <PriceList>
            <span>{item.quantity}x</span>
            <span>{formatCurrency(item.price)}</span>
          </PriceList>
        </OrderPrice>
      </OrderDescription>
      <TotalPrice>{formatCurrency(item.quantity * item.price)}</TotalPrice>
    </OrderList>
  );
}

export default ConfirmOrder;
