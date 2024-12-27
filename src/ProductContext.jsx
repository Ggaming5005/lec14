import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  data: [],
  isLoading: false,
  confirmed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "Item/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "Item/setData":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "Item/add": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "Item/increaseQuantity": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "Item/decreaseQuantity": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    case "Item/delete": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }

    case "Order/confirmed": {
      return {
        ...state,
        confirmed: true,
      };
    }
    case "Order/new": {
      return { ...state, cart: [], confirmed: false };
    }

    default:
      throw new Error("Unknown action type");
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "Item/loading" });

      try {
        const res = await fetch("./data.json");
        const data = await res.json();

        dispatch({ type: "Item/setData", payload: data });
      } catch (error) {
        console.error("Failed to fetch data", error);
        dispatch({ type: "Item/setData", payload: [] }); //
      }
    }
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
