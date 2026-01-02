import pedidoVendaRepository from "../repository/pedidoVendaRepository";

class PedidoVendaService{

    //funciona como uma especie de like
    async search(term, page, perPage){
        return await pedidoVendaRepository.find({'title' : new RegExp('.*' + term + '*.', 'i')})
        //paginação
        .skip((page - 1) * perPage)
        .limit(perPage)
        ;
    }

    async get(){
        return await pedidoVendaRepository.find({});}

    async getByID(_id){
        return await pedidoVendaRepository.findById(_id);
    }

    async create(pedido){
        return await pedidoVendaRepository.create(pedido);
    }

    async update(_id,pedido){
        return await pedidoVendaRepository.findByIdAndUpdate(_id,pedido);
    }

    async delete(_id){
        return await pedidoVendaRepository.findByIdAndDelete(_id);
    }
}

export default new PedidoVendaService();