import React, { useEffect, useState } from "react";
import Axios from "axios";

function ProductStock() {
  const adminToken = localStorage.getItem("admin_token");
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetchHistoriesProduct();
  }, []);

  const fetchHistoriesProduct = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/stock/fetchStockHistories`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setHistories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="flex flex-col items-center">
        <div class="w-full mt-8">
          <table class="w-full border border-gray-300">
            <thead>
              <tr>
                <th class="py-4 px-6 bg-gray-200 text-left">Date</th>
                <th class="py-4 px-6 bg-gray-200 text-left">product name</th>
                <th class="py-4 px-6 bg-gray-200 text-left">Store</th>
                <th class="py-4 px-6 bg-gray-200 text-left">Reason</th>
                <th class="py-4 px-6 bg-gray-200 text-left">
                  udjustment stock
                </th>
                <th class="py-4 px-6 bg-gray-200 text-left">stock after</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((history) => (
                <tr key={history.id_stock}>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.date}
                  </td>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.name}
                  </td>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.store}
                  </td>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.reason}
                  </td>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.adjustment}
                    {history.udjustment_stock}
                  </td>
                  <td class="py-4 px-6 border-b border-gray-300">
                    {history.stock_after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductStock;
