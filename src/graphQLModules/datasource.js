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

  createTicket: async ({ title, isCompleted = false }) => {
    return models.Ticket.create({ title, isCompleted });
  },

  updateTicket: async ({ id, title }) => {
    const findedTicket = await models.Ticket.findByPk(id);
    return findedTicket.update({ title });
  },
};

export default ticketDatasource;
