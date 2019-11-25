import React from 'react';

import Capa from './components/Capa';
import Cadastros from './components/Cadastros';
import Agenda from './components/Agenda';
import Graficos from './components/Graficos';

const routes = [{
  name: 'Cadastros',
  path: '/carteirinha/cadastros',
  exact: true,
  component: Cadastros
}, {
  name: 'Agenda',
  path: '/carteirinha/agenda',
  exact: true,
  component: Agenda
}, {
  name: 'Gráficos',
  path: '/carteirinha/graficos',
  exact: true,
  component: Graficos
},{
  name: 'Capa',
  path: '/carteirinha/capa',
  exact: true,
  component: Capa
}];


export default routes;
