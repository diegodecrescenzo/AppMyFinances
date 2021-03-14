//Criação da Despesa
class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	//Metodo de Validação de Dados da Despesa
	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == null || this[i] == ''){
				return false
			}			
		}

		return true
	}
}

// Banco de Dados. LocalStorage do Chrome.
class Bd {

	constructor(){
		let id = localStorage.getItem('id')

		if(id === null){
			localStorage.setItem('id', 0)
		}
	}

	//Metodo de geração automatica do ID da despesa.
	getproximoId(){
		let proximoId = localStorage.getItem('id')
		return Number(proximoId) + 1
	}

	//Metodo de gravação de Despesas.
	gravarDespesa(d){
		
		let id = this.getproximoId()

		localStorage.setItem( id, JSON.stringify(d))

		localStorage.setItem('id', id)		
	}

	//Recuperação de Despesas.
	recuperarDespesas(){

		let despesas = Array()

		let id = localStorage.getItem('id')

		for(let i = 1; i <= id ; i++){

			let despesa = JSON.parse(localStorage.getItem(i))

			if(despesa === null){
				continue
			}
			
			despesa.id = i
			despesas.push(despesa)
		}	

		return despesas
	}

	//Metodo de Pesquisa de Despesas.
	pesquisar(despesa){

		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarDespesas()

		console.log(despesasFiltradas)
		//console.log(despesa)

		//ano
		if(despesa.ano != ''){
			console.log('Filtro do ano')
			despesasFiltradas =  despesasFiltradas.filter(v => v.ano == despesa.ano)
		}
		//mes
		if(despesa.mes != ''){
		console.log('Filtro do mes')			
			despesasFiltradas =  despesasFiltradas.filter(v => v.mes == despesa.mes)
		}
		//dia		
		if(despesa.dia != ''){
			console.log('Filtro do dia')
			despesasFiltradas =  despesasFiltradas.filter(v => v.dia == despesa.dia)
		}
		//tipo
		if(despesa.tipo != ''){
			console.log('Filtro do tipo')
			despesasFiltradas =  despesasFiltradas.filter(v => v.tipo == despesa.tipo)
		}
		//descricao
		if(despesa.descricao != ''){
			console.log('Filtro do descricao')
			despesasFiltradas =  despesasFiltradas.filter(v => v.descricao == despesa.descricao)
		}
		//valor
		if(despesa.valor != ''){
			console.log('Filtro do valor')
			despesasFiltradas =  despesasFiltradas.filter(v => v.valor == despesa.valor)
		}

		console.log(despesasFiltradas)

		return despesasFiltradas
	}

	//Metodo de Remoção de Despesas
	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

// Cadastrar Despesas
function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')


	let despesa = new Despesa(ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value)


// Validação dos Dados do Formulario
if(despesa.validarDados()){
	bd.gravarDespesa(despesa)	

		$('#registroGravacao').modal('show')

		document.getElementById('titulo').className = 'modal-header text-success'
		document.getElementById('exampleModalLabel').innerHTML = 'Despesa Inserida'
		document.getElementById('corpo').innerHTML = 'O Registro da despesa foi inserido com sucesso!'
		document.getElementById('botao').className = 'btn btn-success'
		document.getElementById('botao').innerHTML = 'Voltar'

		ano.value = ''
		ano.className = 'form-control'
		mes.value = ''
		mes.className = 'form-control'
		dia.value = ''
		dia.className = 'form-control'
		tipo.value = ''
		tipo.className = 'form-control'
		descricao.value = ''
		descricao.className = 'form-control' 
		valor.value = ''
		valor.className = 'form-control'



	} else {

		if(ano.value == ''){
			ano.className = "form-control is-invalid"
		}

		if(mes.value == ''){
			mes.className = "form-control is-invalid"
		}

		if(dia.value == ''){
			dia.className = "form-control is-invalid"
		}

		if(tipo.value == ''){
			tipo.className = "form-control is-invalid"
		}

		if(descricao.value == ''){
			descricao.className = "form-control is-invalid"
		}

		if(valor.value == ''){
			valor.className = "form-control is-invalid"
		}

		$('#registroGravacao').modal('show')

		document.getElementById('titulo').className = 'modal-header text-danger'
		document.getElementById('exampleModalLabel').innerHTML = 'Erro na gravação!'
		document.getElementById('corpo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos!'
		document.getElementById('botao').className = 'btn btn-danger'
		document.getElementById('botao').innerHTML = 'Corrigir'

	}
}

// Listar Despesas
function listarDespesas(despesas = Array(), filtro = false){

	if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarDespesas()
	}

	let lista = document.getElementById('listaDespesas')
	lista.innerHTML = ''

	despesas.forEach(function(d){
		
		let linha = lista.insertRow()

		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//botao excluir
		let botao = document.createElement("button")
		botao.className = 'btn btn-danger'
		botao.innerHTML = '<i class="fas fa-times"></i>'
		botao.id = d.id
		botao.onclick = function(){

		
		bd.remover(d.id)
		window.location.reload()		

		}
		linha.insertCell(4).append(botao)

	})	
}

//Pesquisar Despesas
function pesquisarDespesa(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

	let despesas = bd.pesquisar(despesa)

	listarDespesas(despesas, true)
	
}

// Pesquisar o Total que foi gasto.
function pesquisarTotal(){
	let total = bd.recuperarDespesas()
	console.log(total)

	document.getElementById('tabela').remove()

	let valor = total.reduce((valor,total) => valor + Number(total.valor), 0)

	console.log(valor)

	//let linha = lista.insertRow()

	//linha.insertCell(0).innerHTML = `O total das Despesas até agora é: ${valor} euros`	

	document.getElementById('banner')
	banner.innerHTML = `O total das Despesas até agora é: ${valor} euros`
	banner.style.color = '#585858'

	let dinheiro = document.createElement("img")
	dinheiro.src = 'dinheiro.png'
	dinheiro.style.width = 150 + 'px'
	dinheiro.className = 'mt-3'

	document.getElementById('foto').appendChild(dinheiro)

}
