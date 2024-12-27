import styled from "styled-components";
import { useCart } from "../ProductContext";
import EmptyCartIcon from "./EmptyCartIcon";
import RemoveIcon from "./RemoveIcon";

const StyledDiv = styled.div`
  flex-basis: 25%;
  background-color: var(--color-rose-50);
  max-height: 40rem;
  padding: 2rem;
  border-radius: 8px;
  overflow-y: scroll;

  @media (max-width: 768px) {
    width: 90%;
  }
  h1 {
    font-size: 2.4rem;
    color: var(--color-red);
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    color: var(--color-rose-500);
    margin-top: 1rem;
  }
`;

const StyledEmptyCart = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    align-self: flex-start;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const StyledList = styled.li`
  padding: 1.4rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  align-items: center;

  p {
    color: var(--color-rose-900);
    font-weight: 700;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPrice = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 1.4rem;
`;

const Quantity = styled.span`
  color: var(--color-red);
  font-weight: 500;
`;
const ItemPrice = styled.span`
  color: var(--color-rose-300);
`;
const TotalItemPrice = styled.span`
  color: var(--color-rose-500);
  font-weight: 500;
`;

const ButtonCancel = styled.span`
  width: 2rem;
  aspect-ratio: 1;
  border: 1px solid var(--color-rose-300);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: var(--color-rose-900);

    svg {
      path {
        fill: var(--color-rose-900);
      }
    }
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  align-items: center;

  p {
    color: var(--color-rose-900);
    font-weight: 600;
  }
  span {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-rose-900);
  }
`;

const StyledDelivery = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: var(--color-rose-100);
  padding: 1rem;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const StyledConfirmButton = styled.button`
  background-color: var(--color-red);
  padding: 1.2rem;
  border: none;
  border-radius: 3rem;
  color: var(--color-white);
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

function Cart() {
  const { cart } = useCart();
  const isCart = cart.length === 0;
  const totalQuantity = cart.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <StyledDiv>
      <h1>Your Cart ({totalQuantity})</h1>
      {isCart && (
        <StyledEmptyCart>
          <EmptyCartIcon />

          <p>Your added items will appear here</p>
        </StyledEmptyCart>
      )}

      {!isCart && <DisplayCart cart={cart} totalPrice={totalPrice} />}
    </StyledDiv>
  );
}

function DisplayCart({ cart, totalPrice }) {
  const { dispatch } = useCart();

  function handleConfirm() {
    dispatch({ type: "Order/confirmed" });
  }
  return (
    <StyledCart>
      <StyledUl>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </StyledUl>
      <OrderTotal>
        <p>Order Total</p>
        <span>{formatCurrency(totalPrice)}</span>
      </OrderTotal>
      <StyledDelivery>
        <img
          src="/assets/images/icon-carbon-neutral.svg"
          alt="icon-carbon-neutral icon"
        />
        <span>This is carbon neutral delivery.</span>
      </StyledDelivery>
      <StyledConfirmButton onClick={handleConfirm}>
        Confirm Order
      </StyledConfirmButton>
    </StyledCart>
  );
}

function CartItem({ item }) {
  const { dispatch } = useCart();
  const totalItemPrice = item.quantity * item.price;
  function handleDelete() {
    dispatch({ type: "Item/delete", payload: item });
  }
  return (
    <StyledList>
      <div>
        <p>{item.name}</p>
        <StyledPrice>
          <Quantity>{item.quantity}x</Quantity>
          <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
          <TotalItemPrice>{formatCurrency(totalItemPrice)}</TotalItemPrice>
        </StyledPrice>
      </div>
      <ButtonCancel role="button" onClick={handleDelete}>
        <RemoveIcon />
      </ButtonCancel>
    </StyledList>
  );
}

export default Cart;
