
import { useState, useEffect } from 'react';

export const usePaymentDialog = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Handle browser back button for dialog
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#checkout' && !isPaymentDialogOpen) {
        // Hash indicates checkout should be open but dialog is closed
        // This shouldn't happen in normal flow, so we'll clear the hash
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
      } else if (hash !== '#checkout' && isPaymentDialogOpen) {
        // Hash doesn't indicate checkout but dialog is open (back button was pressed)
        setIsPaymentDialogOpen(false);
        setSelectedProduct(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isPaymentDialogOpen]);

  const handleBuyNow = (productData: any) => {
    setSelectedProduct(productData);
    setIsPaymentDialogOpen(true);
    // Add hash to URL for back button handling
    window.history.pushState('', '', '#checkout');
  };

  const handleCloseDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedProduct(null);
    // Remove hash from URL
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
  };

  return {
    selectedProduct,
    isPaymentDialogOpen,
    handleBuyNow,
    handleCloseDialog
  };
};
