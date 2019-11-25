import React from 'react'

import dates from 'date-arithmetic'
import events from './events'
import BigCalendar from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import moment from 'moment';
import Icon from './Icon'

class View extends React.Component {
  render() {
    let { date } = this.props
    let range = View.range(date)
    let org =  {};
    this.props.events.forEach(e => {
        (org[moment(e.start).unix()])? org[moment(e.start).unix()].push(e) : org[moment(e.start).unix()] = [e];
    }); 
    let events = this.props.events.sort((a,b) =>{ return a.start > b.start});
    let eventList = Object.values(org).map(i => {
        return i.map((item, index) =>{
            let iconClass = (item.status == undefined || item.status == null)? 'question-circle':(item.status)?'check-circle':'times-circle' 
            return(
                <tr onClick={() => this.props.alterVaccineState(item)}>
                    {index ==0 ?<td rowspan={i.length} className='rbc-agenda-date-cell'>{moment(item.start).format('DD/MM/YYYY')}</td>:null}
                    <td ref="a" className='rbc-agenda-status-cell'><Icon name={iconClass} fal large/></td>
                    <td ref="b" className='rbc-agenda-event-cell'>{item.title}</td>
                </tr>
            );
        })

    }); 
    return (
        <div className='rbc-agenda-view'>
            <table className='rbc-agenda-table'>
                <thead>
                    <tr>
                        <th ref="dateCol" className='rbc-header'>Data</th>
                        <th ref="a" className='rbc-header'>Status</th>
                        <th ref="b" className='rbc-header'>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {eventList}
                </tbody>
            </table>
        </div>
    )/*<TimeGrid {...this.props} range={range} eventOffset={15} />*/
  }
}

View.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

View.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

View.title = date => {
  return `Todos as vacinas`
}

export default View