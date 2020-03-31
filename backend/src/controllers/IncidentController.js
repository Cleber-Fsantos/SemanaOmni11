const connection = require('../database/connection');

module.exports = {
    async index(request, response){  
        //Pagina principal é igual a 1 se não for passada por parametros de QUERY [?]
        const { page = 1} = request.query;

        //Query que retorna o numeros de CASOS registrados
        const [count]  = await connection('incidents').count();

        //Query com limitador de paginas por 5
        const incidents = await connection('incidents')
        //Join responsavel por contatenar os dados da tabela Ong com os incidentes
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*', 
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf'
        ]);
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);

    },


    async create(request, response){
        const {title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select ('ong_id')
        .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection ('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};