import CheckoutContent from "./components/checkout-content";

const Checkout = async () => {
  return (
    <div className="flex gap-4 bg-slate-100 min-h-screen">
      <div className="container flex gap-4 px-4 md:px-8 py-8 flex-col lg:flex-row">
        <CheckoutContent />
      </div>
    </div>
  );
};

export default Checkout;
