import topProdutosRepository from "../repository/topProdutosRepository";

class TopProdutosService{

    //funciona como uma especie de like
    async search(term, page, perPage){
        return await topProdutosRepository.find({'title' : new RegExp('.*' + term + '*.', 'i')})
        //paginação
        .skip((page - 1) * perPage)
        .limit(perPage)
        ;
    }

    async get(){
        return await topProdutosRepository.find({});
        //se quiser buscar informações mais especificas, use o exemplo abaixo:
        //return await TopProdutosRepository.find({ 'active' : true });
        //active é o nome de um dos campos

        //nesse caso, você pode restringir os campos que irão aparecer
        //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img');

        //ordenar por data, do mais novo
        //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img publishDate').sort( publishDate: -1 );

        //limitar quantidade de registros
        //return await TopProdutosRepository.find({ 'active' : true }, 'title hat img publishDate').sort( publishDate: -1 ).limit(2);

        //se quiser buscar informações entre duas datas
        //let startDate = new Date("2019-01-01T00:00:00:000Z");
        //let endDate = new Date("2019-03-01T00:00:00:000Z");
        //return await TopProdutosRepository.find({ 'publishDate' : { $gt: startDate, $lt: endDate } });
    }

    async getByID(_id){
        return await topProdutosRepository.findById(_id);
    }

    async create(news){
        return await topProdutosRepository.create(news);
    }

    async update(_id,news){
        return await topProdutosRepository.findByIdAndUpdate(_id,news);
    }

    async delete(_id){
        return await topProdutosRepository.findByIdAndDelete(_id);
    }
}

export default new TopProdutosService();