import React from "react";

function TransactionItem({
  group,
  handleCancelTransaction,
  handleSendTransaction,
}) {
  return (
    <div
      key={group.id_transaction}
      className="max-w-7xl mx-auto bg-white shadow-2xl p-8 mt-8"
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold">Invoice number</h3>
          <p className="text-gray-600 text-sm">
            {group.items[0].invoice_number}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-base font-semibold text-right bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
            {group.items[0].status_name}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Items</h3>
        {group.items.map((item) => (
          <div
            key={item.id_transaction_product}
            className="flex items-center mb-4"
          >
            <img
              src={`http://localhost:8000/${item.image}`}
              alt="Product"
              className="w-20 h-16 mr-4"
            />
            <div>
              <h4 className="text-sm font-medium">{item.name}</h4>
              <p className="text-gray-600">x {item.quantity}</p>
            </div>
            <p className="ml-auto font-medium">
              {item.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold">Subtotal</h3>
          <p className="font-semibold">
            {group.items[0].total_price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold">Shipping</h3>
          <p className="font-semibold">
            {group.items[0].shipping_cost.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold">Shipping Method</h3>
          <p className="font-semibold">{group.items[0].shipping_method}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold">Total</h3>
          <p className="text-sm font-semibold">
            {(
              Number(group.items[0].total_price) +
              Number(group.items[0].shipping_cost)
            ).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <h3 className="text-sm font-semibold text-red-400">
            {group.items[0].date.substring(0, 10)}
          </h3>
        </div>
        <div className="flex justify-center items-center mt-4">
          {group.items[0].id_transaction_status === 3 && (
            <button
              onClick={() =>
                handleSendTransaction(group.items[0].id_transaction)
              }
              className="bg-yellow-200 border-2 mx-10 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded"
            >
              Send Order
            </button>
          )}
          {(group.items[0].id_transaction_status === 1 ||
            group.items[0].id_transaction_status === 2 ||
            group.items[0].id_transaction_status === 3) && (
            <button
              onClick={() =>
                handleCancelTransaction(group.items[0].id_transaction)
              }
              className="bg-yellow-200 border-2 mx-10 hover:bg-sky-900 hover:text-white font-semibold py-1 px-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
