import { Op } from "sequelize";
import { models } from "./../db";

const ticketDatasource = {
  findParentTickets: async () => {
    return models.Ticket.findAll({
      where: {
        parentId: null,
      },
    });
  },

  findTicketById: async (id) => {
    return models.Ticket.findOne({
      where: {
        id,
      },
    });
  },

  findChildrenTickets: async (parentIdList) => {
    return models.Ticket.findAll({
      where: {
        parentId: {
          [Op.in]: parentIdList,
        },
      },
    });
  },
};

export default ticketDatasource;
