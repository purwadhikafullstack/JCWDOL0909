import Axios from "axios";
import { format, endOfDay, addDays } from "date-fns";

export const fetchTransactions = async (
  selectedStatus,
  startDate,
  endDate,
  currentPage,
  pageSize,
  adminToken
) => {
  try {
    let formattedStartDate = null;
    let formattedEndDate = null;
    let selectedTransactionStatus = "";
    if (selectedStatus !== 0) {
      selectedTransactionStatus = selectedStatus;
    }

    if (startDate) {
      const startOfDayUTC = endOfDay(startDate);
      formattedStartDate = format(
        startOfDayUTC,
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      );
    }
    if (endDate) {
      const endOfDayUTC = endOfDay(addDays(endDate, 1));
      formattedEndDate = format(endOfDayUTC, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }

    const response = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/transactions/fetchTransactions`,
      {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          page: currentPage,
          pageSize: pageSize,
          status: selectedTransactionStatus,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    const { totalCount } = response.data;
    return {
      transactions: response.data.transactions,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTransactionStatus = async () => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/transactions/fetchTransactionStatus`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
