import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
//import axios from 'axios'
import Select from "react-select";

const InputModule = ({props}) => {
  
  const initialFormState = {  
    isDisabled: true,
    isLoading: false,
  }

  const loadingFormState = {  
    isDisabled: true,
    isLoading: true,
  }

  const readyFormState = {  
    isDisabled: false,
    isLoading: false,
  }

  const [formState, setFormState] = useState(initialFormState)
  const [selectedOptions, setSelectedOptions] = useState([])

  const ReadExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      setFormState(loadingFormState)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames;              // lista com o nome das folhas
        const ws_list = wsname.map((ws) => {       // lista com os conteúdos das folhas 
          const data = wb.Sheets[ws];              // Conteúdo de uma folha
          return XLSX.utils.sheet_to_json(data);; 
        })
        resolve([ws_list, wsname])
      }
      fileReader.onerror = (error) => {reject(error);};
    });
    promise.then((params) => {
  
      var ws_list = params[0]
      var wsname = params[1]
      const labels = []

      ws_list.map(lista_insumo => labels.push(...Object.keys(lista_insumo[0]))) // labels = lista com o nome das colunas 
      const unique_labels = labels.filter((value, index, self) =>  {return self.indexOf(value) === index }) //elementos unicos da lista
      
      const labelOptions = unique_labels.map( element => ( //Right Format to the multiSelect
        {value : element, label : element}
      )) 

      props.labelsSetter(labelOptions)
      setFormState(readyFormState)
    
      //Log
      console.log('log y')
      console.log(unique_labels)

      ws_list.map((lista_insumo, index) => ( //Inserindo o nome da folha nos insumos 
        lista_insumo.map( insumo => (
          insumo.sheet  = wsname[index]
        ))
      ))
  
      var auxArray = [];
      for (var j = 0; j <= ws_list.length ; j++ ) { auxArray = auxArray.concat(ws_list[j])};
    
      //Log
      console.log('log 1')
      console.log(ws_list)
      console.log(auxArray)
    
      return(auxArray);
    })

    .then((auxArray) => {

    
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



    /*
    .then(payload =>{

      axios.post('http://localhost:5000/insumo', payload,{
        headers : {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        }
      }).then(response => {console.log(response.status)})
    }) 
    */

  }


  return(
  <Card>
    <Card.Header>
      <Card.Title>Import Supermicro Data</Card.Title>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col lg = "6">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Excel input</Form.Label>
              <Form.Control type="file" name="file" onChange={ e => { 
                const file = e.target.files[0];
                ReadExcel(file);
              }}/>
              <Form.Text className="text-muted">
                The file must be in .xlsx format.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Multi Select</Form.Label>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={props.labels}
                onChange = {item => setSelectedOptions(item)}
                isDisabled={formState.isDisabled}
                isLoading={formState.isLoading}
                isSearchable = {true}
                isMulti
              />
            </Form.Group>
            <br></br>
            <Button variant="primary">Submit</Button>

          </Form>      
        </Col>
      </Row>  
    </Card.Body>
  </Card>
  )

};


const Blank = () => {

  const [labelColumns, setLabelColumns] = useState([])

  const labelColumnsSetter = labels => (setLabelColumns(labels))

  return(
    <React.Fragment>
    <Helmet title="Form Layouts" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Form Layouts</h1>
            <InputModule props = {{labels : labelColumns, labelsSetter : labelColumnsSetter}}/>
      </Container>
    </React.Fragment>
  )

};

export default Blank;





/*  Preciso considerar o cenario onde o usuario clica no botao e */




/*Please, be sure your columns labels (header) are on the first line of the excel f
ile*/


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
  







/*O tratamento de erro  no multiselect, o cliente deve escolher 3, apenas 3 colunas. */ 