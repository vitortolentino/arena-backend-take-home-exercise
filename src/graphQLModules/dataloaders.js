import Dataloader from "dataloader";

import datasource from "./datasource";

const ticketDataloaders = () => {
  const batchTickets = async (parameters) => {
    const result = parameters.map((data) => datasource.findParentTickets(data));
    return Promise.all(result);
  };

  const batchChildrenTickets = async (parentIdList) => {
    const result = await datasource.findChildrenTickets(parentIdList);
    const resultAsPromiseArray = parentIdList.map((id) =>
      result.filter(({ parentId }) => parentId === id)
    );
    return await Promise.all(resultAsPromiseArray);
  };

  return {
    tickets: new Dataloader(batchTickets),
    children: new Dataloader(batchChildrenTickets),
  };
};

export default ticketDataloaders();
