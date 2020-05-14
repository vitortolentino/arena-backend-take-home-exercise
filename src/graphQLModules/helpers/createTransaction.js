import { sequelize } from "../../db/sequelize";

const createTransaction = async () => {
  try {
    return sequelize.transaction();
  } catch (error) {
    throw new Error("Failed to open transaction");
  }
};

export default createTransaction;
