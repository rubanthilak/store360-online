import create from 'zustand'

const useStore = create(set => ({
  cart: 0,
  addToCart: () => set(state => ({ cart: state.cart + 1 })),
  clearCart: () => set({ cart: 0 })
}))

export default useStore;