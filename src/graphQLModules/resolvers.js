const resolvers = {
  Query: {
    tickets: async (root, args, { dataloaders }) => {
      return dataloaders.tickets.load(1);
    },
    ticket: async (root, { id }, { dataloaders, datasource }) => {
      return datasource.findTicketById(id);
    },
  },
  Ticket: {
    children: async ({ id }, args, { dataloaders }) => {
      return dataloaders.children.load(id);
    },
  },
  Mutation: {
    createTicket: async (root, args, { datasource }) => {
      return await datasource.createTicket(args);
    },
    updateTicket: async (root, args, { datasource }) => {
      return await datasource.updateTicket(args);
    },
    toggleTicket: async (root, args, { datasource }) => {
      return await datasource.toggleTicket(args);
    },
    removeTicket: async (root, args, { datasource }) => {
      return await datasource.removeTicket(args);
    },
  },
};

export default resolvers;
