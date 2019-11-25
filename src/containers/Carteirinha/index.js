import React, { Component } from 'react';
import Calendar from "../../components/Calendar.js";
import logo from '../../images/vacininha.png';
import ChildRoutes from '../../core/ChildRoutes'; 

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

export class Carteirinha extends Component {
  
    constructor(props){
        super(props);
        this.state = {
          isOpen: false
        };
        if (props.beforeReturn) props.beforeReturn(props);
    }

    handleClickLabel(label) {
        this.props.history.push(`/carteirinha/${label}`);
    } 

    componentDidMount(){ 
      this.props.checkLogin().then((res) => {  
        if(!res || res === 0){
          this.props.history.push(`/carteiras`);
        }else if(!this.props.currentUser){ 
          this.props.fetchCarteirinhas().then(() =>{
            var user = (this.props.carteirinhasData||[]).find(user => user.id == res);
            this.props.changeUser(user);
          });
        }
      })
      
  	}

    handleLogout() {
        this.props.history.push(`/login`);
    }

    handleChangeUser() {
      this.props.history.push(`/carteiras`);
    }

    render() {

        var labels = [{
            name: 'Capa',
            key: 'capa',
            color: 'pink'
          }, {
            name: 'Cadastros',
            key: 'cadastros',
            color: 'orange'
          }, {
            name: 'Agenda',
            key: 'agenda',
            color: 'blue'
          }, {
            name: 'Gráficos',
            key: 'graficos',
            color: 'green'
          }];
      
        const labelsComponent = labels.map((item) => {
          const isActive = item.key === this.props.match.params.tab;
          const CSSClass = `label ${item.color} ${ isActive ? 'is-selected' : '' }`;
          return (
            <button
              className={CSSClass}
              onClick={() =>this.handleClickLabel(item.key)}
              key={item.key}>
              {item.name}
            </button>
          );
        });

        let cssLabels = (!this.state.isOpen)? 'labels' : 'labels is-open'

    return (
        <React.Fragment>
        
        <div className="main-container">
            <div className="title">
                <img src={logo} alt="Logo vacininha"/>
                <h1>Vacininha</h1>
                <button className='navbar-dark btn' onClick={this.handleTogglerButton.bind(this)}>
                  <span className="navbar-toggler-icon"/>
                </button>
            </div>
            <div className=" carteirinha" >
                <div className={cssLabels}>
                    {labelsComponent}
                    <button className="label brown"  onClick={() => this.handleChangeUser()}>Trocar</button>
                    <button className="label yellow"  onClick={() => this.handleLogout()}>Sair</button>
                </div>
                <div className="content">
                    <ChildRoutes {...this.props} />
                </div>
            </div>
        </div>
        </React.Fragment>
        );
    }

    handleTogglerButton(){
      this.setState({isOpen: !this.state.isOpen});
    }
}

export default connect((store) => ({ 
  currentUser: store.carteirinha.currentUser,
  loggedUser: store.carteirinha.loggedUser,
  currentUserId: store.carteirinha.currentUserId,
  carteirinhasData: store.carteirinha.carteirinhasData,
}), actions)(Carteirinha);
