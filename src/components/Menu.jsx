import styled from "styled-components";
import { useCart } from "../ProductContext";
import IncrementIcon from "./IncrementIcon";
import DecrementIcon from "./DecrementIcon";

const StyledContainer = styled.div`
  display: grid;
  padding: 1rem;
  gap: 3rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`;

const StyledDiv = styled.div`
  display: flex;
  flex-basis: 75%;
  flex-direction: column;
  gap: 1.2rem;

  h1 {
    font-size: 3.8rem;
    color: var(--color-rose-900);
  }
`;

const StyledMenu = styled.div`
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  } */
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 8px;
  transition: transform 0.3s ease;

  ${StyledMenu}:hover & {
    transform: scale(1.1);
  }
`;

const ButtonBase = styled.button`
  padding: 1.2rem 2rem;
  width: 18rem;
  gap: 0.8rem;
  border: none;
  border-radius: 3rem;
  font-weight: bold;
  position: absolute;
  border: 2px solid var(--color-rose-300);
  bottom: 8rem;
  right: 50%;

  transform: translateX(50%);
  transition: opacity 2s ease;
`;

const AddToCart = styled(ButtonBase)`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: var(--color-rose-50);
  border: 2px solid var(--color-rose-300);

  &::after {
    content: "";
    position: absolute;
    width: 2rem;
    border-radius: 50%;
    transform: scale(1.1);
  }
`;

const ButtonQuantity = styled(ButtonBase)`
  display: flex;
  background-color: var(--color-red);
  color: var(--color-rose-50);
  border-color: var(--color-red);
  justify-content: space-between;
  align-items: center;

  span {
    border: none;
    background-color: var(--color-red);
    width: 2rem;
    aspect-ratio: 1;
    border: 1px solid var(--color-rose-50);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: var(--color-rose-50);
      svg {
        path {
          fill: var(--color-red);
        }
      }
    }
  }
`;

const Description = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Category = styled.p`
  color: var(--color-rose-300);
  font-size: 1.4rem;
  font-weight: 500;
`;

const Name = styled.p`
  color: var(--color-rose-900);
  font-size: 1.6rem;
  font-weight: 500;
`;

const Price = styled.p`
  color: var(--color-red);
  font-size: 1.8rem;
  font-weight: 500;
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

function Menu() {
  const { data } = useCart();

  return (
    <StyledDiv>
      <h1>Desserts</h1>

      <StyledContainer>
        {data.map((item) => (
          <MenuItem item={item} key={item.id} />
        ))}
      </StyledContainer>
    </StyledDiv>
  );
}

function MenuItem({ item }) {
  const { dispatch, cart, confirmed } = useCart();

  const isInCart = cart.some((cartItem) => cartItem.id === item.id);
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);

  function addToCart() {
    dispatch({ type: "Item/add", payload: item });
  }

  function decrementQuantity() {
    if (cartItem.quantity < 2) {
      return dispatch({ type: "Item/delete", payload: item });
    } else {
      return dispatch({ type: "Item/decreaseQuantity", payload: item });
    }
  }
  function incrementQuantity() {
    dispatch({ type: "Item/increaseQuantity", payload: item });
  }
  return (
    <StyledMenu>
      <StyledImg
        src={item.image.desktop}
        srcSet={`${item.image.mobile} 768w, ${item.image.desktop} 1200w`}
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={item.name}
      />
      <div>
        {isInCart ? (
          <ButtonQuantity>
            <span role="button" onClick={decrementQuantity}>
              <DecrementIcon />
            </span>

            <p>{cartItem.quantity}</p>
            <span role="button" onClick={incrementQuantity}>
              <IncrementIcon />
            </span>
          </ButtonQuantity>
        ) : (
          <AddToCart onClick={addToCart}>
            <img src="./assets/images/icon-add-to-cart.svg" alt="icon" />
            Add to Cart
          </AddToCart>
        )}
      </div>
      <Description>
        <Category>{item.category}</Category>
        <Name>{item.name}</Name>
        <Price>{formatCurrency(item.price)}</Price>
      </Description>
    </StyledMenu>
  );
}

export default Menu;
