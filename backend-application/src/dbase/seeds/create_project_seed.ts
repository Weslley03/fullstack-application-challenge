import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex('modalidade').del();
    await knex('tipo_curso').del();
    await knex('curso').del();

    await knex("modalidade").insert([
        { id: 1, modalidade_name: "Graduação" },
        { id: 2, modalidade_name: "Pós Graduação" },
    ]);

    await knex("tipo_curso").insert([
        { id: 1, tipo_curso_name: "Presencial" },
        { id: 2, tipo_curso_name: "EAD" },
    ]);

    await knex("curso").insert([
        { 
            id: 1, 
            curso_name: "Medicina",
            tipo_curso_id: 1,
            modalidade_id: 1,
            curso_valor: 10000,
            curso_mensalidade: 72,
        },

        { 
            id: 2, 
            curso_name: "Odontologia",
            tipo_curso_id: 1,
            modalidade_id: 1,
            curso_valor: 7000,
            curso_mensalidade: 48,
        },

        { 
            id: 3, 
            curso_name: "Admnistração",
            tipo_curso_id: 1,
            modalidade_id: 1,
            curso_valor: 3500,
            curso_mensalidade: 48,
        },

        { 
            id: 4, 
            curso_name: "Admnistração",
            tipo_curso_id: 1,
            modalidade_id: 2,
            curso_valor: 800,
            curso_mensalidade: 48,
        },

        { 
            id: 5, 
            curso_name: "Ciências Contábeis",
            tipo_curso_id: 1,
            modalidade_id: 1,
            curso_valor: 1000,
            curso_mensalidade: 48,
        },

        { 
            id: 6, 
            curso_name: "Ciências Contábeis",
            tipo_curso_id: 1,
            modalidade_id: 2,
            curso_valor: 800,
            curso_mensalidade: 48,
        },

        { 
            id: 7, 
            curso_name: "Análise de sistemas",
            tipo_curso_id: 1,
            modalidade_id: 1,
            curso_valor: 1200,
            curso_mensalidade: 48,
        },

        { 
            id: 8, 
            curso_name: "Análise de sistemas",
            tipo_curso_id: 1,
            modalidade_id: 2,
            curso_valor: 400,
            curso_mensalidade: 48,
        },

        { 
            id: 9, 
            curso_name: "DevOps ",
            tipo_curso_id: 2,
            modalidade_id: 1,
            curso_valor: 800,
            curso_mensalidade: 24,
        },

        { 
            id: 10, 
            curso_name: "Gestão de Recursos Humanos ",
            tipo_curso_id: 2,
            modalidade_id: 1,
            curso_valor: 600,
            curso_mensalidade: 24,
        },
    ]);
};
