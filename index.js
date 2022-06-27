
function incluir(){

  try {if(document.querySelector('#name').value == "") throw `Falha no cadastro do produto!`;}
  catch(err) {return data.innerHTML =  err;}

  if(produtos.length == 0){x=0;}else{x=(produtos[produtos.length-1].id)+1;}
  produto={'id':x,
    'name':document.querySelector('#name').value,
    'description':document.querySelector('#des').value,
    'value':document.querySelector('#value').value,
    'include':new Date().getTime()};

  produtos.push(produto);

  return data.innerHTML = `Produto ${produto.name} incluído com sucesso!`;
  
}

function listar(){
  table="<table><tr><th>ID</th><th onclick='ordenar_letra(0)'>Produto</th><th onclick='ordenar_letra(1)'>Valor</th><th>Editar</th><th>Apagar</th></tr>";fin="</table>";
  if(produtos.length==0){return data.innerHTML = table+fin;}
  
  linha="";

  produtos.forEach(function(index){
    linha += "<tr><td>"+index['id']+"</td><td onclick='info("+index['id']+")'>"+index['name']+"</td><td>"+index['value']+"</td><td><img src='./img/edit.png' onclick='edit("+index['id']+")'></td><td><img src='./img/delete.png' onclick='del("+index['id']+")'></td></tr>";
  });
  return data.innerHTML = table+linha+fin;
}




function info(dado){
  produtos.forEach(function(item,index){if(item['id']==dado){dado=index;}});

  produto = produtos[dado];
  div="";
  div+="<div>ID:"+produto.id+"</div><div>NOME:"+produto.name+"</div><div>DESCRIÇÃO:"+produto.description+"</div><div>VALOR:"+produto.value+"</div>";

  horas = new Date(produto.include);

  div+="<div>INCLUIDO EM:"+horas.toLocaleDateString()+" - "+horas.getHours()+":"+horas.getMinutes()+":"+horas.getSeconds()+"</div>";
  return data.innerHTML = div;
}

function edit(dado){
  produtos.forEach(function(item,index){if(item['id']==dado){dado=index;}});
  produto = produtos[dado];
  div="";
  div+="<div>ID:"+produto.id+"</div><div>NOME:<input type='text' value='"+produto.name+"' id='name_save'></div><div>DESCRIÇÃO:<input type='text' value='"+produto.description+"' id='des_save'></div><div>VALOR:<input type='text' value='"+produto.value+"' id='value_save'></div>";
  

  horas = new Date(produto.include);

  div+="<div>INCLUIDO EM:"+horas.toLocaleDateString()+" - "+horas.getHours()+":"+horas.getMinutes()+":"+horas.getSeconds()+"</div><div><button class='but' onclick='save_edit("+dado+")'>Editar</button></div>";
  return data.innerHTML = div;
}

function save_edit(dado){

  nome=document.querySelector('#name_save').value;
  des=document.querySelector('#des_save').value;
  value=document.querySelector('#value_save').value;
  produtos[dado]={'id':dado,
    'name':nome,
    'description':des,
    'value':value,
    'include':produtos[dado]['include']};
  listar();
}

function del(dado){
  produtos.forEach(function(item,index){if(item['id']==dado){dado=index;}});
  produtos = produtos.slice(0, dado).concat(produtos.slice(dado + 1))
  listar();
}

function ordenar_letra(aim){
  table="<table><tr><th>ID</th><th onclick='ordenar_letra(0)'>Produto</th><th onclick='ordenar_letra(1)'>Valor</th><th>Editar</th><th>Apagar</th></tr>";fin="</table>";
  if(produtos.length==0){return data.innerHTML = table+fin;}
  if(aim==0){ordenar = Array.from(produtos).sort((a, b) => {return a['name'].localeCompare(b['name'], 'en', { sensitivity: 'base' });});}else{ordenar = Array.from(produtos).sort((a, b) => {return a['value']>b['value'];});}

  linha="";
  ordenar.forEach(function(index){
    linha += "<tr><td>"+index['id']+"</td><td onclick='info("+index['id']+")'>"+index['name']+"</td><td>"+index['value']+"</td><td><img src='./img/edit.png' onclick='edit("+index['id']+")'></td><td><img src='./img/delete.png' onclick='del("+index['id']+")'></td></tr>";
  });
  return data.innerHTML = table+linha+fin;
  
}


function busca(){
  buscador=document.querySelector('#buscador').value;
  resultados=produtos.filter(function (item){return item['name'].toLowerCase().indexOf(buscador.toLowerCase()) > -1 || item['description'].toLowerCase().indexOf(buscador.toLowerCase()) > -1;});
  
  try {if(resultados.length==0) throw `Não foram encontrados produtos conforme chave de pesquisa!`;}
  catch(err) {return data.innerHTML =  err;}
  if(buscador==''){return listar();}

  numeroDeProdutos=resultados.length;
  table=`Foram encontrado(s) ${numeroDeProdutos}`+"<table><tr><th>ID</th><th onclick='ordenar_letra(0)'>Produto</th><th onclick='ordenar_letra(1)'>Valor</th><th>Editar</th><th>Apagar</th></tr>";
  fin="</table>";
  if(produtos.length==0){
    return data.innerHTML = table+fin;
  }

  linha="";
  for(i=0;i < resultados.length;i++) {
    linha += "<tr><td>"+resultados[i]['id']+"</td><td onclick='info("+resultados[i]['id']+")'>"+resultados[i]['name']+"</td><td>"+resultados[i]['value']+"</td><td><img src='./img/edit.png' onclick='edit("+resultados[i]['id']+")'></td><td><img src='./img/delete.png' onclick='del("+resultados[i]['id']+")'></td></tr>";
  }
  return data.innerHTML = table+linha+fin;

}

function back(){
al = document.querySelector('#all');
array = ['https://img.freepik.com/vetores-gratis/wallpaper-de-paisagem-em-design-plano_74890-34.jpg?w=2000',
'https://www.10wallpaper.com/wallpaper/1366x768/1610/Canada_Harrison_Lake_Beautiful_Landscape_Wallpaper_13_1366x768.jpg',
'https://images7.alphacoders.com/423/423348.jpg'];
x = parseInt(Math.random()*3)
al.style.background = "url('"+array[x]+"')";
}

window.onload = function(){
back();


data = document.querySelector('#data');
produtos = [];
produto=[];
};


