import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import axios from 'axios';

const readExcel = (file) => {
  const promise = new Promise((resolve, reject) => {
    
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      
      const wsname = wb.SheetNames;              // lista com o nome das folhas
      const ws_list = wsname.map((ws) => {       // lista com os conteúdos das folhas 
        const data = wb.Sheets[ws];              // Conteúdo de uma folha
        return XLSX.utils.sheet_to_json(data);; 
      })

      resolve([ws_list, wsname])
    };
    
    fileReader.onerror = (error) => {reject(error);};

  });
  
  promise.then((params) => {
    
    var ws_list = params[0]
    var wsname = params[1]
    
    ws_list.map((lista_insumo, index) => ( //Inserindo o nome da folha nos insumos 
      lista_insumo.map( insumo => (
        insumo.sheet  = wsname[index]
      ))
    ))
  
    var auxArray = [];
    for (var j = 0; j <= ws_list.length ; j++ ) { auxArray = auxArray.concat(ws_list[j])};
  
    console.log('log 2')
    console.log(auxArray)
    console.log(ws_list)

    return(auxArray);
  })
  .then((auxArray) => {

    var document = {...auxArray.map(item => item)}
    var payload = [];
    Object.keys(document).forEach( key =>{
      try{payload.push({
        'partnumber'   : document[key]['Item No'],
        'descripition' : document[key]['Description'],
        'price'        : document[key]['Price'],
        'sheet'        : document[key]['sheet']
      })}
      catch{payload.push({undefined})}
    })
    return(payload)
  })
  .then(payload =>{

    console.log('log 3 -- before json transformation')
    console.log(payload)
    
    axios.post('http://localhost:5000/insumo', payload,{
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
    .then(response => {console.log(response.status)})

    /*  
    fetch('http://localhost:5000/insumo',{
      method: 'Post',
      cache: 'no-cache',
      headers:{
        'content_type':'application/json'
      },
      body:JSON.stringify(payload)
    }).then(response => {console.log(response.status)})
    */
  }) 
}


const Blank = () => (
  <React.Fragment>
    <Helmet title="Blank Page" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Blank Page</h1>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title tag="h5" className="mb-0">
                
                <div> 
                  <input  type = "file"  onChange = {(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                  }} /> 
                </div>
                
              </Card.Title>
            </Card.Header>
            <Card.Body>&nbsp;</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default Blank;