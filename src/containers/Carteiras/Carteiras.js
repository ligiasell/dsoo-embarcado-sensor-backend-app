import React from 'react';
import logo from '../../images/vacininha.png';
import Card from '../../components/card'

// Redux
import { connect } from 'react-redux';
import * as actions from '../Carteirinha/actions';
import moment from 'moment';

class Carteiras extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      name: String,
      gender: String,
      birthday: Date,
    };
  }

  componentDidMount(){
    this.props.checkLogin().then((res)=>{ 
      console.log(res)
      if(res || res == 0){ 
        this.props.fetchCarteirinhas(); 
      }else{
        this.props.history.push(`/login/`);
      }
    });  
  }

  changeUser(user){ 
    this.props.changeUser(user).then(() =>{ 
      console.warn(this.props.currentUser)
      this.props.history.push(`/carteirinha/`);
    });
  }

  isOpen () {
    this.setState({ 
      isOpen: !this.state.isOpen
      })
  }

  saved () {
    let gender = false;
    if (this.state.gender == "true"){
      gender = true
    }
    let body = {name: this.state.name, genero: gender, birth_date: this.state.birthday}
    this.props.postCarteira(body).then(()=>{
      this.props.fetchCarteirinhas();
      this.isOpen();
    });
  }

  onNameChange(value){
    this.setState({
      name: value
    });
  }

  onGenderChange(value){
    this.setState({
      gender: value
    });
  }

  onBirthdayChange(value){
    this.setState({
      birthday: value
    });
  }

  render() {
    const users = [
      { 
        nome:'Usuário',
        male: true
      },
      {
        nome:'Usuária',
        male:false
      }
    ]
    const cards = (this.props.carteirinhasData || []).map(user=>{
      return (
        <Card changeUser={this.changeUser.bind(this)} {...user} />
      )
    }); 
    console.log(this.props.isFetching.carteirinhas)
    return(
      <React.Fragment>
        <div className="main-container">
            <div className="title">
                <img src={logo} alt="Logo vacininha"/>
                <h1>Vacininha</h1>
            </div>
            <div className=" carteirinha" >
                <div className="content"> 
                  <div className="display-cards"> 
                    {this.props.isFetching.carteirinhas?
                    <div className="spinner"></div> : 
                      cards }
                  </div>
                  <div className="display-button">
                    <a onClick={()=>this.isOpen()} className='btn btn-primary' id='add-button'>Adicionar Carteira</a>
                  </div>
                </div>
              {this.state.isOpen ? 
                <div className="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Novo(a) usuário(a)</h5>
                      <button type="button" className="close" onClick={()=>this.isOpen()} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Nome:</label>
                          <input type="text" onChange={e => this.onNameChange(e.target.value)} className="form-control" id="recipient-name" />
                        </div>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Gênero:</label>
                          <select type="text" onChange={e => this.onGenderChange(e.target.value)} className="form-control" id="recipient-gender">
                            <option value="false">Feminino</option>
                            <option value="true">Masculino</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Data de nascimento:</label>
                          <input type="date" onChange={e => this.onBirthdayChange(e.target.value)} max={moment().format("YYYY-MM-DD")}className="form-control" id="recipient-birthday" />
                        </div>
                        <div className="form-group">
                          <label for="recipient-name" className="col-form-label">Foto:</label>
                          <input type="file" className="form-control" id="recipient-photo" />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" onClick={()=>this.isOpen()} className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                      <button type="button" onClick={()=>this.saved()} className="btn btn-primary">Salvar</button>
                    </div>
                  </div>
                </div>
              </div> : null  
                }
              </div>
          </div>
      </React.Fragment>
    );
  }
}
 
export default connect((store) => ({ 
  carteirinhasData: store.carteirinha.carteirinhasData,
  loginIsSuccess: store.login.isSuccess,
  loginIsRecoverSuccess: store.login.isRecoverSuccess,
  user: store.login.user,
  currentUser: store.carteirinha.currentUser,
  isFetching: store.carteirinha.isFetching
}), actions)(Carteiras);