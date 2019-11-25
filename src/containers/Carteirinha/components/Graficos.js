import React, { Component } from 'react';

import LineChart from '../../../components/LineChart';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
export class Graficos extends Component {
  
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if(this.props.currentUser){
            this.props.fetchMedidas(this.props.currentUser.id);
        }
    }

    render() {
        let weight = (this.props.measureDatas || []).map((row)=>{
            let res = {
                peso: row.weight,
                name: moment(row.date).format("DD/MM/YYYY"),
                media: row.weight
            };
            return res;
        }); 
    
        let height = (this.props.measureDatas || []).map((row)=>{
            let res = {
                height: row.height,
                name: moment(row.date).format("DD/MM/YYYY"),
                media: row.height
            };
            return res;
        });

        return (
            <React.Fragment>
            <h3>Gráfico peso X idade</h3>
            <LineChart isFetching={this.props.isFetching.medidas} data={weight} className="weight-chart"/><br/><br/>
            <h3>Gráfico altura X idade</h3>
            <LineChart isFetching={this.props.isFetching.medidas} data={height} height className="weight-chart"/>
            </React.Fragment>
        );
    }
}
export default connect((store) => ({ 
    currentUser: store.carteirinha.currentUser,
    measureDatas: store.carteirinha.measureDatas,
    isFetching: store.carteirinha.isFetching
  }), actions)(Graficos);