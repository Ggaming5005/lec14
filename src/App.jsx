import styled from "styled-components";
import { CartProvider, useCart } from "./ProductContext";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import GlobalStyle from "./GlobalStyle";
import { useEffect } from "react";
import ConfirmOrder from "./components/ConfirmOrder";

const StyledDiv = styled.div`
  display: flex;
  width: 80%;
  gap: 2rem;
  align-items: flex-start;
  margin: 4rem auto;
  padding: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

function App() {
  return (
    <CartProvider>
      <ProductList />
    </CartProvider>
  );
}

function ProductList() {
  const { confirmed } = useCart();

  useEffect(() => {
    document.body.style.overflow = confirmed ? "hidden" : "auto";
  }, [confirmed]);

  return (
    <>
      <GlobalStyle />
      <StyledDiv>
        <Menu />
        <Cart />

        {confirmed && (
          <Overlay>
            <ConfirmOrder />
          </Overlay>
        )}
      </StyledDiv>
    </>
  );
}

export default App;
