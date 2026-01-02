import topProdutosService from "../services/topProdutosService";
import * as HttpStatus from "http-status";
import Redis from "../infra/redis";
import Helper from "../infra/helper";

class TopProdutosController {

  async get(req, res) {
    try {
      const cacheKey = "topProdutos";

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

      const response = await topProdutosService.get();

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
        .json({ error: "Erro ao buscar Top-Produtos" });
    }
  }

async search(req, res) {
    try {
      const term = req.params.term;

      const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
      const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 1;

      const response = await topProdutosService.search(term, page, perPage);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar Top-Produto" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const response = await topProdutosService.getByID(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        response
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao buscar Top-Produto" });
    }
  }

  async create(req, res) {
    try {
      const vm = req.body;
      await topProdutosService.create(vm);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "Top-Produto cadastrada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao criar Top-Produto" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const news = req.body;

      await topProdutosService.update(id, news);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "Top-Produto atualizada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao atualizar Top-Produto" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await topProdutosService.delete(id);

      return Helper.sendResponse(
        res,
        HttpStatus.status.OK,
        "Top-Produto deletada com sucesso!"
      );
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.status.INTERNAL_SERVER_ERROR)
        .json({ error: "Erro ao deletar Top-Produto" });
    }
  }
}

export default new TopProdutosController();
