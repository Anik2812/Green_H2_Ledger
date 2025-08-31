export {};

declare global {
  interface Window {
    ethereum?: any;
    setCurrentPage?: (page: string) => void;
  }
}