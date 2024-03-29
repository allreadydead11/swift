import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getExactDay, getExactMonth } from "@utils/getDate";
import getTransactionIcon from "@utils/getTransactionIcon";
import { ETransactionAllType } from "@services/transaction/types";
import { CLIENT_ROUTES } from "@constants/routes";

type TProps = {
  transaction_type: string;
  amount: string;
  created_at: string;
  is_success: boolean;
  is_deposit?: boolean;
  transaction_id: number;
};

const TransactionCard = ({ amount, created_at, is_success, transaction_type, is_deposit, transaction_id }: TProps) => {
  const navigate = useNavigate();
  const [day, setDay] = useState<string | null>(null);

  const formatDate = (date: string) => {
    const currentDate = new Date(date);
    const getDay = currentDate.getDay();
    const getMonth = currentDate.getMonth();
    const getFullYear = currentDate.getFullYear();

    return `${getExactDay(getDay)}, ${getExactMonth(getMonth)} ${getFullYear}`;
  };

  useEffect(() => {
    const date = formatDate(created_at);
    setDay(date);
  }, []);

  return (
    <div
      className="transaction-card"
      onClick={() => navigate(`${CLIENT_ROUTES.transactions}/${transaction_type}/${transaction_id}`)}
      data-testid="transaction-card"
    >
      <div className="transaction-info">
        <div className="trans-icon">{getTransactionIcon(transaction_type as ETransactionAllType)}</div>
        <div className="info-wrapper">
          <div className="title" data-testid="transaction-type">
            {transaction_type}
          </div>
          <div className="trans-date" role="day">
            {day}
          </div>
        </div>
      </div>
      <div className="transaction-details">
        <p className="amount">
          {is_deposit ? "+" : "-"}N{amount}
        </p>
        <p className="status">{is_success ? "successful" : "failed"}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
