import movimentacaoMesRepository from "../repository/movimentacaoMesRepository";

class MovimentacaoMesService{

    //funciona como uma especie de like
    async search(term, page, perPage){
        return await movimentacaoMesRepository.find({'title' : new RegExp('.*' + term + '*.', 'i')})
        //paginação
        .skip((page - 1) * perPage)
        .limit(perPage)
        ;
    }

    async get(){
        return await movimentacaoMesRepository.find({});}

    async getByID(_id){
        return await movimentacaoMesRepository.findById(_id);
    }

    async create(news){
        return await movimentacaoMesRepository.create(news);
    }

    async update(_id,news){
        return await movimentacaoMesRepository.findByIdAndUpdate(_id,news);
    }

    async delete(_id){
        return await movimentacaoMesRepository.findByIdAndDelete(_id);
    }
}

export default new MovimentacaoMesService();