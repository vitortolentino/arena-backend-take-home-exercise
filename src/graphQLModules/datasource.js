import { Op } from "sequelize";
import { UserInputError, ValidationError } from "apollo-server-express";
import { models } from "./../db";
import createTransaction from "./helpers/createTransaction";

const ticketDatasource = {
  findParentTickets: async () => {
    return models.Ticket.findAll({
      where: {
        parentId: null,
      },
    });
  },

  findTicketById: async (id) => {
    const findedTicket = await models.Ticket.findByPk(id);
    if (!findedTicket) {
      throw new UserInputError(`Ticket with id ${id} not found`);
    }

    return findedTicket;
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
    if (!findedTicket) {
      throw new UserInputError(`Ticket with id ${id} not found`);
    }

    return findedTicket.update({ title });
  },

  toggleTicket: async ({ id, isCompleted }) => {
    const findedTicket = await models.Ticket.findByPk(id);
    if (!findedTicket) {
      throw new UserInputError(`Ticket with id ${id} not found`);
    }

    return findedTicket.update({ isCompleted });
  },

  removeTicket: async ({ id }) => {
    const transaction = await createTransaction(models);
    try {
      const findedTicket = await models.Ticket.findByPk(id);
      if (!findedTicket) {
        throw new UserInputError(`Ticket with id ${id} not found`);
      }

      await models.Ticket.update(
        {
          parentId: null,
        },
        {
          where: {
            parentId: id,
          },
        }
      );

      const isDeleted = !!findedTicket.destroy();

      await transaction.commit();
      return isDeleted;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  addChildrenToTicket: async ({ parentId, childrenIds }) => {
    const findedTickets = await models.Ticket.findAll({
      where: {
        id: {
          [Op.in]: childrenIds,
        },
      },
    });

    if (!findedTickets.length) {
      throw new UserInputError("No tickets found");
    }

    const findedTicket = await models.Ticket.findByPk(parentId);
    if (!findedTicket) {
      throw new UserInputError(`Ticket with id ${parentId} not found`);
    }

    await models.Ticket.update(
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

  setParentOfTicket: async ({ parentId, childId }) => {
    const findedChildTicket = await models.Ticket.findByPk(childId);
    if (!findedChildTicket) {
      throw new UserInputError(`Ticket with id ${childId} not found`);
    }

    const findedParentTicket = await models.Ticket.findByPk(parentId);
    if (!findedParentTicket) {
      throw new UserInputError(`Ticket with id ${parentId} not found`);
    }

    await models.Ticket.update(
      {
        parentId,
      },
      {
        where: {
          id: childId,
        },
      }
    );

    return models.Ticket.findByPk(childId);
  },

  removeParentFromTicket: async ({ id }) => {
    const findedTicket = await models.Ticket.findByPk(id);
    if (!findedTicket) {
      throw new UserInputError(`Ticket with id ${id} not found`);
    }

    await models.Ticket.update(
      {
        parentId: null,
      },
      {
        where: {
          id,
        },
      }
    );

    return models.Ticket.findByPk(id);
  },
};

export default ticketDatasource;
