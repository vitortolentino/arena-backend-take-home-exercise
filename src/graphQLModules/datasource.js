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
    return models.Ticket.findByPk(id);
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

  toggleTicket: async ({ id, isCompleted }) => {
    const findedTicket = await models.Ticket.findByPk(id);
    return findedTicket.update({ isCompleted });
  },

  removeTicket: async ({ id }) => {
    const findedTicket = await models.Ticket.findByPk(id);
    const isDeleted = !!findedTicket.destroy();
    return isDeleted;
  },

  addChildrenToTicket: async ({ parentId, childrenIds }) => {
    const findedTicket = await models.Ticket.update(
      {
        parentId,
      },
      {
        where: {
          id: {
            [Op.in]: childrenIds,
          },
        },
      }
    );

    return models.Ticket.findByPk(parentId);
  },
};

export default ticketDatasource;
