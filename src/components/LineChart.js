import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default class Carteirinha extends Component {
  
    constructor(props){
        super(props);
        this.state = {};
    }
	render () {
    var key = {name: "Peso", key:"peso"};
    if(this.props.height){
      key = {
        name: "Altura",
        key:"height"
      }
    }
    var classes = (this.props.className) ? this.props.className: '';
    console.log(this.props.isFetching, 'is f')
  	return (
      <div className='grafico'> 
      <ResponsiveContainer width={"100%"} height={400} className={classes}>
        <LineChart data={this.props.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" strokeWidth={3} dataKey="media" name='Média' stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" strokeWidth={3} dataKey={key.key} name={key.name} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}


const data = [
    {name: '1 mês', peso: 4000, pesoMedia: 4200 },
    {name: '2 mês', peso: 4800, pesoMedia: 5000},
    {name: '3 mês', peso: 5300, pesoMedia: 5700},
    {name: '4 mês', peso: 6300, pesoMedia: 6300 },
    {name: '5 mês', peso: 7000, pesoMedia: 6900},
    {name: '6 mês', peso: 7759, pesoMedia: 7500 },
    {name: '7 mês', peso: 8500, pesoMedia: 8000 },
];