/* eslint-disable react/prop-types, react/no-multi-comp,
 no-eval, no-nested-ternary */

import './App.css';
import React, { Component } from 'react'

// Componentes Botones Numeros
function Button(props) {
  return (
    <div>
      <button
        id={props.id}
        className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => props.action(props.tag)}
      >
        {props.tag}
      </button>
    </div>
  )
}

// Expresion regulares
const isNumeric = /[0-9]/;
const isOperator = /[+\-*/]/;
const isDot = /[.]/;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      operation: '',
      display: '0',
      countOperator: 0
    }

    this.addChar = this.addChar.bind(this);
    this.clear = this.clear.bind(this);
    this.equals = this.equals.bind(this);

  }

  addChar(char) {
    /* operation: donde se ve la formula */
    /* display: donde se muestra el numero o operator pulsado */

    // es numero
    if (isNumeric.test(char)) {
      // hay un cero inicial en display?, lo sobreescribimos y enviamos valor a operation
      if (this.state.display === '0') {
        this.setState({
          display: char,
          operation: char,
        })
      }
      // hay operadores en display previo? lo sobreescribimos y contatemos nuevo valor a operation
      else if (isOperator.test(this.state.display)) {
        this.setState({
          display: char,
          operation: this.state.operation + char,
        })
      }
      // sino hay excepciones, concatenamos el siguiente caracter, tanto display como en operation
      else {
        this.setState({
          display: this.state.display + char,
          operation: this.state.operation + char
        })
      }
    }

    // es operador (+ - * /)
    if (isOperator.test(char)) {

      // si ya existe caracter operator en display
      // evitamos duplicados y actualizamos
      
      if( isOperator.test(this.state.display) ){

        // capturamos previo operador
        let prevOper = this.state.operation.slice(-1);
        let operation = this.state.operation; // por defecto la operacion se mantiene
        let countOper = 0 // contador de operadores extra

        if( prevOper !== char){ // si el operador previo es distinto de nuevo, cambiamos operador en la operacion
          operation = this.state.operation.slice(0, this.state.operation.length -1);
          // // añadimos contador de operador
        }else{
          return false // si operador previo igual que el anterio, no hacemos nada
        }

        // si el operador es negativo
        if( char === "-" ){
          operation = this.state.operation;
          countOper = this.state.countOperator + 1
        }

        // si hay mas de un caracter extra
        if( this.state.countOperator >= 1){
          // retiramos los caracteres extra, en la operacion
          operation = this.state.operation.slice(0, this.state.operation.length -2)
          
        }

        this.setState({
          display: char,
          operation: operation+char, // añadimos a la operacion en operador
          countOperator: countOper
        })
      // no existe caracter operador previo
      // concatenamos normal
      }else{
        this.setState({
          display: char,
          operation: this.state.operation + char,
          countOperator: 0
        })
      }
    }

    // es punto
    if (isDot.test(char)){

      // hay punto de mas en display
      if(isDot.test(this.state.display)) return false

      // si hay 0, en display
      if( this.state.display === '0'){

        if( this.state.operation === '0'){
          this.setState({
            display: '0.',
            operation: this.state.operation + char
          })
        }else{
          let char = '0.';
          this.setState({
            display: char,
            operation: this.state.operation + char
          })
        }
        
      }
      // si hay numero en display
      if (isNumeric.test( this.state.display )) {
        this.setState({
          display: this.state.display + char,
          operation: this.state.operation + char
        })
      }

      // si hay operador en display
      if (isOperator.test( this.state.display )) {
        let char = '0.';
        this.setState({
          display: char,
          operation: this.state.operation + char
        })
      }

    }
  }

  clear() {
    this.setState({
      display: '0',
      operation: '',
      countOperator: 0
    })
  }

  equals() {
    let result = eval(this.state.operation);
    this.setState({
      display: result,
      operation: result,
      countOperator: 0
    })
  }

  render() {
    return (
      <div className="calculator">
        <span>{this.state.countOperator}</span>
        <div className='big-display'>
          <div id="operation" className="operation text-right">{this.state.operation}</div>
          <div id="display" className="display text-right">{this.state.display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 my-2">
          <Button id="seven" tag="7" action={this.addChar} />
          <Button id="eight" tag="8" action={this.addChar} />
          <Button id="nine" tag="9" action={this.addChar} />
          <Button id="divide" tag="/" action={this.addChar} />

          <Button id="four" tag="4" action={this.addChar} />
          <Button id="five" tag="5" action={this.addChar} />
          <Button id="six" tag="6" action={this.addChar} />
          <Button id="multiply" tag="*" action={this.addChar} />

          <Button id="one" tag="1" action={this.addChar} />
          <Button id="two" tag="2" action={this.addChar} />
          <Button id="three" tag="3" action={this.addChar} />
          <Button id="subtract" tag="-" action={this.addChar} />

          <Button id="clear" tag="AC" action={this.clear} />
          <Button id="zero" tag="0" action={this.addChar} />
          <Button id="decimal" tag="." action={this.addChar} />
          <Button id="add" tag="+" action={this.addChar} />
        </div>
        <Button id="equals" tag="=" action={this.equals} />
      </div>
    )
  }
}

export default App