const readline = require('readline-sync');

let universidade = [];
let lista = [];
let proximoId = 1;
let proximoIdcursos = 1;
let i = true;

function menu() {
    console.log('=== menu ===');
    console.log('1 - inserir faculdade');
    console.log('2 - listar faculdades');
    console.log('3 - excluir faculdade');
    console.log('4 - alterar faculdade');
    console.log('5 - sair do programa');
    console.log('6 - ir para cursos das universidades');
}

function createFaculdade() {
    let nome = readline.question('insira o nome da faculdade: ');
    let localizacao = readline.question('insira a localizacao da faculdade: ');

    let faculdade = {
        id: proximoId++,
        nome: nome,
        localizacao: localizacao,
        cursos: [] 
    };
    universidade.push(faculdade);
    console.log('faculdade cadastrada!');
}

function readFaculdade() {
    if (universidade.length === 0) {
        console.log('nenhuma faculdade cadastrada.');
        return;
    }

    universidade.forEach((faculdade, index) => {
        console.log(`${index + 1}. universidade: ${faculdade.nome} - localizacao: ${faculdade.localizacao}`);
    });
}

function deleteFaculdade() {
    let nome = readline.question('insira o nome da faculdade a ser excluída: ');
    let index = universidade.findIndex(faculdade => faculdade.nome === nome);

    if (index !== -1) {
        universidade.splice(index, 1);
        console.log('faculdade excluída com sucesso!');
    } else {
        console.log('faculdade nao encontrada.');
    }
}

function updateFaculdade() {
    let nome = readline.question('insira o nome da faculdade a ser alterada: ');
    let index = universidade.findIndex(faculdade => faculdade.nome === nome);

    if (index !== -1) {
        let novoNome = readline.question('insira o novo nome da faculdade: ');
        let novaLocalizacao = readline.question('insira a nova localizacao da faculdade: ');

        universidade[index].nome = novoNome;
        universidade[index].localizacao = novaLocalizacao;

        console.log('faculdade alterada com sucesso!');
    } else {
        console.log('faculdade nao encontrada.');
    }
}

function menu2(faculdadeSelecionada) {
    console.log(`=== menu da ${faculdadeSelecionada.nome} ===`);
    console.log('1 - inserir curso na universidade');
    console.log('2 - listar cursos da universidade');
    console.log('3 - alterar curso da universidade');
    console.log('4 - deletar curso da universidade');
    console.log('5 - sair do menu de cursos');
}

function createCurso(faculdadeSelecionada) {
    let nomeCurso = readline.question('insira o nome do curso: ');
    let descricaoCurso = readline.question('insira a descricao do curso: ');

    let curso = {
        nomeCurso: nomeCurso,
        descricaoCurso: descricaoCurso,
        idCurso: proximoIdcursos++
    };

    faculdadeSelecionada.cursos.push(curso);
    console.log('curso cadastrado!');
}

function readCursos(faculdadeSelecionada) {
    if (faculdadeSelecionada.cursos.length === 0) {
        console.log('nenhum curso cadastrado.');
        return;
    }

    faculdadeSelecionada.cursos.forEach((curso, index) => {
        console.log(`${index + 1}. curso: ${curso.nomeCurso} - descricao: ${curso.descricaoCurso}`);
    });
}

function deleteCurso(faculdadeSelecionada) {
    let nome = readline.question('insira o nome do curso a ser excluido: ');
    let index = faculdadeSelecionada.cursos.findIndex(curso => curso.nomeCurso === nome);

    if (index !== -1) {
        faculdadeSelecionada.cursos.splice(index, 1);
        console.log('curso excluido com sucesso!');
    } else {
        console.log('curso nao encontrado.');
    }
}

function updateCurso(faculdadeSelecionada) {
    let nome = readline.question('insira o nome do curso a ser alterado: ');
    let index = faculdadeSelecionada.cursos.findIndex(curso => curso.nomeCurso === nome);

    if (index !== -1) {
        let novoNomeCurso = readline.question('insira o novo nome do curso: ');
        let novaDescricaoCurso = readline.question('insira a nova descricao do curso: ');

        faculdadeSelecionada.cursos[index].nomeCurso = novoNomeCurso;
        faculdadeSelecionada.cursos[index].descricaoCurso = novaDescricaoCurso;

        console.log('curso alterado com sucesso!');
    } else {
        console.log('curso nao encontrado.');
    }
}

while (i) {
    menu();

    let opcao = parseInt(readline.question('escolha uma das opcoes acima: '));

    switch (opcao) {
        case 1:
            createFaculdade();
            break;
        case 2:
            readFaculdade();
            break;
        case 3:
            deleteFaculdade();
            break;
        case 4:
            updateFaculdade();
            break;
        case 5:
            i = false;
            console.log('programa finalizado!');
            break;
        case 6:
            if (universidade.length === 0) {
                console.log('nenhuma faculdade cadastrada.');
                break;
            }

            readFaculdade();
            let op = parseInt(readline.question('insira o numero da universidade que deseja usar: '));

            if (op < 1 || op > universidade.length) {
                console.log('numero da universidade invalido.');
                break;
            }

            let faculdadeSelecionada = universidade[op - 1];

            let j = true;
            while (j) {
                menu2(faculdadeSelecionada);

                let opcao2 = parseInt(readline.question('escolha uma das opcoes acima: '));

                switch (opcao2) {
                    case 1:
                        createCurso(faculdadeSelecionada);
                        break;
                    case 2:
                        readCursos(faculdadeSelecionada);
                        break;
                    case 3:
                        updateCurso(faculdadeSelecionada);
                        break;
                    case 4:
                        deleteCurso(faculdadeSelecionada);
                        break;
                    case 5:
                        j = false;
                        break;
                    default:
                        console.log('opcao nao encontrada, tente novamente.');
                        break;
                }
            }
            break;
        default:
            console.log('opcao nao encontrada, tente novamente.');
            break;
    }
}
