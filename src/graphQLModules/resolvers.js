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
      const a = await datasource.createTicket(args);
      console.log({ a });
      return a;
    },
  },
};

export default resolvers;
