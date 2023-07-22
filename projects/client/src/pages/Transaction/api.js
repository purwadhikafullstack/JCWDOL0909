import Axios from "axios";
import { format, endOfDay, startOfDay } from "date-fns";
import moment from "moment";

export const fetchTransaction = async (
  selectedStatus,
  startDate,
  endDate,
  currentPage,
  pageSize,
  userToken
) => {
  try {
    let formattedStartDate = null;
    let formattedEndDate = null;
    let selectedTransactionStatus = "";
    if (selectedStatus !== 0) {
      selectedTransactionStatus = selectedStatus;
    }

    if (startDate) {
      const startOfDayUTC = startOfDay(startDate);
      const startDatePlus7 = moment(startOfDayUTC).add(7, "hours");
      formattedStartDate = startDatePlus7.toISOString();
    }
    if (endDate) {
      const endOfDayUTC = endOfDay(endDate);
      console.log(endDate);
      const endDatePlus7HoursAnd1Second = moment(endOfDayUTC).add({
        hours: 7,
      });
      formattedEndDate = endDatePlus7HoursAnd1Second.toISOString();
    }

    const response = await Axios.get(
      "http://localhost:8000/transactions/fetchTransaction",
      {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          page: currentPage,
          pageSize: pageSize,
          status: selectedTransactionStatus,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
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
      "http://localhost:8000/transactions/fetchTransactionStatus"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
