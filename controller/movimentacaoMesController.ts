import movimentacaoMesService from "../services/movimentacaoMesService";
import * as HttpStatus from "http-status";
import Redis from "../infra/redis";
import Helper from "../infra/helper";

class MovimentacaoMesController {

  async get(req, res) {
    try {
      const cacheKey = "movimentacaoMes";

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

      const response = await movimentacaoMesService.get();

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
        .json({ error: "Erro ao buscar movimentação" });
    }
  }

async search(req, res) {
    try {
      const term = req.params.term;

      const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
      const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 1;

      const response = await movimentacaoMesService.search(term, page, perPage);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar movimentação" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const response = await movimentacaoMesService.getByID(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar movimentação" });
    }
  }

  async create(req, res) {
    try {
      const vm = req.body;
      await movimentacaoMesService.create(vm);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "movimentação cadastrada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao criar movimentação" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const news = req.body;

      await movimentacaoMesService.update(id, news);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "movimentação atualizada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao atualizar movimentação" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await movimentacaoMesService.delete(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "movimentação deletada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao deletar movimentação" });
    }
  }
}

export default new MovimentacaoMesController();
