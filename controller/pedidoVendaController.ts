import pedidoVendaService from "../services/pedidoVendaService";
import * as HttpStatus from "http-status";
import Redis from "../infra/redis";
import Helper from "../infra/helper";

class PedidoVendaController {

  async get(req, res) {
    try {
      const cacheKey = "pedidoVenda";

      const cached = await Redis.get(cacheKey);

      if (cached) {
        console.log("Resposta vinda do Redis");
        return Helper.sendResponse(
          res,
          HttpStatus.status.OK,
          JSON.parse(cached)
        );
      }

      console.log("Resposta vinda do banco");

      const response = await pedidoVendaService.get();

      await Redis.set(cacheKey, JSON.stringify(response), 20);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );

    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar pedidos" });
    }
  }

async search(req, res) {
    try {
      const term = req.params.term;

      const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
      const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 1;

      const response = await pedidoVendaService.search(term, page, perPage);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar pedido" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const response = await pedidoVendaService.getByID(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar pedido" });
    }
  }

  async create(req, res) {
    try {
      const vm = req.body;
      await pedidoVendaService.create(vm);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "pedido cadastrada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao criar pedido" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const news = req.body;

      await pedidoVendaService.update(id, news);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "pedido atualizada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao atualizar pedido" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await pedidoVendaService.delete(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "pedido deletada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao deletar pedido" });
    }
  }
}

export default new PedidoVendaController();
